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

    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
        
        // Update active link based on current page
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Carousel functionality
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const prevArrow = document.querySelector('.carousel-arrow.prev');
        const nextArrow = document.querySelector('.carousel-arrow.next');
        
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show the selected slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Function to go to next slide
        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Function to go to previous slide
        function prevSlide() {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }
        
        // Start automatic slideshow
        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        // Stop automatic slideshow
        function stopSlideshow() {
            clearInterval(slideInterval);
        }
        
        // Event listeners for controls
        prevArrow.addEventListener('click', function() {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });
        
        nextArrow.addEventListener('click', function() {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });
        
        // Add click events to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                stopSlideshow();
                let slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
                startSlideshow();
            });
        });
        
        // Pause slideshow when hovering over carousel
        const carousel = document.querySelector('.banner-carousel');
        carousel.addEventListener('mouseenter', stopSlideshow);
        carousel.addEventListener('mouseleave', startSlideshow);
        
        // Initialize the slideshow
        startSlideshow();
    });
