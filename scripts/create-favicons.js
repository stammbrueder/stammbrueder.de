import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const svgPath = join(publicDir, 'favicon.svg');

// Alternative: Verwende sharp wenn verfügbar, sonst Fallback
async function convertSvgToPng() {
  try {
    // Versuche sharp zu verwenden
    const sharp = (await import('sharp')).default;
    const svg = readFileSync(svgPath);
    
    const sizes = [16, 32, 180];
    
    for (const size of sizes) {
      const outputPath = size === 180 
        ? join(publicDir, 'apple-touch-icon.png')
        : join(publicDir, `favicon-${size}.png`);
      
      await sharp(svg)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Erstellt: ${outputPath}`);
    }
    
    // Erstelle auch favicon.ico aus 32x32
    const ico32 = await sharp(svg)
      .resize(32, 32)
      .png()
      .toBuffer();
    
    writeFileSync(join(publicDir, 'favicon.ico'), ico32);
    console.log(`✓ Erstellt: favicon.ico`);
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('sharp ist nicht installiert. Installiere es mit: npm install sharp');
      console.error('Oder erstelle die PNGs manuell aus dem SVG in folgenden Größen:');
      console.error('- 16x16 → favicon-16.png');
      console.error('- 32x32 → favicon-32.png');
      console.error('- 180x180 → apple-touch-icon.png');
      process.exit(1);
    } else {
      throw error;
    }
  }
}

convertSvgToPng().catch(console.error);

