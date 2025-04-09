/**
 * watermark.js - Adds watermark signature to all artwork images
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
        modalWatermark.classList.add('modal-watermark');
        
        // Add specific CSS to ensure consistent positioning across devices
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal-image-wrapper {
                position: relative !important;
            }
            .modal-watermark {
                position: absolute !important;
                /* MOBILE POSITIONING - ADJUST THESE VALUES */
                bottom: 10% !important; /* Change this value to move up/down */
                right: 10% !important;   /* Changed from left to right for better positioning */
                width: ${watermarkSize} !important;
                height: auto !important;
                opacity: 0.8 !important;
                z-index: 2000 !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Function to add watermark to modal
        function addWatermarkToModal() {
            const modalImage = document.getElementById('modalImage');
            if (modalImage) {
                // Find the modal display container
                const modalContainer = modalImage.closest('.modal-display');
                if (!modalContainer) return;
                
                // Ensure we have a container with relative positioning
                modalContainer.style.position = 'relative';
                
                // Remove any existing watermarks
                const existingWatermarks = document.querySelectorAll('.modal-watermark');
                existingWatermarks.forEach(w => w.remove());
                
                // Add watermark
                const watermarkClone = modalWatermark.cloneNode(true);
                modalContainer.appendChild(watermarkClone);
            }
        }
        
        // Add the watermark whenever the modal is opened
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
            container.addEventListener('click', () => {
                // Wait for modal to appear
                setTimeout(addWatermarkToModal, 150);
            });
        });
        
        // Add watermark when using navigation buttons in modal
        document.addEventListener('click', function(e) {
            if (e.target.closest('.modal-nav')) {
                setTimeout(addWatermarkToModal, 150);
            }
        });
        
        // Additionally, observe for changes to the modal content
        const modalImageObserver = new MutationObserver(function(mutations) {
            addWatermarkToModal();
        });
        
        // Start observation when modal opens
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                // Don't close when clicking on the modal content
                if (e.target.closest('.modal-content') && !e.target.closest('.close')) {
                    e.stopPropagation();
                }
            });
            
            // Start observing the modal image when it opens
            document.querySelectorAll('.image-container').forEach(container => {
                container.addEventListener('click', function() {
                    setTimeout(() => {
                        const modalImage = document.getElementById('modalImage');
                        if (modalImage) {
                            modalImageObserver.observe(modalImage, { attributes: true });
                        }
                    }, 150);
                });
            });
        }
    }
});
