// Image optimization script

document.addEventListener('DOMContentLoaded', function() {
    // Add explicit width and height attributes to all images
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        // Only add if they don't already exist
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            // These values should match your actual image dimensions
            // You'll need to adjust these based on your actual image sizes
            img.setAttribute('width', '400');
            img.setAttribute('height', '560');
        }
    });

    // Implement intersection observer for true lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Set the src attribute only when the image is about to come into view
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    
                    // Once the image is loaded, add the 'loaded' class for fade-in effect
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                }
                
                // Stop observing the image after it's loaded
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px 0px', // Start loading images when they're 200px from viewport
        threshold: 0.01
    });

    // Observe all images that should be lazy loaded
    galleryImages.forEach(img => {
        // Save original src to data-src and set a placeholder
        const originalSrc = img.src;
        img.dataset.src = originalSrc;
        
        // Use a tiny placeholder instead (or remove src completely)
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        
        imageObserver.observe(img);
    });

    // Priority loading for above-the-fold images (first 5 images)
    const priorityImages = Array.from(galleryImages).slice(0, 5);
    priorityImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('priority-image');
            imageObserver.unobserve(img);
        }
    });
    
    // Add a fix for image modal loading
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.addEventListener('load', function() {
            // When modal image loads, add a class for CSS transitions
            this.classList.add('loaded');
        });
    }
});

// Function to preload modal image when user hovers over thumbnail
function preloadModalImage(artworkId) {
    const artwork = artworkData[artworkId];
    if (artwork && artwork.image) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = artwork.image;
        document.head.appendChild(preloadLink);
    }
}

// Add hover event to thumbnails for preloading
document.querySelectorAll('.image-container').forEach(container => {
    const artworkId = container.getAttribute('onclick').match(/'([^']+)'/)[1];
    container.addEventListener('mouseenter', () => preloadModalImage(artworkId));
});
