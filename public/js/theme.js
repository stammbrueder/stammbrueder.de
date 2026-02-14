/* Stammbrüder Website - Theme Manager */

const ThemeManager = {
    // Verfügbare Themes
    themes: ['default', 'nature', 'olive', 'mint', 'earth', 'sage'],
    
    // Standard-Theme
    defaultTheme: 'default',
    
    // Storage Key
    storageKey: 'stammbrueder-theme',
    
    /**
     * Initialisiert das Theme-System
     */
    init() {
        // Lade gespeichertes Theme oder verwende Standard
        const savedTheme = this.getSavedTheme();
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.setTheme(savedTheme, false); // false = keine Animation beim Laden
        } else {
            this.setTheme(this.defaultTheme, false);
        }
        
        // Erstelle Theme-Switcher UI falls gewünscht
        this.createThemeSwitcher();
    },
    
    /**
     * Setzt ein Theme
     * @param {string} themeName - Name des Themes
     * @param {boolean} animate - Ob Transition animiert werden soll
     */
    setTheme(themeName, animate = true) {
        if (!this.themes.includes(themeName)) {
            console.warn(`Theme "${themeName}" existiert nicht. Verfügbare Themes:`, this.themes);
            return;
        }
        
        const html = document.documentElement;
        
        // Entferne alle Theme-Attribute
        this.themes.forEach(theme => {
            html.removeAttribute(`data-theme-${theme}`);
        });
        
        // Setze neues Theme
        html.setAttribute('data-theme', themeName);
        
        // Speichere Theme-Präferenz
        this.saveTheme(themeName);
        
        // Dispatch Event für andere Komponenten
        const event = new CustomEvent('themechange', {
            detail: { theme: themeName }
        });
        document.dispatchEvent(event);
        
        // Aktualisiere aktiven Zustand
        this.updateActiveState();
        
        if (animate) {
            // Trigger reflow für Animation
            void html.offsetWidth;
        }
    },
    
    /**
     * Gibt das aktuelle Theme zurück
     * @returns {string}
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || this.defaultTheme;
    },
    
    /**
     * Gibt alle verfügbaren Themes zurück
     * @returns {string[]}
     */
    getAvailableThemes() {
        return [...this.themes];
    },
    
    /**
     * Speichert Theme-Präferenz in localStorage
     * @param {string} themeName
     */
    saveTheme(themeName) {
        try {
            localStorage.setItem(this.storageKey, themeName);
        } catch (e) {
            console.warn('Theme-Präferenz konnte nicht gespeichert werden:', e);
        }
    },
    
    /**
     * Lädt Theme-Präferenz aus localStorage
     * @returns {string|null}
     */
    getSavedTheme() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (e) {
            console.warn('Theme-Präferenz konnte nicht geladen werden:', e);
            return null;
        }
    },
    
    /**
     * Erstellt Theme-Switcher UI
     */
    createThemeSwitcher() {
        // Prüfe ob fixed Theme-Switcher Container existiert
        const fixedSwitcher = document.getElementById('theme-switcher-fixed');
        if (!fixedSwitcher) {
            return; // Kein Container vorhanden, UI wird nicht erstellt
        }
        
        const toggleButton = fixedSwitcher.querySelector('.theme-switcher-toggle');
        const menu = fixedSwitcher.querySelector('.theme-switcher-menu');
        const optionsContainer = fixedSwitcher.querySelector('.theme-switcher-options');
        
        if (!toggleButton || !menu || !optionsContainer) {
            return;
        }
        
        // Erstelle Theme-Buttons
        this.themes.forEach(themeName => {
            const button = document.createElement('button');
            button.className = 'theme-switcher-btn';
            button.setAttribute('data-theme', themeName);
            button.setAttribute('aria-label', `Theme wechseln zu ${themeName}`);
            button.setAttribute('title', this.getThemeLabel(themeName));
            
            // Visuelle Vorschau (Farbkreis)
            const preview = document.createElement('span');
            preview.className = 'theme-preview';
            preview.style.setProperty('--theme-preview-color', this.getThemeColor(themeName));
            preview.style.backgroundColor = this.getThemeColor(themeName);
            button.appendChild(preview);
            
            // Label
            const label = document.createElement('span');
            label.className = 'theme-label';
            label.textContent = this.getThemeLabel(themeName);
            button.appendChild(label);
            
            // Event Listener
            button.addEventListener('click', () => {
                this.setTheme(themeName, true);
                this.updateActiveState();
                this.closeMenu();
            });
            
            optionsContainer.appendChild(button);
        });
        
        // Toggle-Funktion für Menü
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Click-Outside-Handler
        document.addEventListener('click', (e) => {
            if (!fixedSwitcher.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // ESC-Taste zum Schließen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.getAttribute('aria-hidden') === 'false') {
                this.closeMenu();
            }
        });
        
        // Initialisiere aktiven Zustand
        this.updateActiveState();
    },
    
    /**
     * Öffnet/Schließt das Theme-Menü
     */
    toggleMenu() {
        const fixedSwitcher = document.getElementById('theme-switcher-fixed');
        if (!fixedSwitcher) return;
        
        const toggleButton = fixedSwitcher.querySelector('.theme-switcher-toggle');
        const menu = fixedSwitcher.querySelector('.theme-switcher-menu');
        
        if (!toggleButton || !menu) return;
        
        const isOpen = menu.getAttribute('aria-hidden') === 'false';
        
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    },
    
    /**
     * Öffnet das Theme-Menü
     */
    openMenu() {
        const fixedSwitcher = document.getElementById('theme-switcher-fixed');
        if (!fixedSwitcher) return;
        
        const toggleButton = fixedSwitcher.querySelector('.theme-switcher-toggle');
        const menu = fixedSwitcher.querySelector('.theme-switcher-menu');
        
        if (!toggleButton || !menu) return;
        
        toggleButton.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
    },
    
    /**
     * Schließt das Theme-Menü
     */
    closeMenu() {
        const fixedSwitcher = document.getElementById('theme-switcher-fixed');
        if (!fixedSwitcher) return;
        
        const toggleButton = fixedSwitcher.querySelector('.theme-switcher-toggle');
        const menu = fixedSwitcher.querySelector('.theme-switcher-menu');
        
        if (!toggleButton || !menu) return;
        
        toggleButton.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    },
    
    /**
     * Aktualisiert aktiven Zustand der Theme-Buttons
     */
    updateActiveState() {
        const currentTheme = this.getCurrentTheme();
        const buttons = document.querySelectorAll('.theme-switcher-btn');
        
        buttons.forEach(button => {
            const themeName = button.getAttribute('data-theme');
            if (themeName === currentTheme) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    },
    
    /**
     * Gibt Label für Theme zurück
     * @param {string} themeName
     * @returns {string}
     */
    getThemeLabel(themeName) {
        const labels = {
            'default': 'Standard',
            'nature': 'Natur',
            'olive': 'Olive',
            'mint': 'Mint',
            'earth': 'Erde',
            'sage': 'Salbei'
        };
        return labels[themeName] || themeName;
    },
    
    /**
     * Gibt Hauptfarbe für Theme-Vorschau zurück
     * @param {string} themeName
     * @returns {string}
     */
    getThemeColor(themeName) {
        const colors = {
            'default': '#00D4AA', // Türkis
            'nature': '#4C8277',  // Grün
            'olive': '#565E30',   // Olivgrün
            'mint': '#008564',    // Mintgrün
            'earth': '#6B4F28',   // Erdfarben
            'sage': '#286B51'     // Salbeigrün
        };
        return colors[themeName] || '#000000';
    }
};

// Initialisiere Theme-Manager wenn DOM bereit ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ThemeManager.init();
    });
} else {
    ThemeManager.init();
}

// Export für globale Verwendung
window.ThemeManager = ThemeManager;

