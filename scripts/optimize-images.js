#!/usr/bin/env node

/**
 * Bildoptimierung Script für Stammbrüder Website
 * Konvertiert Bilder zu AVIF, WebP und optimiertem JPEG
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Konfiguration
const config = {
  inputDir: './images',
  outputDir: './images',
  formats: {
    avif: { quality: 75 },
    webp: { quality: 80 },
    jpeg: { quality: 85 }
  },
  sizes: {
    hero: { width: 1920, height: 1080 },
    project: { width: 800, height: 600 },
    team: { width: 400, height: 400 },
    thumbnail: { width: 300, height: 200 }
  }
};

function getOutputPath(inputPath, format, size = null) {
  const dir = path.dirname(inputPath);
  const name = path.basename(inputPath, path.extname(inputPath));
  const sizeSuffix = size ? `-${size}` : '';
  return path.join(dir, `${name}${sizeSuffix}.${format}`);
}

async function optimizeImage(inputPath, outputPath, options) {
  try {
    await sharp(inputPath)
      .resize(options.width, options.height, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat(options.format, { quality: options.quality })
      .toFile(outputPath);

    console.log(`✓ ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Fehler bei ${path.basename(outputPath)}:`, error.message);
  }
}

async function processImage(inputPath) {
  const fileName = path.basename(inputPath);
  const ext = path.extname(inputPath).toLowerCase();

  // Nur Bilddateien verarbeiten
  if (!['.jpg', '.jpeg', '.png', '.tiff'].includes(ext)) {
    return;
  }

  console.log(`\nVerarbeite: ${fileName}`);

  // Bestimme Bildtyp basierend auf Ordner
  let sizeConfig = config.sizes.project; // Standard
  if (inputPath.includes('/hero/')) {
    sizeConfig = config.sizes.hero;
  } else if (inputPath.includes('/team/')) {
    sizeConfig = config.sizes.team;
  } else if (inputPath.includes('/thumbnails/')) {
    sizeConfig = config.sizes.thumbnail;
  }

  // Erstelle alle Formate
  for (const [format, formatConfig] of Object.entries(config.formats)) {
    const outputPath = getOutputPath(inputPath, format);
    await optimizeImage(inputPath, outputPath, {
      ...sizeConfig,
      ...formatConfig,
      format: format
    });
  }

  // Erstelle auch optimiertes Original (JPEG)
  const optimizedJpegPath = getOutputPath(inputPath, 'jpg');
  await optimizeImage(inputPath, optimizedJpegPath, {
    ...sizeConfig,
    format: 'jpeg',
    quality: config.formats.jpeg.quality
  });
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.isFile()) {
      await processImage(fullPath);
    }
  }
}

// Hauptfunktion
async function main() {
  console.log('🚀 Starte Bildoptimierung...\n');

  if (!fs.existsSync(config.inputDir)) {
    console.error(`❌ Eingabeordner nicht gefunden: ${config.inputDir}`);
    process.exit(1);
  }

  try {
    await processDirectory(config.inputDir);
    console.log('\n✅ Bildoptimierung abgeschlossen!');
  } catch (error) {
    console.error('❌ Fehler bei der Bildoptimierung:', error);
    process.exit(1);
  }
}

// Script ausführen
if (require.main === module) {
  main();
}

module.exports = { optimizeImage, processImage, processDirectory };
