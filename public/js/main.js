/* Stammbrüder Website - Main JavaScript */

// Initialisiere Funktionen sofort, wenn DOM bereits geladen ist
function initializeAll() {
    initProjectFilters();
    initSmoothScrolling();
    initActiveNavigation();
    initScrollAnimations();
    initHeaderScroll();
}

// DOM Content Loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    // DOM ist bereits geladen, führe sofort aus
    initializeAll();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// Header Scroll Effect
function initHeaderScroll() {
    // Konstanten - Magic Numbers als benannte Werte
    // Größere Hysterese für stabileren Wechsel (verhindert Springen durch Höhenänderung)
    const SCROLL_THRESHOLD_SCROLLED = 150; // Groß → Klein (größerer Abstand)
    const SCROLL_THRESHOLD_UNSCROLLED = 50; // Klein → Groß (größerer Abstand)
    const SCROLL_HIDE_THRESHOLD = 10; // Mindest-Scroll-Distanz für Hide/Show
    const TRANSITION_DURATION = 300; // CSS Transition-Dauer in ms (entspricht var(--transition-normal))

    let header = document.querySelector('.header');
    let ticking = false;
    let retryCount = 0;
    const maxRetries = 20;

    // Klare Zustandsverwaltung
    const state = {
        isScrolled: false,
        isHidden: false,
        lastScrollY: 0,
        isTransitioning: false, // Lock während CSS-Transition
        transitionTimeout: null
    };

    // Retry-Logik falls Header noch nicht im DOM ist
    function findHeader() {
        if (!header && retryCount < maxRetries) {
            header = document.querySelector('.header');
            retryCount++;
            if (!header) {
                setTimeout(findHeader, 50);
                return false;
            }
        }
        return !!header;
    }

    // Transition-Lock: Verhindert State-Änderungen während CSS-Transition
    function setTransitionLock() {
        state.isTransitioning = true;

        // Clear existing timeout
        if (state.transitionTimeout) {
            clearTimeout(state.transitionTimeout);
        }

        // Entsperre nach Transition-Dauer
        state.transitionTimeout = setTimeout(() => {
            state.isTransitioning = false;
            state.transitionTimeout = null;
        }, TRANSITION_DURATION);
    }

    // Einzelner Initial-Check: Prüfe einmal beim DOM-Ready
    function checkInitialScroll() {
        if (!findHeader()) {
            // Retry nach kurzer Verzögerung
            setTimeout(checkInitialScroll, 50);
            return;
        }

        // Header gefunden, prüfe Scroll-Position und setze initialen Zustand
        const currentScrollY = window.scrollY;
        state.lastScrollY = currentScrollY;

        // Initialer Zustand basierend auf Scroll-Position (ohne Transition-Lock)
        if (currentScrollY > SCROLL_THRESHOLD_SCROLLED) {
            state.isScrolled = true;
            header.classList.add('scrolled');
        } else {
            state.isScrolled = false;
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
            state.isHidden = false;
        }
    }

    function updateHeader() {
        if (!header) {
            if (!findHeader()) {
                ticking = false;
                return;
            }
        }

        try {
            // Während Transition keine State-Änderungen (verhindert Springen)
            if (state.isTransitioning) {
                ticking = false;
                return;
            }

            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - state.lastScrollY);

            // Hysterese für scrolled-State: Verhindert Flackern
            // Größere Hysterese (150px / 50px) verhindert Springen durch Header-Höhenänderung
            if (!state.isScrolled && currentScrollY > SCROLL_THRESHOLD_SCROLLED) {
                // Wechsel von groß zu klein
                state.isScrolled = true;
                header.classList.add('scrolled');
                setTransitionLock(); // Lock während Transition
            } else if (state.isScrolled && currentScrollY < SCROLL_THRESHOLD_UNSCROLLED) {
                // Wechsel von klein zu groß
                state.isScrolled = false;
                header.classList.remove('scrolled');
                header.classList.remove('header-hidden');
                state.isHidden = false;
                setTransitionLock(); // Lock während Transition
            }

            // Hide/Show Navigation basierend auf Scroll-Richtung
            // Nur wenn gescrollt ist und 70% der Viewport-Höhe erreicht wurde
            // Hide/Show hat keine Höhenänderung, daher kein Transition-Lock nötig
            const viewportHeight = window.innerHeight;
            const scrollHideThreshold = viewportHeight * 0.5; // 50% der Viewport-Höhe

            if (state.isScrolled && currentScrollY > scrollHideThreshold && scrollDifference > SCROLL_HIDE_THRESHOLD) {
                if (currentScrollY > state.lastScrollY) {
                    // Nach unten scrollen - Navigation verstecken
                    if (!state.isHidden) {
                        header.classList.add('header-hidden');
                        state.isHidden = true;
                    }
                } else if (currentScrollY < state.lastScrollY) {
                    // Nach oben scrollen - Navigation anzeigen
                    if (state.isHidden) {
                        header.classList.remove('header-hidden');
                        state.isHidden = false;
                    }
                }
            }

            state.lastScrollY = currentScrollY;
        } catch (error) {
            console.warn('Header scroll update error:', error);
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    // Einzelner Initial-Check: Nur einmal beim DOM-Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkInitialScroll, { once: true });
    } else {
        // DOM ist bereits geladen, führe sofort aus
        checkInitialScroll();
    }

    // Scroll-Event-Listener registrieren
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Navigation Functions
// initNavigation() wurde nach MobileMenu.astro migriert (client:load)

// Project Filter Functions
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    // Quick fade out before hiding
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.style.opacity = '';
                        card.style.transform = '';
                    }, 200);
                }
            });
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation
function initActiveNavigation() {
    const currentPath = (window.location.pathname.replace(/\/$/, '') || '/');
    const navLinks = document.querySelectorAll('.nav-links a');
    const contactBtn = document.querySelector('.nav-contact-btn');

    const leistungenPaths = ['/leistungen', '/massivholztische', '/camperausbau', '/cnc-fraesarbeiten'];

    navLinks.forEach(link => {
        link.classList.remove('active');

        const linkPath = (new URL(link.href).pathname.replace(/\/$/, '') || '/');

        // Exact match
        if (currentPath === linkPath ||
            (currentPath === '/' && linkPath === '/index.html') ||
            (currentPath === '/index.html' && linkPath === '/')) {
            link.classList.add('active');
        }

        // Special handling for /referenzen - also active on /referenzen/[slug]
        if (linkPath === '/referenzen' && (currentPath === '/referenzen' || currentPath.startsWith('/referenzen/'))) {
            link.classList.add('active');
        }

        // Special handling for "Unser Handwerk" - active on leistungen and sub-pages
        if (linkPath === '/leistungen' && leistungenPaths.includes(currentPath)) {
            link.classList.add('active');
        }
    });

    // Update contact button active state
    if (contactBtn) {
        contactBtn.classList.remove('active');
        const contactPath = (new URL(contactBtn.href).pathname.replace(/\/$/, '') || '/');
        if (currentPath === contactPath) {
            contactBtn.classList.add('active');
        }
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy Loading Enhancement
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Preload Hero-Bilder nur auf der Startseite (wenn Hero-Slideshow vorhanden ist)
    const heroSlideshow = document.querySelector('.hero__slideshow');
    if (heroSlideshow) {
        const criticalImages = [
            '/images/hero/stammbrueder-hero.jpg',
            '/images/hero/stammbrueder-hero.avif',
            '/images/hero/stammbrueder-hero.webp'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Scroll performance optimization wird jetzt von initHeaderScroll() übernommen
    // Diese doppelte Logik wurde entfernt, um Konflikte zu vermeiden
}

// Initialize performance optimizations
initPerformanceOptimizations();
initLazyLoading();

// Lightbox functionality - WURDE ZU LightboxInteractions.astro migriert
// Diese Funktion wird nicht mehr verwendet, da Lightbox jetzt über Astro-Komponente verwaltet wird
// function initLightbox() wurde entfernt - siehe src/components/LightboxInteractions.astro

// Lightbox Gallery Items Initialisierung - WURDE ZU LightboxInteractions.astro migriert
// Diese Funktionen werden nicht mehr verwendet, da Lightbox jetzt über Astro-Komponente verwaltet wird
// initGalleryItems(), handleGalleryItemClick(), initializeGalleryItemsWithDelay() wurden entfernt
// Siehe src/components/LightboxInteractions.astro

// Gallery Slider Functionality - Echtes Endless Scrolling mit Duplikaten
function initGallerySlider() {
    const galleryGrid = document.querySelector('.gallery-grid[data-slider]');
    if (!galleryGrid) return;

    const track = galleryGrid.querySelector('.gallery-slider-track');
    const allItems = galleryGrid.querySelectorAll('.gallery-item');
    const originalItems = galleryGrid.querySelectorAll('.gallery-item:not(.gallery-item-clone)');
    const prevBtn = galleryGrid.querySelector('.gallery-slider-prev');
    const nextBtn = galleryGrid.querySelector('.gallery-slider-next');
    const dots = galleryGrid.querySelectorAll('.gallery-slider-dot');

    if (!track || originalItems.length === 0) return;

    const originalCount = parseInt(galleryGrid.getAttribute('data-original-count')) || originalItems.length;
    // Bei 2 Bildern weniger Duplikate, bei 3+ mehr für nahtloses Scrolling
    const cloneCount = originalCount === 2 ? 10 : 20;

    let currentOriginalIndex = 0; // Aktuelles Original-Bild (0-basiert)
    let itemsPerView = 3; // Default Desktop
    let isTransitioning = false;
    let isJumping = false; // Flag für unsichtbare Sprünge
    let isInitialized = false; // Flag um mehrfache Initialisierung zu verhindern

    // Determine items per view based on screen size
    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            itemsPerView = 1;
        } else if (width <= 1023) {
            itemsPerView = 2;
        } else {
            itemsPerView = 3;
        }
    }

    updateItemsPerView();
    window.addEventListener('resize', () => {
        updateItemsPerView();
        goToOriginalImage(currentOriginalIndex);
    });

    function updateDots() {
        dots.forEach((dot, imageIndex) => {
            if (imageIndex === currentOriginalIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Finde die Position eines Original-Bildes im Track (inkl. Duplikate)
    function getTrackPositionForOriginal(originalIndex) {
        // Duplikate am Anfang: cloneCount
        // Original-Bilder: originalCount
        // Duplikate am Ende: cloneCount
        // Position = cloneCount + originalIndex
        return cloneCount + originalIndex;
    }

    // Prüfe, ob wir ein Duplikat erreicht haben und springe zur Original-Position (Infinite Loop)
    // Basierend auf sichtbarem Bereich, nicht auf absoluter Position
    function checkAndJumpIfNeeded() {
        if (isJumping || isTransitioning) return;

        const currentTransform = track.style.transform;
        const currentTranslateX = parseFloat(currentTransform.match(/translateX\(([^)]+)\)/)?.[1] || '0');

        const containerWidth = galleryGrid.offsetWidth;
        const itemWidth = allItems[0].offsetWidth;
        const itemMargin = parseFloat(getComputedStyle(allItems[0]).marginRight) || 0;
        const totalItemWidth = itemWidth + itemMargin;

        // Berechne Offset für Zentrierung
        let offset = 0;
        if (itemsPerView === 1) {
            offset = (containerWidth - itemWidth) / 2;
        } else {
            offset = (containerWidth - (itemsPerView * totalItemWidth - itemMargin)) / 2;
        }

        // Berechne welches Element gerade sichtbar ist (basierend auf translateX und Offset)
        // trackPosition = offset - translateX gibt die Position im Track an
        const trackPosition = offset - currentTranslateX;

        // Berechne den Index des ersten sichtbaren Elements
        const firstVisibleIndex = Math.round(trackPosition / totalItemWidth);

        // Berechne das zentrierte Element (wichtig für itemsPerView > 1)
        let centerIndex;
        if (itemsPerView === 1) {
            centerIndex = firstVisibleIndex;
        } else {
            const itemsBeforeCenter = Math.floor((itemsPerView - 1) / 2);
            centerIndex = firstVisibleIndex + itemsBeforeCenter;
        }

        // Prüfe, ob wir wirklich weit in den Duplikat-Bereich hinein sind (nicht nur am Rand)
        // Nur springen, wenn wir mindestens 1 Element tief in den Duplikat-Bereich sind
        const threshold = 1; // Mindestabstand zum Original-Bereich

        // Prüfe, ob das zentrierte Element ein Duplikat am Anfang ist (und wir weit genug drin sind)
        if (centerIndex < cloneCount - threshold) {
            // Wir sind weit genug im Duplikat-Bereich am Anfang
            const cloneItem = allItems[centerIndex];
            if (cloneItem && cloneItem.classList.contains('gallery-item-clone')) {
                const originalIndex = parseInt(cloneItem.getAttribute('data-original-index'));
                // Finde das entsprechende Original-Element
                const originalTrackPosition = getTrackPositionForOriginal(originalIndex);
                // Berechne neue translateX mit gleicher visueller Position
                let newTranslateX;
                if (itemsPerView === 1) {
                    const activeItemPosition = originalTrackPosition * totalItemWidth;
                    newTranslateX = offset - activeItemPosition;
                } else {
                    const itemsBeforeCenter = Math.floor((itemsPerView - 1) / 2);
                    const startIndex = originalTrackPosition - itemsBeforeCenter;
                    const trackPositionForStart = startIndex * totalItemWidth;
                    newTranslateX = offset - trackPositionForStart;
                }
                jumpToPosition(newTranslateX, offset);
                return true;
            }
        }

        // Prüfe, ob das zentrierte Element ein Duplikat am Ende ist (und wir weit genug drin sind)
        if (centerIndex >= cloneCount + originalCount + threshold) {
            // Wir sind weit genug im Duplikat-Bereich am Ende
            const cloneItem = allItems[centerIndex];
            if (cloneItem && cloneItem.classList.contains('gallery-item-clone')) {
                const originalIndex = parseInt(cloneItem.getAttribute('data-original-index'));
                // Finde das entsprechende Original-Element
                const originalTrackPosition = getTrackPositionForOriginal(originalIndex);
                // Berechne neue translateX mit gleicher visueller Position
                let newTranslateX;
                if (itemsPerView === 1) {
                    const activeItemPosition = originalTrackPosition * totalItemWidth;
                    newTranslateX = offset - activeItemPosition;
                } else {
                    const itemsBeforeCenter = Math.floor((itemsPerView - 1) / 2);
                    const startIndex = originalTrackPosition - itemsBeforeCenter;
                    const trackPositionForStart = startIndex * totalItemWidth;
                    newTranslateX = offset - trackPositionForStart;
                }
                jumpToPosition(newTranslateX, offset);
                return true;
            }
        }

        return false;
    }

    // Unsichtbarer Sprung zu einer bestimmten translateX-Position
    function jumpToPosition(translateX, offset) {
        if (isJumping) return;
        isJumping = true;

        // Keine Transition für unsichtbaren Sprung
        track.style.transition = 'none';
        track.style.transform = `translateX(${translateX}px)`;

        // Update currentOriginalIndex basierend auf neuer Position
        const itemWidth = allItems[0].offsetWidth;
        const itemMargin = parseFloat(getComputedStyle(allItems[0]).marginRight) || 0;
        const totalItemWidth = itemWidth + itemMargin;
        const trackPosition = offset - translateX;

        // Berechne welches Element jetzt sichtbar ist
        let centerIndex;
        if (itemsPerView === 1) {
            centerIndex = Math.round(trackPosition / totalItemWidth);
        } else {
            const itemsBeforeCenter = Math.floor((itemsPerView - 1) / 2);
            centerIndex = Math.round(trackPosition / totalItemWidth) + itemsBeforeCenter;
        }

        // Konvertiere Track-Index zu Original-Index
        if (centerIndex >= cloneCount && centerIndex < cloneCount + originalCount) {
            currentOriginalIndex = centerIndex - cloneCount;
        } else {
            // Fallback: Berechne basierend auf Position
            const itemIndex = centerIndex - cloneCount;
            currentOriginalIndex = Math.max(0, Math.min(itemIndex, originalCount - 1));
        }

        updateDots();
        updateButtons();

        // Stelle Transition wieder her
        setTimeout(() => {
            isJumping = false;
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 50);
    }

    function goToOriginalImage(originalIndex) {
        if (isTransitioning || isJumping) return;

        // Normalisiere Index mit Modulo für infinite Scrolling (1-2-3-1-2-3)
        // Sicherstellen, dass Index immer im gültigen Bereich liegt
        const normalizedIndex = ((originalIndex % originalCount) + originalCount) % originalCount;
        currentOriginalIndex = normalizedIndex;

        // Berechne die Position im Track (inkl. Duplikate)
        const trackPosition = getTrackPositionForOriginal(currentOriginalIndex);

        // Berechne die Position, um das aktive Bild zu zentrieren
        const containerWidth = galleryGrid.offsetWidth;
        const itemWidth = allItems[0].offsetWidth;
        const itemMargin = parseFloat(getComputedStyle(allItems[0]).marginRight) || 0;
        const totalItemWidth = itemWidth + itemMargin;

        // Berechne Offset für Zentrierung
        let offset = 0;
        if (itemsPerView === 1) {
            // Bei 1 Bild: Zentriere es komplett
            offset = (containerWidth - itemWidth) / 2;
        } else {
            // Bei mehreren Bildern: Positioniere so, dass aktives Bild in der Mitte der sichtbaren Bilder ist
            offset = (containerWidth - (itemsPerView * totalItemWidth - itemMargin)) / 2;
        }

        // Berechne translateX basierend auf trackPosition
        let translateX;
        if (itemsPerView === 1) {
            // Bei 1 Bild: Zentriere das aktive Element
            const activeItemPosition = trackPosition * totalItemWidth;
            translateX = offset - activeItemPosition;
        } else {
            // Bei mehreren Bildern: Positioniere so, dass aktives Bild zentriert ist
            const itemsBeforeCenter = Math.floor((itemsPerView - 1) / 2);
            // startIndex ist das erste sichtbare Element
            // trackPosition ist die Position des zentrierten Elements
            // startIndex = trackPosition - itemsBeforeCenter
            const startIndex = trackPosition - itemsBeforeCenter;
            // Stelle sicher, dass wir nicht vor dem Anfang sind (aber erlaube Duplikate)
            const trackPositionForStart = startIndex * totalItemWidth;
            translateX = offset - trackPositionForStart;
        }

        // Setze Transition und Position (nur einmal!)
        isTransitioning = true;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${translateX}px)`;

        updateDots();
        updateButtons();

        // Nutze transitionend Event für präziseres Timing
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }

    // Berechne den zentrierten Original-Index basierend auf aktueller Position
    function updateCurrentOriginalIndexFromPosition() {
        const currentTransform = track.style.transform;
        const currentTranslateX = parseFloat(currentTransform.match(/translateX\(([^)]+)\)/)?.[1] || '0');

        const containerWidth = galleryGrid.offsetWidth;
        const itemWidth = allItems[0].offsetWidth;
        const itemMargin = parseFloat(getComputedStyle(allItems[0]).marginRight) || 0;
        const totalItemWidth = itemWidth + itemMargin;

        // Berechne Offset für Zentrierung
        let offset = 0;
        if (itemsPerView === 1) {
            offset = (containerWidth - itemWidth) / 2;
        } else {
            offset = (containerWidth - (itemsPerView * totalItemWidth - itemMargin)) / 2;
        }

        // Berechne welches Element zentriert ist
        // trackPosition = offset - translateX gibt die Position des ersten sichtbaren Elements
        const trackPosition = offset - currentTranslateX;
        const firstVisibleIndex = Math.round(trackPosition / totalItemWidth);
        let centerIndex;

        if (itemsPerView === 1) {
            // Bei 1 Bild: Das sichtbare Element ist zentriert
            centerIndex = firstVisibleIndex;
        } else {
            // Bei mehreren Bildern: Zentriertes Element = erstes sichtbares + itemsBeforeCenter
            const itemsBeforeCenter = Math.floor((itemsPerView - 1) / 2);
            centerIndex = firstVisibleIndex + itemsBeforeCenter;
        }

        // Konvertiere Track-Index zu Original-Index
        if (centerIndex >= cloneCount && centerIndex < cloneCount + originalCount) {
            // Wir sind bei einem Original-Element
            currentOriginalIndex = centerIndex - cloneCount;
        } else {
            // Wir sind bei einem Duplikat - das sollte nicht passieren, aber als Fallback:
            // Berechne basierend auf Position (wird durch checkAndJumpIfNeeded korrigiert)
            const itemIndex = centerIndex - cloneCount;
            currentOriginalIndex = Math.max(0, Math.min(itemIndex, originalCount - 1));
        }

        updateDots();
    }

    // Handler für transitionend Event
    function handleTransitionEnd(e) {
        // Nur auf transform-Transitions reagieren
        if (e.propertyName !== 'transform') return;

        isTransitioning = false;

        // Aktualisiere currentOriginalIndex basierend auf aktueller Position
        updateCurrentOriginalIndexFromPosition();

        // Prüfe, ob wir zu einem Duplikat gescrollt sind und springe nahtlos zum Original
        // Dies ermöglicht echtes infinite Scrolling ohne visuelle Sprünge
        checkAndJumpIfNeeded();
    }


    function updateButtons() {
        // Buttons sind immer aktiv (endless carousel)
        if (prevBtn) {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }

    // Navigation buttons - endless scrolling mit Modulo
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Modulo-basierte Navigation: immer zum vorherigen Bild (1→3, 2→1, 3→2)
            const nextIndex = (currentOriginalIndex - 1 + originalCount) % originalCount;
            goToOriginalImage(nextIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Modulo-basierte Navigation: immer zum nächsten Bild (1→2, 2→3, 3→1)
            const nextIndex = (currentOriginalIndex + 1) % originalCount;
            goToOriginalImage(nextIndex);
        });
    }

    // Dots navigation - direkt zu Original-Bild
    dots.forEach((dot, originalIndex) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToOriginalImage(originalIndex);
        });
    });

    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next (Modulo-basiert)
                const nextIndex = (currentOriginalIndex + 1) % originalCount;
                goToOriginalImage(nextIndex);
            } else {
                // Swipe right - previous (Modulo-basiert)
                const nextIndex = (currentOriginalIndex - 1 + originalCount) % originalCount;
                goToOriginalImage(nextIndex);
            }
        }
    }

    // Keyboard navigation - endless scrolling mit Modulo
    galleryGrid.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            // Modulo-basierte Navigation: immer zum vorherigen Bild
            const nextIndex = (currentOriginalIndex - 1 + originalCount) % originalCount;
            goToOriginalImage(nextIndex);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            // Modulo-basierte Navigation: immer zum nächsten Bild
            const nextIndex = (currentOriginalIndex + 1) % originalCount;
            goToOriginalImage(nextIndex);
        }
    });

    // Initialize - starte bei erstem Original-Bild (nach Duplikaten)
    // Setze initiale Position OHNE Transition (instant)
    function initializeSlider() {
        // Verhindere mehrfache Initialisierung
        if (isInitialized) return;

        // Warte bis Container und Bilder vollständig geladen sind
        const containerWidth = galleryGrid.offsetWidth;
        const firstItem = allItems[0];

        // Verbesserte Prüfung: Container muss sichtbar und sinnvoll groß sein
        if (!firstItem || firstItem.offsetWidth === 0 || containerWidth === 0 ||
            containerWidth < 100 || firstItem.offsetWidth < 50) {
            // Wenn noch nicht geladen, warte kurz
            setTimeout(initializeSlider, 50);
            return;
        }

        // Setze initiale Position ohne Transition
        const trackPosition = getTrackPositionForOriginal(0);
        const itemWidth = firstItem.offsetWidth;
        const itemMargin = parseFloat(getComputedStyle(firstItem).marginRight) || 0;
        const totalItemWidth = itemWidth + itemMargin;

        // Berechne Offset für Zentrierung
        let offset = 0;
        if (itemsPerView === 1) {
            offset = (containerWidth - itemWidth) / 2;
        } else {
            offset = (containerWidth - (itemsPerView * totalItemWidth - itemMargin)) / 2;
        }

        // Berechne translateX
        let translateX;
        if (itemsPerView === 1) {
            const activeItemPosition = trackPosition * totalItemWidth;
            translateX = offset - activeItemPosition;
        } else {
            const itemsBeforeCenter = Math.floor((itemsPerView - 1) / 2);
            const startIndex = trackPosition - itemsBeforeCenter;
            const trackPositionForStart = startIndex * totalItemWidth;
            translateX = offset - trackPositionForStart;
        }

        // Debug-Ausgaben (temporär)
        console.log('Slider Initialisierung:', {
            containerWidth,
            itemWidth,
            itemMargin,
            totalItemWidth,
            trackPosition,
            itemsPerView,
            offset,
            translateX
        });

        // Fallback: Wenn translateX außerhalb eines sinnvollen Bereichs ist, neu berechnen
        if (Math.abs(translateX) > 100000 || isNaN(translateX)) {
            console.warn('translateX außerhalb sinnvollem Bereich, setze auf 0');
            translateX = 0;
        }

        // Setze Position OHNE Transition (instant)
        track.style.transition = 'none';
        track.style.transform = `translateX(${translateX}px)`;

        // Stelle Transition wieder her nach kurzer Verzögerung
        setTimeout(() => {
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 50);

        currentOriginalIndex = 0;
        updateDots();
        updateButtons();
        isInitialized = true;
    }

    // Warte auf vollständiges Laden der Seite mit requestAnimationFrame für besseres Timing
    function scheduleInitialization() {
        // Verwende requestAnimationFrame für besseres Timing
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Zwei Frames warten für sicherere Berechnung
                initializeSlider();
            });
        });
    }

    if (document.readyState === 'complete') {
        scheduleInitialization();
    } else {
        document.addEventListener('DOMContentLoaded', () => scheduleInitialization(), { once: true });
    }
}

// Initialize gallery slider when DOM is loaded
// Die Initialisierung erfolgt bereits innerhalb von initGallerySlider
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallerySlider);
} else {
    initGallerySlider();
}

// Export functions for global use
// initNavigation wurde nach MobileMenu.astro migriert (client:load)
window.Stammbrueder = {
    debounce,
    throttle,
    initProjectFilters,
    ...(window.openLightbox && { openLightbox: window.openLightbox })
};

