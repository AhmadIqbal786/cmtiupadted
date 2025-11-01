// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Dropdown menu functionality
function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('mouseenter', () => {
                menu.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                menu.style.display = 'none';
            });
        }
    });
}

// Error handling
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Page Error:', e.message);
        // You can implement user-friendly error messages here
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initDropdownMenu();
    handleErrors();
});
