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

// Course data array
const courses = [
    {
        title: "DIT (Diploma in Information Technology)",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        description: "Learn the fundamentals of IT.",
        details: "course-dit.html"
    },
    {
        title: "CIT (Certificate in Information Technology)",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        description: "Basic IT skills for beginners.",
        details: "course-cit.html"
    },
    {
        title: "English Language",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
        description: "Improve your English communication.",
        details: "course-english.html"
    },
    {
        title: "Web Development",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        description: "Build modern websites and web apps.",
        details: "course-webdev.html"
    },
    {
        title: "YouTube Automation",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        description: "Automate and grow your YouTube channel.",
        details: "course-youtube.html"
    },
    {
        title: "Amazon FBA",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        description: "Start selling on Amazon with FBA.",
        details: "course-amazon-fba.html"
    },
    {
        title: "Amazon E-Commerce",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        description: "Master e-commerce on Amazon.",
        details: "course-amazon-ecommerce.html"
    },
    {
        title: "Graphic Design",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
        description: "Design stunning graphics.",
        details: "course-graphic-design.html"
    },
    {
        title: "SEO",
        image: "https://images.unsplash.com/photo-1465101178521-c1a2b3a8e8a2?auto=format&fit=crop&w=400&q=80",
        description: "Optimize websites for search engines.",
        details: "course-seo.html"
    },
    {
        title: "Digital Marketing",
        image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80",
        description: "Promote brands online.",
        details: "course-digital-marketing.html"
    },
    {
        title: "Data Science",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        description: "Analyze and visualize data.",
        details: "course-data-science.html"
    },
    {
        title: "Python Programming",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        description: "Learn Python from scratch.",
        details: "course-python.html"
    },
    {
        title: "Networking",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        description: "Understand computer networks.",
        details: "course-networking.html"
    },
    {
        title: "Cyber Security",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        description: "Protect systems and data.",
        details: "course-cyber-security.html"
    },
    {
        title: "Mobile App Development",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        description: "Create mobile applications.",
        details: "course-mobile-app.html"
    },
    {
        title: "WordPress",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
        description: "Build sites with WordPress.",
        details: "course-wordpress.html"
    },
    {
        title: "Video Editing",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        description: "Edit professional videos.",
        details: "course-video-editing.html"
    },
    {
        title: "MS Office",
        image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80",
        description: "Master Microsoft Office tools.",
        details: "course-ms-office.html"
    },
    {
        title: "Cloud Computing",
        image: "https://images.unsplash.com/photo-1465101178521-c1a2b3a8e8a2?auto=format&fit=crop&w=400&q=80",
        description: "Learn cloud technologies.",
        details: "course-cloud-computing.html"
    },
    {
        title: "AI & Machine Learning",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
        description: "Explore artificial intelligence.",
        details: "course-ai-ml.html"
    }
];

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