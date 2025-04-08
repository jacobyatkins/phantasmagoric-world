/**
 * art-protection.js - Adds watermark signature to all artwork images
 * Created for Phantasmagoric World by Jacob Degen Atkins
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
        // Create a watermark element for the modal
        const modalWatermark = document.createElement('img');
        modalWatermark.src = watermarkURL;
        modalWatermark.alt = 'JDA Signature';
        modalWatermark.style.cssText = `
            position: absolute;
            top: 87.5%;
            left: 45%;
            transform: translate(-50%, -50%);
            width: ${watermarkSize};
            height: auto;
            opacity: 0.8;
            z-index: 2000;
            pointer-events: none;
        `;
        
        // Add the watermark whenever the modal is opened
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
            container.addEventListener('click', () => {
                setTimeout(() => {
                    const modalImage = document.querySelector('#modalImage');
                    if (modalImage) {
                        const modalImageContainer = modalImage.parentElement;
                        
                        // Position the container relatively for absolute positioning of watermark
                        if (modalImageContainer && modalImageContainer.style) {
                            modalImageContainer.style.position = 'relative';
                            
                            // Add watermark to the modal image container
                            const watermarkClone = modalWatermark.cloneNode(true);
                            
                            // Remove any existing watermarks first
                            const existingWatermarks = modalImageContainer.querySelectorAll('.modal-watermark');
                            existingWatermarks.forEach(w => w.remove());
                            
                            // Add class for potential CSS targeting
                            watermarkClone.classList.add('modal-watermark');
                            
                            modalImageContainer.appendChild(watermarkClone);
                        }
                    }
                }, 100);
            });
        });
        
        // Also add the watermark when navigating through modal images
        const navButtons = document.querySelectorAll('.modal-nav');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(() => {
                    const modalImage = document.querySelector('#modalImage');
                    if (modalImage) {
                        const modalImageContainer = modalImage.parentElement;
                        
                        // Position the container relatively for absolute positioning of watermark
                        if (modalImageContainer && modalImageContainer.style) {
                            modalImageContainer.style.position = 'relative';
                            
                            // Add watermark to the modal image container
                            const watermarkClone = modalWatermark.cloneNode(true);
                            
                            // Remove any existing watermarks first
                            const existingWatermarks = modalImageContainer.querySelectorAll('.modal-watermark');
                            existingWatermarks.forEach(w => w.remove());
                            
                            // Add class for potential CSS targeting
                            watermarkClone.classList.add('modal-watermark');
                            
                            modalImageContainer.appendChild(watermarkClone);
                        }
                    }
                }, 100);
            });
        });
    }
});