import { describe, it, expect } from 'vitest';
import { getImage, hasImage } from '../imageMap';

describe('imageMap', () => {
  describe('getImage', () => {
    it('sollte ein existierendes Bild zurückgeben', () => {
      // Prüfe, ob ein bekanntes Bild existiert
      const testPath = '/images/team/ralf.jpg';
      if (hasImage(testPath)) {
        const image = getImage(testPath);
        expect(image).toBeDefined();
        expect(typeof image.src).toBe('string');
      }
    });

    it('sollte einen Fehler werfen, wenn das Bild nicht existiert', () => {
      const nonExistentPath = '/images/non-existent.jpg';
      expect(() => getImage(nonExistentPath)).toThrow();
    });
  });

  describe('hasImage', () => {
    it('sollte true zurückgeben für existierende Bilder', () => {
      const testPath = '/images/team/ralf.jpg';
      expect(hasImage(testPath)).toBe(true);
    });

    it('sollte false zurückgeben für nicht-existierende Bilder', () => {
      const nonExistentPath = '/images/non-existent.jpg';
      expect(hasImage(nonExistentPath)).toBe(false);
    });
  });
});

