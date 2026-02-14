/* Stammbrüder Website - Lightbox Functionality */

// Lightbox Object
const Lightbox = {
    isOpen: false,
    currentIndex: 0,
    images: [],
    
    init() {
        this.createLightboxHTML();
        this.bindEvents();
    },
    
    createLightboxHTML() {
        const lightboxHTML = `
            <div id="lightbox" class="lightbox" style="display: none;">
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Schließen">&times;</button>
                    <button class="lightbox-prev" aria-label="Vorheriges Bild">&lsaquo;</button>
                    <button class="lightbox-next" aria-label="Nächstes Bild">&rsaquo;</button>
                    <div class="lightbox-image-container">
                        <img class="lightbox-image" src="" alt="">
                    </div>
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        // Add CSS styles
        this.addLightboxStyles();
    },
    
    addLightboxStyles() {
        const styles = `
            <style id="lightbox-styles">
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    cursor: pointer;
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                .lightbox-image-container {
                    position: relative;
                    max-width: 100%;
                    max-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .lightbox-image {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                
                .lightbox-close,
                .lightbox-prev,
                .lightbox-next {
                    position: absolute;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    border: none;
                    font-size: 2rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                    z-index: 1001;
                }
                
                .lightbox-close:hover,
                .lightbox-prev:hover,
                .lightbox-next:hover {
                    background: rgba(0, 0, 0, 0.9);
                }
                
                .lightbox-close {
                    top: 20px;
                    right: 20px;
                }
                
                .lightbox-prev {
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                .lightbox-next {
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                .lightbox-caption {
                    color: white;
                    text-align: center;
                    margin-top: 1rem;
                    font-size: 1.1rem;
                    max-width: 600px;
                }
                
                .lightbox-counter {
                    color: white;
                    text-align: center;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                    opacity: 0.8;
                }
                
                @media (max-width: 768px) {
                    .lightbox-prev,
                    .lightbox-next {
                        display: none;
                    }
                    
                    .lightbox-image-container {
                        max-height: 70vh;
                    }
                    
                    .lightbox-close {
                        top: 10px;
                        right: 10px;
                        width: 40px;
                        height: 40px;
                        font-size: 1.5rem;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    },
    
    bindEvents() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const overlay = document.querySelector('.lightbox-overlay');
        
        // Close events
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());
        
        // Navigation events
        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
        
        // Touch events for mobile
        let startX = 0;
        let startY = 0;
        
        lightbox.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        lightbox.addEventListener('touchend', (e) => {
            if (!this.isOpen) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    },
    
    open(imageSrc, images = [], currentIndex = 0) {
        this.images = images;
        this.currentIndex = currentIndex;
        this.isOpen = true;
        
        const lightbox = document.getElementById('lightbox');
        const image = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        const counter = document.querySelector('.lightbox-counter');
        
        // Set image source
        image.src = imageSrc;
        image.alt = this.getImageAlt(imageSrc);
        
        // Set caption
        caption.textContent = this.getImageCaption(imageSrc);
        
        // Set counter
        if (this.images.length > 1) {
            counter.textContent = `${currentIndex + 1} / ${this.images.length}`;
        } else {
            counter.textContent = '';
        }
        
        // Show lightbox
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus management
        lightbox.focus();
    },
    
    close() {
        this.isOpen = false;
        
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        
        // Return focus to the element that opened the lightbox
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
        }
    },
    
    prev() {
        if (this.images.length <= 1) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    },
    
    next() {
        if (this.images.length <= 1) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    },
    
    updateImage() {
        const imageSrc = this.images[this.currentIndex];
        const image = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        const counter = document.querySelector('.lightbox-counter');
        
        image.src = imageSrc;
        image.alt = this.getImageAlt(imageSrc);
        caption.textContent = this.getImageCaption(imageSrc);
        counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    },
    
    getImageAlt(imageSrc) {
        // Extract alt text from the original image element
        const originalImg = document.querySelector(`img[src*="${imageSrc.split('/').pop().split('.')[0]}"]`);
        return originalImg ? originalImg.alt : 'Projektbild';
    },
    
    getImageCaption(imageSrc) {
        // Extract caption from the original image element or its parent
        const originalImg = document.querySelector(`img[src*="${imageSrc.split('/').pop().split('.')[0]}"]`);
        if (originalImg) {
            const caption = originalImg.closest('.gallery-item')?.querySelector('.caption');
            return caption ? caption.textContent : originalImg.alt;
        }
        return 'Projektbild';
    }
};

// Global function for opening lightbox
function openLightbox(imageSrc, images = [], currentIndex = 0) {
    // Store reference to currently focused element
    Lightbox.lastFocusedElement = document.activeElement;
    
    // If no images array provided, try to find all gallery images
    if (images.length === 0) {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        images = Array.from(galleryImages).map(img => img.src);
        currentIndex = images.indexOf(imageSrc);
    }
    
    Lightbox.open(imageSrc, images, currentIndex);
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    Lightbox.init();
    
    // Add click handlers to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const allImages = Array.from(galleryItems).map(item => 
                    item.querySelector('img').src
                );
                openLightbox(img.src, allImages, index);
            }
        });
    });
});

// Export for global use
window.openLightbox = openLightbox;
window.Lightbox = Lightbox;
