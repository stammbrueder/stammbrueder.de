/**
 * Utility-Funktionen für Error Handling
 */

/**
 * Wrapper für getCollection() mit Error Handling
 */
export async function safeGetCollection<T>(
  collectionName: string,
  filter?: (entry: any) => boolean
): Promise<T[]> {
  try {
    const { getCollection } = await import('astro:content');
    if (filter) {
      return await getCollection(collectionName, filter) as T[];
    }
    return await getCollection(collectionName) as T[];
  } catch (error) {
    console.error(`Fehler beim Laden der Collection "${collectionName}":`, error);
    return [];
  }
}

/**
 * Wrapper für getStaticPaths() mit Error Handling
 */
export async function safeGetStaticPaths(
  pathsFn: () => Promise<Array<{ params: any; props?: any }>>
): Promise<Array<{ params: any; props?: any }>> {
  try {
    return await pathsFn();
  } catch (error) {
    console.error('Fehler in getStaticPaths():', error);
    return [];
  }
}

/**
 * Loggt Fehler und gibt eine benutzerfreundliche Fehlermeldung zurück
 */
export function handleError(error: unknown, context: string): string {
  const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
  console.error(`[${context}]`, error);
  
  // In Production: Generische Fehlermeldung
  if (import.meta.env.PROD) {
    return 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.';
  }
  
  // In Development: Detaillierte Fehlermeldung
  return `Fehler in ${context}: ${errorMessage}`;
}

