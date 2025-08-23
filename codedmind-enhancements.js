// codedmind-enhancements.js
// JavaScript enhancements for https://codedmind.netlify.app/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhancements
    initSmoothScrolling();
    initNavbarEffects();
    initProjectCards();
    initSkillAnimations();
    initContactForm();
    initThemeHelpers();
    initScrollAnimations();
    initMobileMenu();
    initTypewriterEffect();
    initBackToTopButton();
    initPageLoader();
});

// 1. Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// 2. Navbar effects
function initNavbarEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        // Hide/show navbar on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        // Add shadow when scrolled
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = window.scrollY;
    });
}

// 3. Interactive project cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effect with slight scale and shadow
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(110, 69, 226, 0.15)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click effect for project details
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) { // Only if not clicking a link
                this.classList.toggle('active');
                
                // Toggle project description expansion
                const description = this.querySelector('.project-description');
                if (description) {
                    description.style.maxHeight = description.style.maxHeight ? 
                        null : description.scrollHeight + 'px';
                }
            }
        });
    });
}

// 4. Animated skill bars
function initSkillAnimations() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;
    
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Use Intersection Observer to animate when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-level');
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s ease-in-out';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
}

// 5. Dynamic contact form validation and interaction
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add focus effects
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
    
    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    // Field validation function
    function validateField(field) {
        let isValid = true;
        const errorElement = field.parentElement.querySelector('.error-message') || 
                            document.createElement('div');
        
        if (!errorElement.classList.contains('error-message')) {
            errorElement.className = 'error-message';
            field.parentElement.appendChild(errorElement);
        }
        
        // Clear previous error
        errorElement.textContent = '';
        field.parentElement.classList.remove('error');
        
        // Validate based on field type
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorElement.textContent = 'This field is required';
            field.parentElement.classList.add('error');
            isValid = false;
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorElement.textContent = 'Please enter a valid email address';
                field.parentElement.classList.add('error');
                isValid = false;
            }
        }
        
        return isValid;
    }
}

// 6. Theme consistency helpers
function initThemeHelpers() {
    // Detect system preference for dark/light mode
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply theme based on preference if no explicit theme is set
    if (!localStorage.getItem('theme')) {
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
    
    // Add theme toggle functionality if needed
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
    });
    
    // Add toggle to page if desired
    // document.body.appendChild(themeToggle);
}

// 7. Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 8. Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 9. Typewriter effect for hero text (optional)
function initTypewriterEffect() {
    const heroText = document.querySelector('.hero-text');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.unobserve(entries[0].target);
        }
    });
    
    observer.observe(heroText);
}

// 10. Back to top button
function initBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 11. Page loader animation
function initPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
    `;
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    });
}

// 12. Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance
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

// Add CSS for enhancements
const style = document.createElement('style');
style.textContent = `
    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }
    
    /* Project card animations */
    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Skill bar animations */
    .skill-progress {
        transition: width 1.5s ease-in-out;
    }
    
    /* Form enhancements */
    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }
    
    .error-message {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 0.3rem;
        display: block;
    }
    
    .form-group.error input,
    .form-group.error textarea {
        border-color: #ff4757;
    }
    
    /* Notification system */
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background: #2ed573;
    }
    
    .notification.error {
        background: #ff4757;
    }
    
    .notification.info {
        background: #3742fa;
    }
    
    /* Back to top button */
    #back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #6e45e2, #88d3ce);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 999;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(110, 69, 226, 0.3);
    }
    
    #back-to-top.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Page loader */
    #page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a1a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(136, 211, 206, 0.2);
        border-radius: 50%;
        border-top: 5px solid #6e45e2;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Scroll animations */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .slide-in {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .slide-in.animate {
        opacity: 1;
        transform: translateX(0);
    }
    
    .zoom-in {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .zoom-in.animate {
        opacity: 1;
        transform: scale(1);
    }
    
    /* Mobile menu animation */
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    /* Theme toggle button */
    #theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(136, 211, 206, 0.1);
        border: none;
        cursor: pointer;
        z-index: 1000;
        font-size: 1.2rem;
        backdrop-filter: blur(5px);
    }
`;
document.head.appendChild(style);