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
