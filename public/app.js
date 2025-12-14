// API Configuration
const API_URL = window.location.origin + '/api';

// Initialize PostHog
(function() {
    var persistence = 'localStorage';
    try {
        var testKey = 'posthog_test';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
    } catch (e) {
        persistence = 'memory';
    }

    !(function(t, e) {
        var o, n, p, r;
        e.__SV ||
            ((window.posthog = e),
            (e._i = []),
            (e.init = function(i, s, a) {
                function g(t, e) {
                    var o = e.split('.');
                    2 == o.length && ((t = t[o[0]]), (e = o[1]));
                    t[e] = function() {
                        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                    };
                }
                (p = t.createElement('script')).type = 'text/javascript';
                p.async = !0;
                p.src = 'https://us-assets.i.posthog.com/static/array.js';
                (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
                var u = e;
                void 0 !== a ? (u = e[a] = []) : (a = 'posthog');
                u.people = u.people || [];
                u.toString = function(t) {
                    var e = 'posthog';
                    return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
                };
                u.people.toString = function() {
                    return u.toString(1) + '.people (stub)';
                };
                o =
                    'capture identify alias people.set people.set_once people.unset people.increment people.append people.remove people.group page reload opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing disable_session_recording enable_session_recording get_session_recording_properties'.split(
                        ' '
                    );
                for (n = 0; n < o.length; n++) g(u, o[n]);
                e._i.push([i, s, a]);
            }),
            (e.__SV = 1));
    })(document, window.posthog || []);

    posthog.init('phc_dOBViKPhL2wwSDvkWprVr9vmD5L5303U10sVxcqda3T', {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        persistence: persistence,
        autocapture: true
    });
})();

// Portfolio Data and Configuration
const portfolioData = {
    name: "SIMI",
    title: "APP DEVELOPER",
    email: "coming soon",
    location: "Bed, probably",
    github: '<a href="https://github.com/slammers001" target="_blank" rel="noopener">slammers001</a>',
    
    about: "365 days a year developer who creates digital experiences with a focus on clean code, innovative design, and user-centric solutions. My work blends technical precision with creative expression.",
    
    skills: ["Python", "JavaScript", "Rust", "Go", "TypeScript", "C", "Nim", "PowerShell", "Dart", "React", "Node.js", "CSS3", "Supabase", "Electron", "Figma", "Git"],
    
    projects: [
        {
            id: 1,
            title: "STICKEE",
            description: "A modern desktop application for managing and organizing your digital sticky notes and tasks in an easy and fun way.",
            tags: ["JavaScript", "TypeScript", "HTML/CSS", "Electron", "React"],
            liveUrl: "/web-apps/stickee",
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
            title: "COLORSHROOM",
            description: "Colorshroom is a cool graphic tool. Has a palette creator and color picker and color of the day all in one.",
            tags: ["TypeScript", "Other"],
            liveUrl: "colorshroom-demo.mp4",
            codeUrl: "https://github.com/slammers001/colorshroom",
            color: "#FFD166"
        },
        {
            id: 4,
            title: "SLEEPYFOX",
            description: "Lightweight desktop app for quick image conversion and resizing with clean interface.",
            tags: ["TypeScript", "JavaScript", "HTML", "CSS"],
            liveUrl: "sleepyfox.mp4",
            codeUrl: "https://github.com/slammers001/sleepyfox",
            color: "#95E06C"
        },
        {
            id: 5,
            title: "README-GENERATOR",
            description: "Reads your repository code and generates an accurate README based on it.",
            tags: ["TypeScript", "CSS", "Other"],
            liveUrl: "NO DEMO",
            codeUrl: "https://github.com/slammers001/readme-ai-generator",
            color: "#9B5DE5"
        },
        {
            id: 6,
            title: "POKEMON CHESS",
            description: "Extremely simple (with just one game file) yet extremely fun version of Chess where Pokemon are the players. Comes in multiple levels, and you play against the computer. Complete with a % winning chances. Have fun!",
            tags: ["HTML"],
            liveUrl: "pokechess.mp4",
            codeUrl: "https://github.com/slammers001/pokemon-chess",
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
    // Clear existing content including skeletons
    projectsGrid.innerHTML = '';
    
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const projectImageContent = project.id === 1 
            ? `<img src="stickee-preview.png" alt="${project.title} Preview" width="400" height="300" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 2 
            ? `<img src="p-gen.png" alt="${project.title} Preview" width="400" height="300" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 3 
            ? `<img src="colorshroom.png" alt="${project.title} Preview" width="400" height="300" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 4 
            ? `<img src="sleepyfox.png" alt="${project.title} Preview" width="400" height="300" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 5 
            ? `<img src="readme-gen.png" alt="${project.title} Preview" width="400" height="300" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 6 
            ? `<img src="pokechess.png" alt="${project.title} Preview" width="400" height="300" style="width: 100%; height: 100%; object-fit: cover;">`
            : '';

        const projectImageClass = (project.id === 1 || project.id === 2 || project.id === 3 || project.id === 4 || project.id === 5 || project.id === 6) ? 'project-image-no-border' : 'project-image';
        
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
                    ${project.liveUrl === "NO DEMO" ? '<span class="project-link">NO DEMO</span>' : project.id === 1 ? `<a href="${project.liveUrl}" class="project-link">TRY IT OUT</a>` : `<a href="${project.liveUrl}" class="project-link" ${project.liveUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>DEMO</a>`}
                    <a href="${project.codeUrl}" class="project-link" ${project.codeUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>GITHUB REPO</a>
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
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    try {
        // Send to your API
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formObject.email,
                github_username: formObject.name,
                message: formObject.message,
                location: formObject.location
            })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            console.error('API error:', result.error);
            alert('There was an error submitting your message. Please try again.');
            return;
        }
        
        console.log('Form submitted and saved:', formObject);
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your message. Please try again.');
    }
    
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

// Set placeholder text for IP field
function detectLocation() {
    const locationInput = document.getElementById('location');
    if (!locationInput) return;
    
    // The IP will be detected on the server side
    locationInput.value = '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    detectLocation();
    loadThemePreference();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, initPortfolio, detectLocation, loadThemePreference };
}