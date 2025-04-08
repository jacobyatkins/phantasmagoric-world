/**
 * art-protection.js - Adds watermark signature to all artwork images
 * Created for Phantasmagoric World by Jacob Degen Atkins
 * Enhanced for mobile responsiveness
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const watermarkURL = 'https://i.imgur.com/tFI4Agz.png';
    const watermarkSize = '150px';
    
    // Apply watermarks to gallery images
    applyWatermarksToGallery();
    
    // Set up modal image observer
    setupModalWatermark();
    
    /**
     * Applies watermarks to gallery images
     */
    function applyWatermarksToGallery() {
        const galleryImages = document.querySelectorAll('.gallery .image-container img');
        
        galleryImages.forEach(img => {
            const container = img.closest('.image-container');
            
            // Create a relative container for positioning
            container.style.position = 'relative';
            
            // Add watermark to the container
            const watermark = document.createElement('img');
            watermark.src = watermarkURL;
            watermark.alt = 'JDA Signature';
            watermark.style.cssText = `
                position: absolute;
                bottom: 30px;
                right: 5px;
                width: ${watermarkSize};
                height: auto;
                opacity: 0.75;
                z-index: 5;
                pointer-events: none;
            `;
            
            container.appendChild(watermark);
        });
    }
    
    /**
     * Sets up a watermark for the modal image
     */
    function setupModalWatermark() {
        // Create a consistent watermark for modal views
        const modalWatermark = document.createElement('img');
        modalWatermark.src = watermarkURL;
        modalWatermark.alt = 'JDA Signature';
        
        // Add specific CSS to ensure consistent positioning across devices
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal-image-wrapper {
                position: relative !important;
            }
            .modal-watermark {
              position: absolute !important;
                /* MOBILE POSITIONING - ADJUST THESE VALUES */
                bottom: 20% !important; /* Change this value to move up/down */
                left: 35% !important;   /* Change this value to move left/right */
                transform: translate(-50%, -50%) !important;
                width: ${watermarkSize} !important;
                height: auto !important;
                opacity: 0.8 !important;
                z-index: 2000 !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Add the watermark whenever the modal is opened
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
            container.addEventListener('click', () => {
                setTimeout(() => {
                    const modalImage = document.querySelector('#modalImage');
                    if (modalImage) {
                        const modalContainer = modalImage.parentElement;
                        if (!modalContainer) return;
                        
                        // Ensure we have a container with relative positioning
                        modalContainer.style.position = 'relative';
                        
                        // Remove any existing watermarks
                        const existingWatermarks = document.querySelectorAll('.modal-watermark');
                        existingWatermarks.forEach(w => w.remove());
                        
                        // Add watermark using the same positioning as desktop
                        const watermarkClone = modalWatermark.cloneNode(true);
                        watermarkClone.classList.add('modal-watermark');
                        modalContainer.appendChild(watermarkClone);
                    }
                }, 150);
            });
        });
        
        // Same for navigation buttons
        const navButtons = document.querySelectorAll('.modal-nav');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(() => {
                    const modalImage = document.querySelector('#modalImage');
                    if (modalImage) {
                        const modalContainer = modalImage.parentElement;
                        if (!modalContainer) return;
                        
                        // Ensure we have a container with relative positioning
                        modalContainer.style.position = 'relative';
                        
                        // Remove any existing watermarks
                        const existingWatermarks = document.querySelectorAll('.modal-watermark');
                        existingWatermarks.forEach(w => w.remove());
                        
                        // Add watermark using the same positioning as desktop
                        const watermarkClone = modalWatermark.cloneNode(true);
                        watermarkClone.classList.add('modal-watermark');
                        modalContainer.appendChild(watermarkClone);
                    }
                }, 150);
            });
        });
    }
});
