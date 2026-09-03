# Studio Phantasm 项目约束

## 摄影图片处理

网站只引用 `static/img/studio/generated/` 下的 WebP，不直接复制或发布相机原始 JPEG。

权威源：

- 场地原图：`/Users/fish2lab/Pictures/Aug 29/Output/`
- 场地幕后图：`/Users/fish2lab/Pictures/Aug 23/Output/`
- 处理脚本：`scripts/process-studio-images.sh`

生成命令：

```bash
./scripts/process-studio-images.sh
```

管线固定生成两档，而且每一档都直接从相机原图超采，禁止从另一档派生：

| 后缀 | 最大边 | WebP quality | 用途 |
|---|---:|---:|---|
| `-1280.webp` | 1280px | 78 | iPhone Pro Max 级高密度移动视口 |
| `-1600.webp` | 1600px | 82 | Studio Display 100% 缩放下的桌面卡片与单列图库 |

编码器使用 ImageMagick/libwebp：自动应用 EXIF 朝向，统一到 sRGB，移除相机 metadata。HTML 用 `<picture>`：移动端请求 `1280w`，桌面端请求 `1600w`。不要提交原图，不要生成超过 1600px 的网页版本。

唯一例外是首页 50vh 固定现场窗：`behind-the-scenes-5440.webp` 直接从 `_FSH0150 1.jpg` 生成，最大边 5440px、quality 84；仅桌面端请求，移动端仍请求 1280px。不要把 5440px 规格复用到 Hero、场地卡或详情图库。

新增或替换场景图片时，先改脚本中的源目录映射，再运行脚本；不要手工维护一套无法复现的导出文件。

## 场地预约指南 PDF

- 价格、规则、器材、联系方式的唯一来源：`src/data/studioPricing.json`，网站与 PDF 共用。改价只改这个文件，然后重新构建网站并重跑脚本。
- 脚本：`scripts/brochure/build_studio_phantasm_brochure.py`（reportlab + Pillow，见同目录 `requirements.txt`）。
- 字体：`scripts/brochure/fonts/` 放 `NotoSansSC-Regular.ttf`、`NotoSansSC-Medium.ttf`（Google Fonts，OFL），体积大不入库；可用 `BROCHURE_FONT_DIR` 覆盖。
- 输出：`output/pdf/`，不入库。照片直接读取 `static/img/studio/generated/` 的 1600px WebP，不需要相机原图。
