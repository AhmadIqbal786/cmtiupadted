// codedmind-enhanced.js
// Enhanced JavaScript for https://codedmind.netlify.app/

// Main application namespace with improved structure
const CodedMind = {
    // Configuration with enhanced defaults
    config: {
        scrollThreshold: 50,
        slideInterval: 5000,
        animationOffset: 20,
        animationThreshold: 0.1,
        resizeDebounce: 250,
        scrollDebounce: 100,
        mobileBreakpoint: 768
    },

    // State management
    state: {
        currentTheme: localStorage.getItem('theme') || 'light',
        menuOpen: false,
        carousels: new Map(),
        observers: new Map(),
        resizeObservers: []
    },

    // Initialize all components
    init: function() {
        this.initTheme();
        this.initStickyHeader();
        this.initMobileMenu();
        this.initCarousels();
        this.initScrollAnimations();
        this.initSmoothScrolling();
        this.initBackToTop();
        this.initCourseFilter();
        this.initDynamicYear();
        this.initLazyLoading();
        this.initFormValidation();
        this.initPerformanceMonitoring();
        
        // Cleanup on page hide
        window.addEventListener('beforeunload', this.cleanup.bind(this));
    },

    // Initialize theme with system preference detection
    initTheme: function() {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        // Set initial theme
        if (savedTheme) {
            this.state.currentTheme = savedTheme;
        } else {
            this.state.currentTheme = systemPrefersDark ? 'dark' : 'light';
        }
        
        document.documentElement.setAttribute('data-theme', this.state.currentTheme);
        
        // Create theme toggle if not exists
        if (!document.getElementById('theme-toggle')) {
            const themeToggle = document.createElement('button');
            themeToggle.id = 'theme-toggle';
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = this.state.currentTheme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
            document.body.appendChild(themeToggle);
            
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                this.state.currentTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', this.state.currentTheme);
                document.getElementById('theme-toggle').innerHTML = this.state.currentTheme === 'dark' ? '☀️' : '🌙';
            }
        });
    },

    // Toggle between dark and light themes
    toggleTheme: function() {
        this.state.currentTheme = this.state.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.state.currentTheme);
        localStorage.setItem('theme', this.state.currentTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = this.state.currentTheme === 'dark' ? '☀️' : '🌙';
        }
        
        // Dispatch event for other components to react to theme changes
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: this.state.currentTheme } }));
    },

    // Sticky header functionality with performance improvements
    initStickyHeader: function() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        const handleScroll = this.debounce(() => {
            if (window.scrollY > this.config.scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, this.config.scrollDebounce);

        window.addEventListener('scroll', handleScroll);
        this.state.resizeObservers.push(() => window.removeEventListener('scroll', handleScroll));
    },

    // Enhanced mobile menu with animations and accessibility
    initMobileMenu: function() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.menu-overlay');
        
        if (!hamburger || !mobileMenu) return;
        
        // Handle hamburger menu
        const toggleMenu = (state) => {
            const isOpen = state !== undefined ? state : !this.state.menuOpen;
            this.state.menuOpen = isOpen;
            
            hamburger.classList.toggle('active', isOpen);
            mobileMenu.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            
            // Dispatch menu state change event
            window.dispatchEvent(new CustomEvent('menuStateChange', { 
                detail: { isOpen: this.state.menuOpen } 
            }));
        };
        
        hamburger.addEventListener('click', () => toggleMenu());
        
        // Close when clicking links
        const mobileLinks = document.querySelectorAll('.mobile-nav a, .mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
        
        // Close when clicking outside or pressing Escape
        document.addEventListener('click', (e) => {
            if (this.state.menuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                toggleMenu(false);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (this.state.menuOpen && e.key === 'Escape') {
                toggleMenu(false);
            }
        });
        
        // Handle menu toggle with overlay
        if (navMenu && overlay) {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            const toggleNavMenu = () => {
                navMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            };
            
            if (menuToggle) menuToggle.addEventListener('click', toggleNavMenu);
            overlay.addEventListener('click', toggleNavMenu);
        }
        
        // Set active navigation link
        this.setActiveNavLink();
        
        // Close menu on resize if window becomes large
        const handleResize = this.debounce(() => {
            if (window.innerWidth > this.config.mobileBreakpoint && this.state.menuOpen) {
                toggleMenu(false);
            }
        }, this.config.resizeDebounce);
        
        window.addEventListener('resize', handleResize);
        this.state.resizeObservers.push(() => window.removeEventListener('resize', handleResize));
    },

    // Set active navigation link based on current page
    setActiveNavLink: function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    // Initialize all carousels on the page with enhanced features
    initCarousels: function() {
        const carousels = document.querySelectorAll('.carousel, .banner-carousel');
        
        carousels.forEach((carousel, index) => {
            // Determine carousel type and initialize accordingly
            if (carousel.classList.contains('banner-carousel')) {
                this.state.carousels.set(`banner-${index}`, this.initBannerCarousel(carousel));
            } else {
                this.state.carousels.set(`standard-${index}`, this.initStandardCarousel(carousel));
            }
        });
    },

    // Standard carousel functionality with enhanced controls
    initStandardCarousel: function(carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevArrow = carousel.querySelector('.carousel-arrow.prev');
        const nextArrow = carousel.querySelector('.carousel-arrow.next');
        
        if (slides.length === 0) return null;
        
        let currentSlide = 0;
        let slideInterval;
        let touchStartX = 0;
        let touchEndX = 0;
        
        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show the selected slide
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            
            currentSlide = index;
            
            // Update ARIA attributes for accessibility
            slides.forEach((slide, i) => {
                slide.setAttribute('aria-hidden', i !== index);
            });
            
            dots.forEach((dot, i) => {
                dot.setAttribute('aria-selected', i === index);
            });
        };
        
        const nextSlide = () => {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };
        
        const prevSlide = () => {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        };
        
        const startSlideshow = () => {
            if (slides.length > 1) {
                slideInterval = setInterval(nextSlide, this.config.slideInterval);
            }
        };
        
        const stopSlideshow = () => {
            clearInterval(slideInterval);
        };
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next slide
                stopSlideshow();
                nextSlide();
                startSlideshow();
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous slide
                stopSlideshow();
                prevSlide();
                startSlideshow();
            }
        };
        
        // Event listeners for controls
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });
        }
        
        // Add click events to dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                let slideIndex = parseInt(dot.getAttribute('data-index'));
                showSlide(slideIndex);
                startSlideshow();
            });
        });
        
        // Touch events for mobile
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopSlideshow();
        }, { passive: true });
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startSlideshow();
        }, { passive: true });
        
        // Pause slideshow when hovering over carousel or when it's not in view
        carousel.addEventListener('mouseenter', stopSlideshow);
        carousel.addEventListener('mouseleave', startSlideshow);
        
        // Use Intersection Observer to pause when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startSlideshow();
                } else {
                    stopSlideshow();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(carousel);
        
        // Initialize the slideshow
        startSlideshow();
        showSlide(currentSlide);
        
        // Return API for external control
        return {
            next: nextSlide,
            prev: prevSlide,
            goTo: showSlide,
            pause: stopSlideshow,
            play: startSlideshow,
            current: () => currentSlide
        };
    },

    // Banner carousel functionality with enhanced features
    initBannerCarousel: function(carousel) {
        const slides = carousel.querySelectorAll('.banner-slide');
        const dots = carousel.querySelectorAll('.banner-dot, .indicator');
        const prevBtn = carousel.querySelector('.banner-prev, .carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.banner-next, .carousel-arrow.next');
        
        if (slides.length === 0) return null;
        
        let currentSlide = 0;
        let slideInterval;
        let touchStartX = 0;
        let touchEndX = 0;
        
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                slide.setAttribute('aria-hidden', i !== index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
                dot.setAttribute('aria-selected', i === index);
            });
            
            currentSlide = index;
        };
        
        const nextSlide = () => {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };
        
        const prevSlide = () => {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        };
        
        const startSlideshow = () => {
            if (slides.length > 1) {
                slideInterval = setInterval(nextSlide, this.config.slideInterval);
            }
        };
        
        const stopSlideshow = () => {
            clearInterval(slideInterval);
        };
        
        const resetInterval = () => {
            stopSlideshow();
            startSlideshow();
        };
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next slide
                nextSlide();
                resetInterval();
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous slide
                prevSlide();
                resetInterval();
            }
        };
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
        
        // Add click events to dots/indicators
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });
        
        // Touch events for mobile
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopSlideshow();
        }, { passive: true });
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startSlideshow();
        }, { passive: true });
        
        // Pause on hover and when not in view
        carousel.addEventListener('mouseenter', stopSlideshow);
        carousel.addEventListener('mouseleave', startSlideshow);
        
        // Use Intersection Observer to pause when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startSlideshow();
                } else {
                    stopSlideshow();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(carousel);
        
        // Initialize
        startSlideshow();
        showSlide(currentSlide);
        
        // Return API for external control
        return {
            next: nextSlide,
            prev: prevSlide,
            goTo: showSlide,
            pause: stopSlideshow,
            play: startSlideshow,
            current: () => currentSlide
        };
    },

    // Initialize scroll animations for elements with performance improvements
    initScrollAnimations: function() {
        const animatedElements = document.querySelectorAll('.card, .crystal-card, .animate-on-scroll');
        
        if (animatedElements.length === 0) return;
        
        // Add initial state for animation
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = `translateY(${this.config.animationOffset}px)`;
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Intersection Observer to animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: this.config.animationThreshold });
        
        // Observe all elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        // Store observer for cleanup
        this.state.observers.set('scrollAnimation', observer);
    },

    // Smooth scrolling for anchor links with offset for fixed header
    initSmoothScrolling: function() {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const offset = headerHeight + 20; // Additional offset
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, targetId);
                }
            });
        });
    },

    // Back to top button functionality with improved visibility logic
    initBackToTop: function() {
        let backToTopBtn = document.getElementById('backToTop');
        
        // Create button if it doesn't exist
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('button');
            backToTopBtn.id = 'backToTop';
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.setAttribute('aria-label', 'Back to top');
            document.body.appendChild(backToTopBtn);
        }
        
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };
        
        const scrollHandler = this.debounce(toggleVisibility, this.config.scrollDebounce);
        
        window.addEventListener('scroll', scrollHandler);
        this.state.resizeObservers.push(() => window.removeEventListener('scroll', scrollHandler));
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    // Enhanced course search and filter functionality
    initCourseFilter: function() {
        const searchInput = document.getElementById('course-search');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const courseCards = document.querySelectorAll('.course-card');
        const noResults = document.getElementById('no-results-message');
        
        if (!searchInput || categoryButtons.length === 0 || courseCards.length === 0) return;
        
        // Create no results message if it doesn't exist
        if (!noResults) {
            const noResultsElement = document.createElement('div');
            noResultsElement.id = 'no-results-message';
            noResultsElement.className = 'no-results';
            noResultsElement.innerHTML = '<p>No courses match your search criteria. Try different keywords or categories.</p>';
            noResultsElement.style.display = 'none';
            
            const container = document.querySelector('.courses-grid') || document.querySelector('.courses-container');
            if (container) {
                container.parentNode.insertBefore(noResultsElement, container.nextSibling);
            }
        }
        
        const filterCourses = () => {
            const searchText = searchInput.value.toLowerCase().trim();
            const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
            let visibleCount = 0;
            
            courseCards.forEach(card => {
                const title = card.querySelector('h2, h3, h4')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                const categories = card.dataset.categories || '';
                const keywords = card.dataset.keywords || '';
                
                const matchesSearch = searchText === '' || 
                                    title.includes(searchText) || 
                                    description.includes(searchText) ||
                                    keywords.includes(searchText);
                
                const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
                
                if (matchesSearch && matchesCategory) {
                    card.style.display = 'block';
                    visibleCount++;
                    
                    // Highlight search terms
                    if (searchText) {
                        this.highlightText(card, searchText);
                    } else {
                        this.removeHighlights(card);
                    }
                } else {
                    card.style.display = 'none';
                    this.removeHighlights(card);
                }
            });
            
            // Show/hide no results message
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
            
            // Dispatch event for other components to react to filtering
            window.dispatchEvent(new CustomEvent('coursesFiltered', { 
                detail: { visibleCount, totalCount: courseCards.length } 
            }));
        };
        
        searchInput.addEventListener('input', this.debounce(filterCourses, 300));
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterCourses();
            });
        });
        
        // Initial filter to ensure consistency
        filterCourses();
    },

    // Highlight text within an element
    highlightText: function(element, text) {
        const regex = new RegExp(`(${text})`, 'gi');
        const elements = element.querySelectorAll('h2, h3, h4, p');
        
        elements.forEach(el => {
            if (el.textContent.match(regex)) {
                el.innerHTML = el.innerHTML.replace(regex, '<mark>$1</mark>');
            }
        });
    },

    // Remove highlights from an element
    removeHighlights: function(element) {
        const marks = element.querySelectorAll('mark');
        marks.forEach(mark => {
            mark.outerHTML = mark.innerHTML;
        });
    },

    // Initialize dynamic year in footer
    initDynamicYear: function() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    },

    // Initialize lazy loading for images
    initLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
            
            this.state.observers.set('lazyLoad', imageObserver);
        }
    },

    // Initialize form validation
    initFormValidation: function() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
            
            form.addEventListener('submit', (e) => {
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    this.showToast('Please correct the errors in the form.', 5000);
                    
                    // Focus on first error
                    const firstError = form.querySelector('.error');
                    if (firstError) firstError.focus();
                }
            });
        });
    },

    // Validate a single form field
    validateField: function(field) {
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Check required field
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = field.dataset.requiredError || 'This field is required';
        }
        // Check email format
        else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = field.dataset.emailError || 'Please enter a valid email address';
            }
        }
        // Check minimum length
        else if (field.dataset.minLength && field.value.length < parseInt(field.dataset.minLength)) {
            isValid = false;
            errorMessage = field.dataset.minLengthError || `Please enter at least ${field.dataset.minLength} characters`;
        }
        
        // Show error if validation failed
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    },

    // Show error for a field
    showFieldError: function(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    },

    // Clear error for a field
    clearFieldError: function(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    },

    // Initialize performance monitoring
    initPerformanceMonitoring: function() {
        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 100) {
                        console.warn(`Long task detected: ${entry.duration}ms`);
                    }
                }
            });
            
            observer.observe({ entryTypes: ['longtask'] });
        }
        
        // Report CLS (Cumulative Layout Shift)
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            let clsEntries = [];
            
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsEntries.push(entry);
                        clsValue += entry.value;
                    }
                }
            });
            
            observer.observe({ type: 'layout-shift', buffered: true });
            
            // Report CLS to console (could be sent to analytics in production)
            window.addEventListener('beforeunload', () => {
                if (clsValue > 0.1) {
                    console.warn(`CLS: ${clsValue}`, clsEntries);
                }
            });
        }
    },

    // Toast notification function
    showToast: function(message, duration = 3000) {
        let toast = document.getElementById('toast');
        
        // Create toast if it doesn't exist
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.classList.add('show');
        
        // Remove previous timeouts
        if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
        }
        
        toast.timeoutId = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    // Show loader function
    showLoader: function() {
        let loader = document.getElementById('loader');
        
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'loader';
            loader.className = 'loader';
            loader.innerHTML = '<div class="loader-spinner"></div>';
            document.body.appendChild(loader);
        }
        
        loader.style.display = 'block';
    },

    // Hide loader function
    hideLoader: function() {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    },

    // Debounce function with immediate option
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                if (!immediate) func(...args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func(...args);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Cleanup function to remove event listeners and observers
    cleanup: function() {
        // Clear all intervals
        this.state.carousels.forEach(carousel => {
            if (carousel.pause) carousel.pause();
        });
        
        // Disconnect all observers
        this.state.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Remove resize event listeners
        this.state.resizeObservers.forEach(cleanupFunc => {
            if (typeof cleanupFunc === 'function') cleanupFunc();
        });
        
        // Clear state
        this.state.carousels.clear();
        this.state.observers.clear();
        this.state.resizeObservers = [];
    }
};

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CodedMind.init());
} else {
    CodedMind.init();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodedMind;
}