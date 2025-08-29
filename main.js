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
        
        
                
