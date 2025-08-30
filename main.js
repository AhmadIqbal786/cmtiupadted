// Sticky header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile navigation toggle (if you add a mobile menu button)
document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.header-content nav');
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
});
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

        // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            const overlay = document.querySelector('.menu-overlay');
            
            function toggleMenu() {
                navMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            }
            
            menuToggle.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);
        });
    
        // Banner Slider Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const bannerSlides = document.querySelectorAll('.banner-slide');
            const bannerDots = document.querySelectorAll('.banner-dot');
            let currentSlide = 0;
            
            function showSlide(index) {
                bannerSlides.forEach(slide => slide.classList.remove('active'));
                bannerDots.forEach(dot => dot.classList.remove('active'));
                
                bannerSlides[index].classList.add('active');
                bannerDots[index].classList.add('active');
                currentSlide = index;
            }
            
            function nextSlide() {
                let next = currentSlide + 1;
                if (next >= bannerSlides.length) next = 0;
                showSlide(next);
            }
            
            // Auto advance slides
            setInterval(nextSlide, 5000);

            
            // Add click events to dots
            bannerDots.forEach((dot, index) => {
                dot.addEventListener('click', () => showSlide(index));
            });
            
            // Animate elements on scroll
            const cards = document.querySelectorAll('.card, .crystal-card');
            
            // Add initial state for animation
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Intersection Observer to animate elements when they come into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe all cards
            cards.forEach(card => {
                observer.observe(card);
            });
            
            // Header scroll effect
            const header = document.querySelector('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                } else {
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                }
            });
            
            // Moving courses animation
            const courseTrack = document.querySelector('.course-track');
            const courseCards = document.querySelectorAll('.course-card');
            const courseTrackWidth = courseCards.length * 330; // width of all cards including margins
            
            courseTrack.style.width = courseTrackWidth + 'px';
            
            // Clone course cards for seamless animation
            courseCards.forEach(card => {
                const clone = card.cloneNode(true);
                courseTrack.appendChild(clone);
            });
        });
  
 const slides = document.querySelectorAll('.banner-slide');
        const prevBtn = document.querySelector('.banner-prev');
        const nextBtn = document.querySelector('.banner-next');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 5000);

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                indicators[i].classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });
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

initMobileMenu();
// Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            const overlay = document.querySelector('.menu-overlay');
            
            function toggleMenu() {
                navMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            }
            
            menuToggle.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);
        });
         // Carousel functionality
        document.addEventListener('DOMContentLoaded', function() {
            let currentSlide = 0;
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.carousel-dot');
            const totalSlides = slides.length;
            
            // Initialize carousel
            function initCarousel() {
                slides.forEach((slide, index) => {
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                });
                
                slides[currentSlide].style.opacity = '1';
                slides[currentSlide].style.zIndex = '5';
                
                dots.forEach((dot, index) => {
                    dot.classList.remove('active');
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    }
                });
            }
            
            // Next slide function
            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                initCarousel();
            }
            
            // Previous slide function
            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                initCarousel();
            }
            
            // Set up event listeners
            document.querySelector('.carousel-arrow.next').addEventListener('click', nextSlide);
            document.querySelector('.carousel-arrow.prev').addEventListener('click', prevSlide);
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    initCarousel();
                });
            });
            
            // Auto advance slides
            setInterval(nextSlide, 5000);
            
            // Initialize carousel
            initCarousel();
            
            // Back to top button
            const backToTopBtn = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            hamburger.addEventListener('click', () => {
                mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
            });
            
            // Course search and filter functionality
            const searchInput = document.getElementById('course-search');
            const categoryButtons = document.querySelectorAll('.category-btn');
            const courseCards = document.querySelectorAll('.course-card');
            
            searchInput.addEventListener('input', filterCourses);
            
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    filterCourses();
                });
            });
            
            function filterCourses() {
                const searchText = searchInput.value.toLowerCase();
                const activeCategory = document.querySelector('.category-btn.active').dataset.category;
                
                courseCards.forEach(card => {
                    const title = card.querySelector('h2').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    const categories = card.dataset.categories;
                    
                    const matchesSearch = title.includes(searchText) || description.includes(searchText);
                    const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
                    
                    if (matchesSearch && matchesCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            // Toast notification function
            window.showToast = function(message, duration = 3000) {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, duration);
            };
            
            // Show loader function
            window.showLoader = function() {
                document.getElementById('loader').style.display = 'block';
            };
            
            // Hide loader function
            window.hideLoader = function() {
                document.getElementById('loader').style.display = 'none';
            };
        });

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Course card details toggle (for flip or modal details, if implemented)
document.querySelectorAll('.flip-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = btn.closest('.course-card');
        if (card) {
            card.classList.toggle('flipped');
        }
    });
});

// Render course cards
function renderCourseCards() {
    const container = document.getElementById('courses-container');
    if (!container) return;
    container.innerHTML = '';
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <div class="course-card-content">
                <h2>${course.title}</h2>
                <p>${course.description}</p>
                <a href="${course.details}" class="details-btn">Course Details</a>
                <a href="#" class="enroll-btn">Enroll Now</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Call render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    renderCourseCards();
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.header-content nav');
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
});

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

        // Simple animation for elements when they come into view
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.card');
            
            // Add initial state for animation
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            });
            
            // Intersection Observer to animate elements when they come into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe all cards
            cards.forEach(card => {
                observer.observe(card);

            });
            
            // Header scroll effect
            const header = document.querySelector('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                } else {
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
                    header.style.background = 'white';
                }
            });
        });

    // Simple auto-slider for the hero banners
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.banner-banner-container');
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % container.children.length;
    container.style.transform = `translateX(-${idx * 100}%)`;
  }, 5000); // 5-second interval
});
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition();
        }   
        function updateSlidePosition() {
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
            });
        }
        
        
                
