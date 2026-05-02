// Error handling script
window.addEventListener('error', function(event) {
    console.error('Error:', event.message);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled rejection:', event.reason);
});

// Graceful image loading failures
document.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        // Image failed to load - browser already applied onerror handler
        console.warn('Image failed to load:', event.target.src);
    }
}, true);
