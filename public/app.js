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

    !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Xr es pi Zr rs Kr Qr capture Ni calculateEventProperties os register register_once register_for_session unregister unregister_for_session ds getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty us ns createPersonProfile hs Vr vs opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing ss debug O ls getPageViewId captureTraceFeedback captureTraceMetric qr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_dOBViKPhL2wwSDvkWprVr9vmD5L5303U10sVxcqda3T', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-11-30',
        person_profiles: 'identified_only',
        cookie_domain: '.simicodes.xyz'
    });
})();

// Portfolio Data and Configuration
const portfolioData = {
    name: "SIMI",
    title: "WEB AND DESKTOP APPS DEVELOPER",
    email: '<a href="mailto:hi@simicodes.xyz" target="_blank">hi@simicodes.xyz</a>',
    location: "Planet Earth",
    github: '<a href="https://github.com/slammers001" target="_blank" rel="noopener">slammers001</a>',
    
    about: "365 days a year developer who creates digital experiences with a focus on clean code, innovative design, and user-centric solutions. My work blends technical precision with creative expression.",
    
    skills: ["Python", "JavaScript", "Rust", "Go", "TypeScript", "C", "Nim", "PowerShell", "Dart", "React", "Node.js", "CSS3", "Supabase", "Electron", "Figma", "Git"],
    
    projects: [
        {
            id: 1,
            title: "STICKEE",
            description: "A modern desktop application for managing and organizing your digital sticky notes and tasks in an easy and fun way.",
            tags: ["JavaScript", "TypeScript", "HTML/CSS", "Electron", "React"],
            liveUrl: "https://stickee.simicodes.xyz",
            codeUrl: "https://www.simicodes.xyz/stickee/info",
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
            description: "Reads your repository code and generates an accurate README based on it. Uses Gemini.",
            tags: ["TypeScript", "CSS", "Other"],
            liveUrl: "NO DEMO",
            codeUrl: "https://github.com/slammers001/readme-ai-generator",
            color: "#9B5DE5"
        },
        {
            id: 6,
            title: "CHESS",
            description: "Extremely simple (with just one game file) yet extremely fun version of Chess where cute Pokemon characters are the pieces. Beginner friendly and you play against the computer. Complete with a % winning chances. Have fun!",
            tags: ["HTML"],
            liveUrl: "https://chess.simicodes.xyz",
            codeUrl: "https://github.com/slammers001/pokemonchess",
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
    // Don't clear skeletons immediately - fade them out first
    const skeletons = projectsGrid.querySelectorAll('.skeleton');
    
    if (skeletons.length > 0) {
        // Fade out skeletons
        skeletons.forEach(skeleton => {
            skeleton.style.opacity = '0';
            skeleton.style.transition = 'opacity 0.3s ease-out';
        });
        
        // Wait for fade out, then render projects
        setTimeout(() => {
            projectsGrid.innerHTML = '';
            renderProjectCards();
        }, 300);
    } else {
        renderProjectCards();
    }
}

// Separate function to render actual project cards
function renderProjectCards() {
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.projectId = project.id;

        const projectImageClass = project.id === 1 
            ? 'project-image-stickee' 
            : (project.id === 2 || project.id === 3 || project.id === 4 || project.id === 5 || project.id === 6) 
                ? 'project-image-no-border' 
                : 'project-image';

        const projectImageContent = project.id === 1 
            ? `<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: white; padding: 10px;">
                <img src="stickee-preview.png" alt="${project.title} Preview" width="400" height="200" style="max-width: 100%; max-height: 100%; object-fit: contain;">
              </div>`
            : project.id === 2 
            ? `<img src="p-gen.png" alt="${project.title} Preview" width="400" height="200" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 3 
            ? `<img src="colorshroom.png" alt="${project.title} Preview" width="400" height="200" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 4 
            ? `<img src="sleepyfox.png" alt="${project.title} Preview" width="400" height="200" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 5 
            ? `<img src="readme-gen.png" alt="${project.title} Preview" width="400" height="200" style="width: 100%; height: 100%; object-fit: cover;">`
            : project.id === 6 
            ? `<img src="pokechess.png" alt="${project.title} Preview" width="400" height="200" style="width: 100%; height: 100%; object-fit: cover;">`
            : '';

        projectCard.innerHTML = `
            <div class="${projectImageClass}${project.id === 1 ? ' text-underline' : ''}" style="background-color: ${project.color}">
                ${projectImageContent}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    ${project.liveUrl === "NO DEMO" ? '<span class="project-link">NO DEMO</span>' : project.id === 1 ? `<a href="${project.liveUrl}" class="project-link electric-border-btn" data-electric-color="#ff6b6b" data-electric-speed="2.1" data-electric-chaos="0.09">TRY IT OUT</a>` : project.id === 6 ? `<a href="${project.liveUrl}" class="project-link electric-border-btn" data-electric-color="#00BBF9" data-electric-speed="2.1" data-electric-chaos="0.09" target="_blank" rel="noopener">COMING SOON</a>` : `<a href="${project.liveUrl}" class="project-link" ${project.liveUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>DEMO</a>`}
                    <a href="${project.codeUrl}" class="project-link ${project.id === 1 ? 'electric-border-btn' : ''}" ${project.codeUrl !== '#' ? 'target="_blank" rel="noopener"' : ''} ${project.id === 1 ? 'data-electric-color="#ff6b6b" data-electric-speed="2.1" data-electric-chaos="0.09"' : ''}>${project.id === 1 ? 'ABOUT' : 'GITHUB REPO'}</a>
                </div>
            </div>
        `;
        
        // Start with opacity 0 and fade in
        projectCard.style.opacity = '0';
        projectCard.style.transition = 'opacity 0.5s ease-in';
        projectsGrid.appendChild(projectCard);
        
        // Fade in after a short delay
        setTimeout(() => {
            projectCard.style.opacity = '1';
        }, 50);
    });
}

// Update Personal Info
function updatePersonalInfo() {
    document.querySelector('.name').textContent = portfolioData.name;
    document.querySelector('.hero-subtitle').innerHTML = portfolioData.title.replace('&', '<br>');
    
    // Update contact info
    const contactItems = document.querySelectorAll('.contact-text p');
    if (contactItems.length >= 3) {
        contactItems[0].innerHTML = portfolioData.email;
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
    
    // Update button icon only if themeToggle exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-palette';
    }
    
    // Save preference
    localStorage.setItem('theme', newTheme);
}

// Handle Form Submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        const response = await fetch(API_URL + '/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                _captcha: formData.get('_captcha')
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            form.reset();
            form.appendChild(successMsg);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again later or contact me directly at hi@simicodes.xyz');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update button icon only if themeToggle exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-palette';
    }
}

// Set placeholder text for IP field
function detectLocation() {
    const ipField = document.getElementById('user_ip');
    if (ipField) {
        ipField.placeholder = 'Detecting your IP...';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    detectLocation();
    loadThemePreference();
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize Electric Border for STICKEE buttons
    setTimeout(() => {
        const electricButtons = document.querySelectorAll('.electric-border-btn');
        electricButtons.forEach(button => {
            if (button && window.ElectricBorder) {
                const color = button.dataset.electricColor || '#ff6b6b';
                const speed = parseFloat(button.dataset.electricSpeed) || 2.1;
                const chaos = parseFloat(button.dataset.electricChaos) || 0.09;
                
                new ElectricBorder(button, {
                    color: color,
                    speed: speed,
                    chaos: chaos,
                    borderRadius: 0
                });
            }
        });
    }, 1000); // Wait for projects to render
});