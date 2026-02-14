export interface GrundrissElement {
  name: string;
  description: string;
}

export interface GrundrissImage {
  src: string;
  alt: string;
}

export interface Grundriss {
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  images: GrundrissImage[];
  elements: GrundrissElement[];
  additionalInfo?: string;
}

export const grundrisse: Grundriss[] = [
  {
    name: 'kastenwagen-blue',
    title: 'Blue-Grundriss – Bewährter Campingbus-Grundriss für individuelle Ausbauten',
    description: 'Der Blue-Grundriss ist das Ergebnis jahrelanger Erfahrung und zahlreicher umgesetzter Projekte. Er dient als solide Basis für individuelle Campingbus-Ausbauten und hat sich in verschiedenen Varianten bewährt – von großen Familiencampern bis hin zu kompakten Zweipersonen-Ausbauten.',
    shortDescription: 'Flexible Basis für Camper-Umbauten, kompatibel mit verschiedenen Fahrzeugtypen.',
    images: [
      {
        src: '/images/referenzen/campingbus-blue/cad-blue-oben.png',
        alt: 'CAD-Zeichnung des Blue-Grundrisses von oben. Planungszeichnung des bewährten Campingbus-Grundrisses.'
      },
      {
        src: '/images/referenzen/campingbus-blue/cad-blue-vorderseite.png',
        alt: 'CAD-Zeichnung des Blue-Grundrisses von vorne. Planungszeichnung des bewährten Campingbus-Grundrisses.'
      },
      {
        src: '/images/referenzen/campingbus-blue/cad-blue-vorderseite-inkl-chassi.png',
        alt: 'CAD-Zeichnung des Blue-Grundrisses von vorne mit Chassis. Planungszeichnung inklusive Fahrgestell.'
      },
      {
        src: '/images/referenzen/campingbus-blue/cad-blue-rueckseite.png',
        alt: 'CAD-Zeichnung des Blue-Grundrisses von hinten. Planungszeichnung des bewährten Campingbus-Grundrisses.'
      },
      {
        src: '/images/referenzen/campingbus-blue/cad-blue-rueckseite-inkl-chassi.png',
        alt: 'CAD-Zeichnung des Blue-Grundrisses von hinten mit Chassis. Planungszeichnung inklusive Fahrgestell.'
      }
    ],
    elements: [
      {
        name: 'Hubbett (Hub-Doppelbett)',
        description: 'Elektrisch verstellbar, tagsüber unter der Decke für mehr Wohnraum'
      },
      {
        name: 'Auszugsplattform im Heck',
        description: 'Zusätzlicher Stauraum und flexible Nutzung'
      },
      {
        name: 'Zwei Sitzbänke',
        description: 'Komfortable Sitzgelegenheiten für den Alltag'
      },
      {
        name: 'Großer Wassertank',
        description: 'Typisch 130 Liter für ausreichend Autarkie'
      },
      {
        name: 'Außendusche',
        description: 'Zusätzlicher Komfort unterwegs'
      },
      {
        name: 'Küche hinter der vorderen Sitzreihe',
        description: 'Mit tiefem Waschbecken und Kocher'
      },
      {
        name: 'Trockentrenntoilette',
        description: 'Praktisch und platzsparend'
      },
      {
        name: '58-Liter Kühlbox oder Kühlschrank',
        description: 'Für frische Lebensmittel'
      },
      {
        name: 'Solar auf dem Dach',
        description: 'Ca. 240 Ah Batterieleistung für Energieautarkie'
      },
      {
        name: 'Flexibel umbaubarer Innenraum',
        description: 'Viele Elemente in Eigenleistung anpassbar'
      }
    ],
    additionalInfo: 'Was den Blue-Grundriss auszeichnet, ist seine Flexibilität: Er bietet eine durchdachte Grundstruktur, die sich an verschiedene Fahrzeugtypen und Anforderungen anpassen lässt. Jeder Ausbau wird individuell geplant, aber die bewährten Elemente bleiben als solide Basis erhalten. Viele Elemente können in Eigenleistung gebaut oder angepasst werden, was dem Innenraum eine persönliche Note verleiht. Der Blue-Grundriss ist nicht starr, sondern eine flexible Basis, die sich den individuellen Bedürfnissen anpasst.'
  }
];

export function getGrundrissByName(name: string): Grundriss | undefined {
  return grundrisse.find(g => g.name === name);
}

export function getAllGrundrissNames(): string[] {
  return grundrisse.map(g => g.name);
}

