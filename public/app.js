// Portfolio Data and Configuration
const portfolioData = {
    name: "SIMI",
    title: "APP DEVELOPER",
    email: "coming soon",
    location: "Bed, probably",
    github: '<a href="https://github.com/slammers001" target="_blank" rel="noopener">slammers001</a>',
    
    about: "I'm a passionate developer who creates digital experiences with a focus on clean code, innovative design, and user-centric solutions. My work blends technical precision with creative expression.",
    
    skills: ["Python", "JavaScript", "Rust", "Go", "TypeScript", "C", "Nim", "PowerShell", "Dart", "React", "Node.js", "CSS3", "Supabase", "Electron", "Figma", "Git"],
    
    projects: [
        {
            id: 1,
            title: "STICKEE",
            description: "A modern desktop application for managing and organizing your digital sticky notes and tasks in an easy and fun way.",
            tags: ["JavaScript", "TypeScript", "HTML/CSS", "Electron", "React"],
            liveUrl: "stickee-demo.mp4",
            codeUrl: "https://github.com/slammers001/stickee",
            color: "#FF6B6B"
        },
        {
            id: 2,
            title: "PORTFOLIO GENERATOR",
            description: "Portfolio-Generator automatically generates your unique portfolio based on the information you input. Although it only uses 11 files (2 being the README and LICENSE), it's amazing.",
            tags: ["TypeScript", "JavaScript"],
            liveUrl: "portfolio-gen.mp4",
            codeUrl: "https://github.com/slammers001/portfolio-generator",
            color: "#4ECDC4"
        },
        {
            id: 3,
            title: "AI ART GENERATOR",
            description: "Web application that generates unique digital art using machine learning models with customizable parameters.",
            tags: ["Python", "TensorFlow.js", "FastAPI", "WebGL"],
            liveUrl: "#",
            codeUrl: "#",
            color: "#FFD166"
        },
        {
            id: 4,
            title: "ECOMMERCE PLATFORM",
            description: "Full-featured e-commerce platform with cart system, payment processing, and admin dashboard.",
            tags: ["Next.js", "MongoDB", "Stripe", "Redux"],
            liveUrl: "#",
            codeUrl: "#",
            color: "#95E06C"
        },
        {
            id: 5,
            title: "WEATHER APP",
            description: "Minimalist weather application with animated forecasts, location tracking, and severe weather alerts.",
            tags: ["JavaScript", "OpenWeather API", "CSS Animations", "PWA"],
            liveUrl: "#",
            codeUrl: "#",
            color: "#9B5DE5"
        },
        {
            id: 6,
            title: "TASK MANAGEMENT TOOL",
            description: "Collaborative task management application with real-time updates, team permissions, and productivity analytics.",
            tags: ["React", "Socket.io", "PostgreSQL", "JWT"],
            liveUrl: "#",
            codeUrl: "#",
            color: "#00BBF9"
        }
    ],
    
    socialLinks: {
        github: "#",

    }
};

// Make portfolioData available globally
window.portfolioData = portfolioData;

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const contactForm = document.getElementById('contactForm');

// Initialize Portfolio
function initPortfolio() {
    renderProjects();
    updatePersonalInfo();
    setupEventListeners();
    setupSmoothScrolling();
}

// Render Projects
function renderProjects() {
    projectsGrid.innerHTML = '';
    
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const projectImageContent = project.id === 1 
            ? `<img src="stickee.png" alt="${project.title} Preview" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 2 
            ? `<img src="p-gen.png" alt="${project.title} Preview" style="width: 100%; height: 100%; object-fit: cover;">`
            : '';

        const projectImageClass = project.id === 1 ? 'project-image-no-border' : 'project-image';
        
        projectCard.innerHTML = `
            <div class="${projectImageClass}" style="background-color: ${project.color}">
                ${projectImageContent}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" ${project.liveUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>DEMO</a>
                    <a href="${project.codeUrl}" class="project-link" ${project.codeUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>VIEW CODE</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Update Personal Info
function updatePersonalInfo() {
    document.querySelector('.name').textContent = portfolioData.name;
    document.querySelector('.hero-subtitle').innerHTML = portfolioData.title.replace('&', '<br>');
    
    // Update contact info
    const contactItems = document.querySelectorAll('.contact-text p');
    if (contactItems.length >= 3) {
        contactItems[0].textContent = portfolioData.email;
        contactItems[1].innerHTML = portfolioData.github;
        contactItems[2].textContent = portfolioData.location;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Navigation Active State
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Toggle Theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update button icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-palette';
    
    // Save preference to localStorage
    localStorage.setItem('portfolio-theme', newTheme);
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
    
    return false;
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update button icon
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-palette';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, initPortfolio };
}