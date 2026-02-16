export const imageFormats = ['avif', 'webp', 'jpg'] as const;
export const imageFormatsPng = ['avif', 'webp', 'png'] as const;
export const imageQuality = 75;

/** Preset Standard: Card, [slug], referenzen, Lightbox */
export const imageWidthsStandard = [400, 800] as const;
export const imageSizesStandard = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
export const imageSizesTile = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px";

/** Preset Smaller: GallerySlider, ueber-uns Team */
export const imageWidthsSmaller = [200, 400, 800] as const;
export const imageSizesSmaller = "(max-width: 768px) 50vw, 400px";
export const imageSizesTeam = "(max-width: 768px) 100vw, 300px";

/** Hero-Slideshow */
export const imageWidthsHero = [1280, 1920] as const;
