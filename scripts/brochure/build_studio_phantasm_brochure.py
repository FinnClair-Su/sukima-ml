"""Studio Phantasm 场地预约指南（A4，15 页）。

价格、规则、器材、联系方式统一读取 src/data/studioPricing.json，
与网站共用一份数据；照片仍引用 static/img/studio/generated 下的 1600px WebP，
嵌入 PDF 前转成 JPEG，以控制文件体积。

依赖：pip install -r scripts/brochure/requirements.txt
字体：scripts/brochure/fonts/ 需放置 NotoSansSC-Regular.ttf 与 NotoSansSC-Medium.ttf
（Google Fonts 下载，OFL 许可；体积较大，不入库），也可用环境变量 BROCHURE_FONT_DIR 指向别处。
等宽字体使用 macOS 自带 SF Mono。
运行：python scripts/brochure/build_studio_phantasm_brochure.py
输出：output/pdf/（不入库）
"""

import json
import os
from io import BytesIO
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "output/pdf/studio-phantasm场地预约指南.pdf"
SCRIPT_DIR = Path(__file__).resolve().parent
FONT_DIR = Path(os.environ.get("BROCHURE_FONT_DIR", SCRIPT_DIR / "fonts"))
ASSET_DIR = ROOT / "static/img/studio"
DATA = json.loads((ROOT / "src/data/studioPricing.json").read_text("utf-8"))

PAGE_W, PAGE_H = A4
MARGIN = 34
GAP = 12
FOOTER_Y = 22
TOTAL_PAGES = 15
JPEG_QUALITY = 86

INK = HexColor("#111111")
PAPER = HexColor("#F7F6F4")
MIST = HexColor("#F1F1EF")
LINE = HexColor("#D9D9D5")
MUTED = HexColor("#777772")
WHITE = white

SANS = "NotoSC"
SANS_MEDIUM = "NotoSCMedium"
MONO = "SFMono"

OFFER = DATA["offer"]
CONTACT = DATA["contact"]
EQUIPMENT = DATA["equipment"]
MIN_HOURS = OFFER["minimumHours"]

# 资料册每个场地只用 5 张：封面 + 4 张。图片编号属于资料册，不放进共享 JSON。
GALLERIES = {
    "white-stage": {"cover": "fsh0229", "gallery": ["fsh0222", "fsh0230", "fsh0231", "fsh0234"]},
    "european": {"cover": "fsh0247", "gallery": ["fsh0238", "fsh0246", "fsh0249", "fsh0250"]},
    "japanese": {"cover": "fsh0313", "gallery": ["fsh0252", "fsh0303", "fsh0305", "fsh0314"]},
    "chinese-vintage": {"cover": "fsh0258", "gallery": ["fsh0261", "fsh0262", "fsh0274", "fsh0279"]},
    "american-vintage": {"cover": "fsh0287", "gallery": ["fsh0288", "fsh0290", "fsh0292", "fsh0300"]},
}

SPACES = []
for _space in DATA["spaces"]:
    _gallery = GALLERIES[_space["slug"]]
    SPACES.append(
        {
            "index": _space["index"],
            "slug": _space["slug"],
            "name": _space["name"],
            "english": _space["englishName"],
            "area": _space["area"],
            "price": f'¥{_space["openingPrice"]} / {_space["priceUnit"]}',
            "cover": _gallery["cover"],
            "gallery": _gallery["gallery"],
        }
    )


# ---------------------------------------------------------------- assets


def studio_image(slug: str, image_id: str) -> Path:
    return ASSET_DIR / "generated/spaces" / slug / f"{image_id}-1600.webp"


def register_fonts():
    pdfmetrics.registerFont(TTFont(SANS, str(FONT_DIR / "NotoSansSC-Regular.ttf")))
    pdfmetrics.registerFont(TTFont(SANS_MEDIUM, str(FONT_DIR / "NotoSansSC-Medium.ttf")))
    pdfmetrics.registerFont(TTFont(MONO, "/System/Library/Fonts/SFNSMono.ttf"))


_IMAGE_CACHE: dict = {}


def photo_reader(path: Path) -> ImageReader:
    """WebP → JPEG（内存），reportlab 会直接以 DCTDecode 嵌入，不再展开成原始像素。"""
    cached = _IMAGE_CACHE.get(path)
    if cached is None:
        with Image.open(path) as image:
            rgb = image.convert("RGB")
            buffer = BytesIO()
            rgb.save(buffer, format="JPEG", quality=JPEG_QUALITY, optimize=True, subsampling=0)
            size = rgb.size
        buffer.seek(0)
        cached = (ImageReader(buffer), size)
        _IMAGE_CACHE[path] = cached
    return cached[0]


def image_size(path: Path):
    cached = _IMAGE_CACHE.get(path)
    if cached is not None:
        return cached[1]
    with Image.open(path) as image:
        return image.size


def is_portrait(path: Path) -> bool:
    width, height = image_size(path)
    return height > width


def fit_size(src_w, src_h, max_w, max_h):
    scale = min(max_w / src_w, max_h / src_h)
    return src_w * scale, src_h * scale


# ---------------------------------------------------------------- drawing primitives


def set_fill(c: canvas.Canvas, color):
    c.setFillColor(color)
    c.setStrokeColor(color)


def page_background(c: canvas.Canvas, color=PAPER):
    set_fill(c, color)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)


def content_width():
    return PAGE_W - 2 * MARGIN


def rule(c: canvas.Canvas, x1, y, x2, color=LINE, width=0.6):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y, x2, y)


def draw_photo(c: canvas.Canvas, path: Path, x, y, width, height):
    """Place the image at native aspect ratio inside (x, y, width, height); box must match the aspect."""
    c.drawImage(photo_reader(path), x, y, width, height, preserveAspectRatio=True, anchor="sw")


def place_photo(c: canvas.Canvas, path: Path, x, y, max_w, max_h, align="sw"):
    """Contain-fit into max box without cropping. `y` is the bottom of the max box."""
    src_w, src_h = image_size(path)
    draw_w, draw_h = fit_size(src_w, src_h, max_w, max_h)
    if align == "center":
        draw_x = x + (max_w - draw_w) / 2
        draw_y = y + (max_h - draw_h) / 2
    elif align == "nw":
        draw_x = x
        draw_y = y + max_h - draw_h
    else:
        draw_x = x
        draw_y = y
    draw_photo(c, path, draw_x, draw_y, draw_w, draw_h)
    return draw_w, draw_h, draw_x, draw_y


def row_height(paths, row_w, gap=GAP):
    aspects = []
    for path in paths:
        src_w, src_h = image_size(path)
        aspects.append(src_w / src_h)
    return (row_w - gap * (len(paths) - 1)) / sum(aspects)


def place_row(c: canvas.Canvas, paths, x, y, row_w, height, gap=GAP, labels=None):
    cursor = x
    boxes = []
    for index, path in enumerate(paths):
        src_w, src_h = image_size(path)
        draw_w = height * (src_w / src_h)
        draw_photo(c, path, cursor, y, draw_w, height)
        if labels and index < len(labels) and labels[index]:
            draw_label(c, labels[index], cursor, y - 14, MUTED, 7)
        boxes.append((cursor, y, draw_w, height))
        cursor += draw_w + gap
    return boxes


def draw_brand(c: canvas.Canvas, x=MARGIN, y=PAGE_H - 48, color=INK):
    mark = SCRIPT_DIR / "assets" / ("phantasm-mark-light.png" if color == WHITE else "phantasm-mark.png")
    mark_w, mark_h = 20, 22.5
    c.drawImage(ImageReader(str(mark)), x, y - 17, mark_w, mark_h, preserveAspectRatio=True, mask="auto")
    set_fill(c, color)
    c.setFont(MONO, 8)
    c.drawString(x + 28, y - 6, "STUDIO PHANTASM")


def draw_footer(c: canvas.Canvas, page_number: int, total_pages: int = TOTAL_PAGES, dark=False):
    color = Color(1, 1, 1, 0.72) if dark else MUTED
    set_fill(c, color)
    c.setFont(MONO, 7)
    c.drawString(MARGIN, FOOTER_Y, "PHOTOGRAPHY / SPACE RENTAL")
    c.drawRightString(PAGE_W - MARGIN, FOOTER_Y, f"{page_number:02d} / {total_pages:02d}")


def draw_label(c: canvas.Canvas, text: str, x, y, color=MUTED, size=8):
    set_fill(c, color)
    c.setFont(MONO, size)
    c.drawString(x, y, text)


def draw_right_label(c: canvas.Canvas, text: str, x, y, color=MUTED, size=8):
    set_fill(c, color)
    c.setFont(MONO, size)
    c.drawRightString(x, y, text)


def draw_sans_label(c: canvas.Canvas, text: str, x, y, color=MUTED, size=8):
    set_fill(c, color)
    c.setFont(SANS, size)
    c.drawString(x, y, text)


def _is_latin(char: str) -> bool:
    return ord(char) < 0x2E80 and char != "㎡"


def mixed_runs(text: str):
    runs = []
    for char in text:
        latin = _is_latin(char)
        if runs and runs[-1][0] == latin:
            runs[-1][1] += char
        else:
            runs.append([latin, char])
    return runs


def mixed_width(text: str, size: float, sans_font=SANS) -> float:
    return sum(
        pdfmetrics.stringWidth(chunk, MONO if latin else sans_font, size) for latin, chunk in mixed_runs(text)
    )


def draw_mixed(c: canvas.Canvas, text: str, x, y, size=8, color=INK, sans_font=SANS, align="left"):
    """拉丁字符走等宽字体，中文走 Noto：同一行里 EN / 中文 混排不再需要手工拆段。"""
    total = mixed_width(text, size, sans_font)
    if align == "right":
        x -= total
    set_fill(c, color)
    cursor = x
    for latin, chunk in mixed_runs(text):
        font = MONO if latin else sans_font
        c.setFont(font, size)
        c.drawString(cursor, y, chunk)
        cursor += pdfmetrics.stringWidth(chunk, font, size)
    return total


def draw_multiline(c: canvas.Canvas, lines, x, y, font=SANS, size=24, leading=None, color=INK):
    leading = leading or size * 1.22
    set_fill(c, color)
    c.setFont(font, size)
    text = c.beginText(x, y)
    text.setLeading(leading)
    for line in lines:
        text.textLine(line)
    c.drawText(text)


def wrap_cjk(text: str, font: str, size: float, max_width: float):
    breaks = set("，。；、 ")
    lines = []
    current = ""
    for char in text:
        trial = current + char
        if pdfmetrics.stringWidth(trial, font, size) <= max_width:
            current = trial
            continue
        split_at = max((idx for idx, item in enumerate(current) if item in breaks), default=-1)
        if split_at >= 0:
            lines.append(current[: split_at + 1].rstrip())
            current = current[split_at + 1 :] + char
        else:
            if current:
                lines.append(current)
            current = char
    if current:
        lines.append(current)
    merged = []
    for line in lines:
        if merged and line in "，。；、.!?":
            merged[-1] += line
        else:
            merged.append(line)
    return merged or [""]


# ---------------------------------------------------------------- pages


def cover_page(c: canvas.Canvas):
    page_background(c, WHITE)
    draw_brand(c)

    card_w = content_width()
    square = card_w / 2
    card_y = (PAGE_H - square) / 2 + 6
    hero = ASSET_DIR / "generated/hero-1600.webp"
    src_w, src_h = image_size(hero)
    draw_w, draw_h = fit_size(src_w, src_h, square, square)
    draw_photo(c, hero, MARGIN + (square - draw_w) / 2, card_y + (square - draw_h) / 2, draw_w, draw_h)

    set_fill(c, MIST)
    c.rect(MARGIN + square, card_y, square, square, stroke=0, fill=1)

    copy_x = MARGIN + square + 26
    draw_label(c, "PHOTOGRAPHY / SPACE RENTAL", copy_x, card_y + square - 36, INK, 7)
    draw_multiline(c, ["让每一种想象", "都有地方发生。"], copy_x, card_y + square - 86, size=22, leading=30)
    draw_label(c, "05 INDEPENDENT SPACES", copy_x, card_y + 68, MUTED, 7)
    draw_label(c, f"FROM {SPACES[0]['price']}  /  {MIN_HOURS}H MINIMUM", copy_x, card_y + 50, MUTED, 7)
    draw_mixed(c, f'{OFFER["label"]} {OFFER["validity"]}', copy_x, card_y + 32, size=7, color=MUTED)

    url = CONTACT["site"]
    set_fill(c, MUTED)
    c.setFont(MONO, 8)
    c.drawString(MARGIN, card_y - 18, url)
    url_w = pdfmetrics.stringWidth(url, MONO, 8)
    c.linkURL(url, (MARGIN, card_y - 24, MARGIN + url_w, card_y - 8), relative=0)

    set_fill(c, INK)
    c.setFont(MONO, 11)
    c.drawString(MARGIN, 88, "SPACE GUIDE / 2026")
    c.setFont(SANS, 10)
    c.drawRightString(PAGE_W - MARGIN, 88, "".join(CONTACT["locationLines"]))
    draw_footer(c, 1)
    c.showPage()


def overview_page(c: canvas.Canvas):
    page_background(c)
    draw_brand(c)
    draw_label(c, "SPACES / 05", MARGIN, PAGE_H - 86, INK, 8)
    set_fill(c, INK)
    c.setFont(SANS, 24)
    c.drawString(MARGIN + 148, PAGE_H - 90, "五种场景，一处完成。")

    grid_w = content_width()
    col_gap = 12
    row_gap = 14
    card_w = (grid_w - col_gap) / 2
    img_h = card_w * 0.75
    caption_h = 26
    card_h = img_h + caption_h
    grid_top = PAGE_H - 112

    for index, space in enumerate(SPACES):
        col = index % 2
        row = index // 2
        x = MARGIN + col * (card_w + col_gap)
        y = grid_top - (row + 1) * card_h - row * row_gap
        path = studio_image(space["slug"], space["cover"])
        src_w, src_h = image_size(path)
        draw_w, draw_h = fit_size(src_w, src_h, card_w, img_h)
        img_x = x + (card_w - draw_w) / 2
        img_y = y + caption_h + (img_h - draw_h)
        draw_photo(c, path, img_x, img_y, draw_w, draw_h)
        draw_label(c, space["index"], x, y + 7, INK, 7)
        set_fill(c, INK)
        c.setFont(SANS_MEDIUM, 10)
        c.drawString(x + 22, y + 6, space["name"])
        draw_mixed(c, f'{space["area"]}  ·  {space["price"]}', x + card_w, y + 6, size=8, color=MUTED, align="right")

    # 第六格：原来留白，现在放价格速览，读者不用翻到第 13 页就知道量级。
    x = MARGIN + card_w + col_gap
    y = grid_top - 3 * card_h - 2 * row_gap
    top = y + card_h
    rule(c, x, top, x + card_w, INK, 0.8)
    draw_mixed(c, f'{OFFER["label"]} / {OFFER["audience"]}', x, top - 18, size=7, color=INK)
    draw_right_label(c, f"{MIN_HOURS}H MINIMUM", x + card_w, top - 18, MUTED, 7)
    # c.drawRightString(x + card_w, top - 18, f"{MIN_HOURS}H MINIMUM")
    line_y = top - 46
    for row_data in DATA["priceRows"]:
        set_fill(c, INK)
        c.setFont(SANS, 9)
        c.drawString(x, line_y, row_data["short"])
        price = f'{row_data["price"]} {row_data["unit"]}'.strip()
        draw_mixed(c, price, x + card_w, line_y, size=9, color=INK, align="right")
        rule(c, x, line_y - 9, x + card_w)
        line_y -= 30
    draw_mixed(c, f'开业价有效期 {OFFER["validity"]}；完整规则见第 13 页。', x, y + 6, size=7.5, color=MUTED)

    draw_footer(c, 2)
    c.showPage()


def space_opener(c: canvas.Canvas, space, page_number):
    """Scene intro: native-AR photos, title + spec table in the leftover."""
    page_background(c, WHITE)
    draw_brand(c)

    cover_path = studio_image(space["slug"], space["cover"])
    companion_path = studio_image(space["slug"], space["gallery"][0])
    grid_w = content_width()

    cover_top = PAGE_H - 84
    cover_src_w, cover_src_h = image_size(cover_path)
    cover_w = grid_w
    cover_h = cover_w * cover_src_h / cover_src_w
    max_cover_h = PAGE_H * 0.48
    if cover_h > max_cover_h:
        cover_h = max_cover_h
        cover_w = cover_h * cover_src_w / cover_src_h
    cover_x = MARGIN
    cover_y = cover_top - cover_h
    draw_photo(c, cover_path, cover_x, cover_y, cover_w, cover_h)
    draw_label(c, f'{space["index"]}.01 / LEAD VIEW', cover_x, cover_y - 14, MUTED, 7)

    band_top = cover_y - 36
    band_bottom = 56
    band_h = band_top - band_bottom
    photo_col_w = grid_w * 0.44

    companion_src_w, companion_src_h = image_size(companion_path)
    companion_w, companion_h = fit_size(companion_src_w, companion_src_h, photo_col_w, band_h)
    companion_x = MARGIN + grid_w - companion_w
    companion_y = band_top - companion_h
    draw_photo(c, companion_path, companion_x, companion_y, companion_w, companion_h)
    draw_label(c, f'{space["index"]}.02', companion_x, companion_y - 14, MUTED, 7)

    text_x = MARGIN
    text_w = grid_w - photo_col_w - 40
    name_size = 26 if len(space["name"]) <= 4 else 23
    title_top = band_top - 4
    draw_label(c, f'{space["index"]} / SPACE', text_x, title_top, INK, 8)
    set_fill(c, INK)
    c.setFont(SANS, name_size)
    c.drawString(text_x, title_top - 36, space["name"])
    draw_label(c, space["english"], text_x, title_top - 58, MUTED, 7)

    # 规格表：三行，替代原先像未完成列表的 "- 70㎡" 写法。
    specs = [
        ("AREA", space["area"]),
        ("OPENING", space["price"]),
        ("MINIMUM", f"{MIN_HOURS} 小时起租"),
    ]
    spec_top = title_top - 84
    rule(c, text_x, spec_top, text_x + text_w, INK, 0.8)
    line_y = spec_top - 17
    for label, value in specs:
        draw_label(c, label, text_x, line_y, MUTED, 7)
        draw_mixed(c, value, text_x + 64, line_y, size=10, color=INK)
        rule(c, text_x, line_y - 8, text_x + text_w)
        line_y -= 24

    draw_footer(c, page_number)
    c.showPage()


def collage_rows(paths):
    portraits = [path for path in paths if is_portrait(path)]
    landscapes = [path for path in paths if not is_portrait(path)]
    n = len(paths)

    if portraits and landscapes:
        first = [portraits[0], landscapes[0]]
        rest = portraits[1:] + landscapes[1:]
        if len(rest) <= 1:
            return [first, rest] if rest else [first]
        if len(rest) == 2:
            return [first, rest]
        return [first, rest[:2], rest[2:]]

    if n == 4:
        return [paths[:2], paths[2:]]
    if n == 3:
        return [paths[:1], paths[1:]]
    if n in (1, 2):
        return [paths]
    return [paths[i : i + 2] for i in range(0, n, 2)]


def collage_page(c: canvas.Canvas, space, page_number):
    page_background(c)
    draw_brand(c)
    draw_label(c, f'{space["index"]} / {space["english"]}', MARGIN, PAGE_H - 86, INK, 8)
    set_fill(c, INK)
    c.setFont(SANS_MEDIUM, 14)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 88, space["name"])

    paths = [studio_image(space["slug"], image_id) for image_id in space["gallery"][1:]]
    labels = [f'{space["index"]}.{offset:02d}' for offset in range(3, 3 + len(paths))]
    grid_w = content_width()
    rows = collage_rows(paths)

    top = PAGE_H - 112
    bottom = 58
    available = top - bottom
    caption = 16
    row_gap = 18

    natural_heights = [row_height(row, grid_w) for row in rows]
    natural_total = sum(natural_heights) + row_gap * (len(rows) - 1) + caption * len(rows)
    scale = min(1.0, available / natural_total) if natural_total else 1.0

    cursor_top = top
    label_index = 0
    for row_i, row in enumerate(rows):
        height = natural_heights[row_i] * scale
        y = cursor_top - height
        row_labels = labels[label_index : label_index + len(row)]
        place_row(c, row, MARGIN, y, grid_w, height, labels=row_labels)
        label_index += len(row)
        cursor_top = y - caption - row_gap

    draw_footer(c, page_number)
    c.showPage()


def booking_page(c: canvas.Canvas):
    page_background(c, WHITE)
    draw_brand(c)
    draw_mixed(c, f'{OFFER["label"]} / {OFFER["audience"]} · {MIN_HOURS}H 起租', MARGIN, PAGE_H - 84, size=8, color=INK)
    draw_mixed(c, f'有效期 {OFFER["validity"]}', MARGIN, PAGE_H - 98, size=7.5, color=MUTED)
    set_fill(c, INK)
    c.setFont(SANS, 24)
    c.drawString(MARGIN + 220, PAGE_H - 90, "价格与预约")

    right = PAGE_W - MARGIN
    row_top = PAGE_H - 122
    rule(c, MARGIN, row_top, right, INK, 0.8)

    # 价目表：名称 + 说明在左，价格在右，行高固定。
    y = row_top
    price_row_h = 64
    for row_data in DATA["priceRows"]:
        y -= price_row_h
        set_fill(c, INK)
        c.setFont(SANS_MEDIUM, 11.5)
        c.drawString(MARGIN, y + 34, row_data["name"])
        draw_mixed(c, row_data["detail"], MARGIN, y + 17, size=7.5, color=MUTED)
        unit = row_data["unit"]
        unit_w = mixed_width(f" {unit}", 9) if unit else 0
        if unit:
            draw_mixed(c, f" {unit}", right - unit_w, y + 25, size=9, color=MUTED)
        set_fill(c, INK)
        c.setFont(MONO, 20)
        c.drawRightString(right - unit_w, y + 25, row_data["price"])
        rule(c, MARGIN, y, right)

    # 规则：五条整行排列，编号 / 标题 / 正文三栏；不再出现 2×3 网格里的空格。
    rules = DATA["rules"]
    rule_top = y - 36
    title_x = MARGIN + 30
    body_x = MARGIN + content_width() * 0.36
    body_w = right - body_x
    body_size = 8.5
    body_leading = 13.5
    cursor = rule_top
    rule(c, MARGIN, cursor, right, INK, 0.8)
    for item in rules:
        lines = wrap_cjk(item["body"], SANS, body_size, body_w)
        block_h = 22 + max(1, len(lines)) * body_leading + 18
        baseline = cursor - 26
        draw_label(c, item["index"], MARGIN, baseline, MUTED, 7)
        set_fill(c, INK)
        c.setFont(SANS_MEDIUM, 10.5)
        c.drawString(title_x, baseline, item["title"])
        draw_multiline(c, lines, body_x, baseline, size=body_size, leading=body_leading, color=MUTED)
        cursor -= block_h
        rule(c, MARGIN, cursor, right)

    draw_label(c, f'BOOKING / {CONTACT["email"]}', MARGIN, 56, INK, 8)
    draw_right_label(c, "CONTACT → P.15", right, 56, MUTED, 8)
    draw_footer(c, 13)
    c.showPage()


def equipment_page(c: canvas.Canvas):
    """器材页：纯排版的深色页，不使用现场人物照片。"""
    page_background(c, INK)
    draw_brand(c, color=WHITE)
    right = PAGE_W - MARGIN
    dim = Color(1, 1, 1, alpha=0.62)
    faint = Color(1, 1, 1, alpha=0.28)

    draw_label(c, f'{EQUIPMENT["label"]} / SHARED BY ALL SPACES', MARGIN, PAGE_H - 86, WHITE, 8)

    # 主体：型号大字 + 规格。
    title_y = PAGE_H * 0.62
    set_fill(c, WHITE)
    c.setFont(MONO, 30)
    c.drawString(MARGIN, title_y, EQUIPMENT["name"])
    draw_mixed(c, f'{EQUIPMENT["spec"]} / {EQUIPMENT["specZh"]}', MARGIN, title_y - 24, size=9.5, color=dim)

    # 规格表：与场地开篇页同款。
    rows = [
        ("PRICE", f'{EQUIPMENT["price"]} {EQUIPMENT["unit"]}'),
        ("OFFER", EQUIPMENT["offerShort"]),
        ("BOOKING", EQUIPMENT["bookingShort"]),
    ]
    table_top = title_y - 64
    row_h = 30
    rule(c, MARGIN, table_top, right, dim, 0.8)
    yy = table_top
    for key, value in rows:
        yy -= row_h
        draw_label(c, key, MARGIN, yy + 11, dim, 7)
        draw_mixed(c, value, right, yy + 11, size=10, color=WHITE, align="right")
        rule(c, MARGIN, yy, right, faint, 0.6)

    # 三条说明：编号 + 正文，自动换行。
    body_x = MARGIN + 30
    body_w = right - body_x
    cursor = yy - 44
    for index, line in enumerate(EQUIPMENT["lines"], start=1):
        lines = wrap_cjk(line, SANS, 9, body_w)
        draw_label(c, f"{index:02d}", MARGIN, cursor, dim, 7)
        draw_multiline(c, lines, body_x, cursor, size=9, leading=15, color=WHITE)
        cursor -= len(lines) * 15 + 14

    draw_label(c, f'BOOKING / {CONTACT["email"]}', MARGIN, 56, WHITE, 8)
    draw_right_label(c, "CONTACT → P.15", right, 56, dim, 8)
    draw_footer(c, 14, dark=True)
    c.showPage()


def contact_page(c: canvas.Canvas):
    page_background(c, WHITE)
    draw_brand(c)
    right = PAGE_W - MARGIN

    # 标题栏与其他页对齐：标签在左，标题从 MARGIN+148 起。
    draw_label(c, "CONTACT / BOOKING", MARGIN, PAGE_H - 86, INK, 8)
    draw_label(c, "LOCATION", MARGIN + 148, PAGE_H - 86, MUTED, 7)
    draw_multiline(c, CONTACT["locationLines"], MARGIN + 148, PAGE_H - 118, size=24, leading=32)

    band_top = PAGE_H - 178
    rule(c, MARGIN, band_top, right, INK, 0.8)
    draw_label(c, "EMAIL", MARGIN, band_top - 30, INK, 8)
    set_fill(c, INK)
    c.setFont(MONO, 18)
    c.drawString(MARGIN + 148, band_top - 34, CONTACT["email"])
    email_w = pdfmetrics.stringWidth(CONTACT["email"], MONO, 18)
    c.linkURL(f'mailto:{CONTACT["email"]}', (MARGIN + 148, band_top - 40, MARGIN + 148 + email_w, band_top - 18), relative=0)
    draw_sans_label(c, "直接发送预约信息", right - pdfmetrics.stringWidth("直接发送预约信息", SANS, 8), band_top - 30, MUTED, 8)
    band_bottom = band_top - 52
    rule(c, MARGIN, band_bottom, right, INK, 0.8)

    # 二维码并排，同高对齐；标签走同一条基线。
    wechat = ASSET_DIR / "contact/wechat.png"
    qq = ASSET_DIR / "contact/qq.png"
    qr_h = 236
    qr_top = band_bottom - 58
    col_w = content_width() / 2
    wechat_src_w, wechat_src_h = image_size(wechat)
    qq_src_w, qq_src_h = image_size(qq)
    wechat_w = qr_h * wechat_src_w / wechat_src_h
    qq_w = qr_h * qq_src_w / qq_src_h

    draw_mixed(c, "WECHAT / 扫码添加", MARGIN, qr_top + 18, size=8, color=INK)
    draw_label(c, f'QQ / {CONTACT["qq"]}', MARGIN + col_w, qr_top + 18, INK, 8)
    c.drawImage(ImageReader(str(wechat)), MARGIN, qr_top - qr_h, wechat_w, qr_h, mask="auto")
    c.drawImage(ImageReader(str(qq)), MARGIN + col_w, qr_top - qr_h, qq_w, qr_h, mask="auto")
    draw_sans_label(c, "微信添加后请直接发送预约信息。", MARGIN, qr_top - qr_h - 16, MUTED, 7.5)
    draw_sans_label(c, "QQ 亦可发送预约信息。", MARGIN + col_w, qr_top - qr_h - 16, MUTED, 7.5)

    # 预约信息清单：原先只有页脚一行小字，现在占据下半页，五项横排。
    list_top = qr_top - qr_h - 58
    rule(c, MARGIN, list_top, right, INK, 0.8)
    draw_label(c, "BOOKING REQUEST", MARGIN, list_top - 20, INK, 8)
    set_fill(c, INK)
    c.setFont(SANS, 14)
    c.drawString(MARGIN + 148, list_top - 22, "预约时请附以下信息")
    fields = CONTACT["bookingFields"]
    field_w = content_width() / len(fields)
    field_y = list_top - 62
    for idx, field in enumerate(fields):
        fx = MARGIN + idx * field_w
        draw_label(c, f"{idx + 1:02d}", fx, field_y, MUTED, 7)
        draw_mixed(c, field, fx, field_y - 18, size=11, color=INK)
    rule(c, MARGIN, field_y - 34, right)
    note_lines = wrap_cjk(CONTACT["bookingNote"], SANS, 9, content_width() * 0.6)
    draw_multiline(c, note_lines, MARGIN, field_y - 56, size=9, leading=15, color=MUTED)

    url = CONTACT["site"]
    draw_label(c, url, MARGIN, 56, INK, 8)
    url_w = pdfmetrics.stringWidth(url, MONO, 8)
    c.linkURL(url, (MARGIN, 50, MARGIN + url_w, 66), relative=0)
    draw_right_label(c, CONTACT["locationShort"], right, 56, MUTED, 8)
    draw_footer(c, 15)
    c.showPage()


def build():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Studio Phantasm 场地预约指南 2026")
    c.setAuthor("Studio Phantasm")
    c.setSubject("Studio Phantasm 摄影棚与场地出租资料册")
    c.setCreator("Studio Phantasm")

    cover_page(c)
    overview_page(c)
    page_number = 3
    for space in SPACES:
        space_opener(c, space, page_number)
        collage_page(c, space, page_number + 1)
        page_number += 2
    booking_page(c)
    equipment_page(c)
    contact_page(c)
    c.save()
    print(OUTPUT, f"{OUTPUT.stat().st_size / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    build()
