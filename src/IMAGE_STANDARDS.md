# Image & Performance Standards

To maintain the high performance and visual quality of the Sukima ML website (Giclée Gallery), all contributors must adhere to the following standards regarding image assets and rendering.

## 1. Image Formats

-   **Primary Format**: **WebP** (`.webp`)
    -   All static assets (photos, artworks, UI elements) must be converted to WebP.
    -   Exceptions:
        -   `favicon.ico` or specific browser-required icons.
        -   SVG for vector graphics (logos, icons).
-   **Fallback**: Browsers today have excellent WebP support. We currently do not enforce a JPG fallback unless strictly necessary for legacy support (which is not a priority for this project).

## 2. Resolution & Sizing Guidelines

Do not commit raw 100MP or uncompressed images to the repository (except where specifically required for "Download Original" functionality, which should be stored in `static/photography` but **never** loaded directly on the page load).

| Asset Type | Maximum Width | Quality (WebP) | Usage Context |
| :--- | :--- | :--- | :--- |
| **Photography (WebP)** | **2912x2184** | 80-85 | Photography portfolio display (2x scale of iPad Pro 11") |
| **Hero / Full Screen** | **1920px** | 80-85 | Top banner, fullscreen backgrounds (non-photo) |
| **Content / Gallery** | **1200px** | 80 | Standard gallery items, blog images, product textures |
| **Thumbnails / UI** | **500-800px** | 80 | Small cards, profiles, UI decorations |

> **Note**: These sizes ensure images look crisp on Retina/High-DPI displays while keeping file sizes low.

## 3. Workflow & Automation

We have provided a script to automate the optimization process. **Always run this before committing new images.**

### `scripts/optimize_all_assets.py`

This script recursively scans `static/img` and `static/photography`, resizes images violating the rules above, and converts them to WebP.

```bash
# Run from project root
python3 scripts/optimize_all_assets.py
```

**Workflow:**
1.  Place new raw images (JPG/PNG) in the appropriate folder.
2.  Run the script.
3.  Check the output.
4.  Delete the original raw JPG/PNG files if they are not needed for high-res downloads.
5.  Update your code to import the new `.webp` file.

## 4. Code / Rendering Requirements (CLS Prevention)

**Cumulative Layout Shift (CLS)** is a critical metric. To prevent layout shifts as images load, you **MUST** provide explicit aspect ratio or dimensions.

### React / TSX Usage

Always provide `width` and `height` props to the `img` tag or `GalleryFrame` component. These do not force a fixed pixel size (CSS controls that) but establish the **aspect ratio** for the browser to reserve space.

**✅ Correct:**
```tsx
<img 
    src={useBaseUrl("/img/example.webp")} 
    alt="Example"
    className="w-full h-auto" // CSS controls actual display size
    width={1200}              // Intrinsic width
    height={800}              // Intrinsic height
/>
```

**❌ Incorrect:**
```tsx
<img 
    src={useBaseUrl("/img/example.webp")} 
    alt="Example"
    // Missing width/height causes page to jump when image loads
/>
```

### Data Files
For arrays of images (e.g., `galleryData.ts`), always include dimension properties:

```typescript
export const artworks = [
    {
        imagePath: '/img/art.webp',
        width: 1200,
        height: 1600,
        // ...
    }
]
```

## 6. Photography Series & High-Res Assets

Per the limitations of our deployment platform (Cloudflare Pages), individual assets must not exceed **25MB**.

-   **High-Res Downloads**:
    -   Original 100MP photos (`.JPG`) typically exceed this limit.
    -   **Requirement**: Compress "original" download files to approximately **24MB**. Use Lightroom or Photoshop to reduce quality slightly (e.g., Quality 85-90) until they fit.
    -   Store these in `static/photography/YYYY/MM/`.
    -   Never load these directly in `<img>` tags; use them only for `<a>` download/view links.

## 7. EXIF Data Standards

To provide meaningful information to viewers, EXIF data displays must adhere to the following:

-   **Source of Truth**: EXIF data **MUST** be extracted from the actual image file (during build time or runtime) to ensure accuracy. Do not manually hardcode values that might be incorrect.
-   **Relevance**:
    -   Avoid repetitive information. Since we primarily use the GFX100S + GF45mm f/2.8, displaying "Camera" and "Lens" for every photo is redundant.
    -   **Prioritize Unique Data**: Show parameters that define the specific shot's look:
        -   **Shutter Speed**
        -   **Aperture**
        -   **ISO**
        -   **Exposure Compensation** (EV)
        -   **Film Simulation** (e.g., Classic Chrome, Nostalgic Neg) - *Critical for Fujifilm shooters*

