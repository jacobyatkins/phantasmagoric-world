// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Right-clicking is disabled to protect the artwork.');
});

// Disable dragging images
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        alert('Image dragging is disabled to protect the artwork.');
    }
});

// Prevent keyboard shortcuts for saving/printing
document.addEventListener('keydown', function(e) {
    // Ctrl+S, Ctrl+P, PrintScreen, Ctrl+Shift+I (dev tools)
    if ((e.ctrlKey && (e.key === 's' || e.key === 'p')) || 
        e.key === 'PrintScreen' || 
        (e.ctrlKey && e.shiftKey && e.key === 'i')) {
        e.preventDefault();
        alert('This action is disabled to protect the artwork.');
    }
});

// Make images non-selectable and prevent copy
document.querySelectorAll('img').forEach(function(img) {
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    img.style.mozUserSelect = 'none';
    img.style.msUserSelect = 'none';
});

// Add transparent overlay to further prevent capture
document.querySelectorAll('.protected-image-container').forEach(function(container) {
    const overlay = document.createElement('div');
    overlay.className = 'image-protection-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '1';
    overlay.style.cursor = 'default';
    container.style.position = 'relative';
    container.appendChild(overlay);
});
