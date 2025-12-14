// Additional interactive features and animations

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize PostHog (will work when posthog-js is loaded)
    if (typeof posthog !== 'undefined') {
        posthog.init('your_posthog_api_key_here', {
            api_host: 'https://app.posthog.com',
            defaults: '2025-11-30'
        });
        
        // Track page view
        posthog.capture('page_view', {
            page: window.location.pathname,
            title: document.title
        });
    }
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-4px, -4px)';
            this.style.boxShadow = '6px 6px 0px var(--dark)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.boxShadow = 'none';
        });
    });

    // Track project clicks
    const projectLinks = document.querySelectorAll('.project-link, .btn-primary');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof posthog !== 'undefined') {
                posthog.capture('project_clicked', {
                    project_title: this.textContent.trim(),
                    href: this.href
                });
            }
        });
    });

    // Track contact form interactions
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            if (typeof posthog !== 'undefined') {
                posthog.capture('contact_form_attempt', {
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    // Add typing effect to hero title (CLS-friendly version)
    const heroName = document.querySelector('.name');
    const originalName = heroName.textContent;
    
    // Reserve space to prevent layout shift
    heroName.style.height = heroName.offsetHeight + 'px';
    heroName.style.display = 'block';
    
    // Clear text but keep the reserved space
    heroName.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalName.length) {
            heroName.textContent += originalName.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .stat-card, .contact-item').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideUp 0.6s ease forwards;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .project-card, .stat-card, .contact-item {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Tab to cycle through projects
        if (e.key === 'Tab' && document.activeElement.classList.contains('project-link')) {
            e.preventDefault();
            const projects = document.querySelectorAll('.project-card');
            const currentIndex = Array.from(projects).indexOf(document.activeElement.closest('.project-card'));
            
            if (e.shiftKey) {
                // Shift+Tab: previous project
                const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
                projects[prevIndex].querySelector('.project-link').focus();
            } else {
                // Tab: next project
                const nextIndex = (currentIndex + 1) % projects.length;
                projects[nextIndex].querySelector('.project-link').focus();
            }
        }
        
        // Escape to close any open modals (if added later)
        if (e.key === 'Escape') {
            document.querySelectorAll('[data-modal]').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });

    // Add dynamic year to footer
    updateFooterYear();
});

// Update footer year dynamically
function updateFooterYear() {
    const yearSpan = document.querySelector('.footer-text');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2023', currentYear);
    }
}

// Add image lazy loading
function addLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add performance monitoring (optional)
if (typeof PerformanceObserver !== 'undefined') {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log(`${entry.name}: ${entry.duration}ms`);
        }
    });
    
    perfObserver.observe({ entryTypes: ['measure', 'largest-contentful-paint'] });
}

// Export functions for testing or module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateFooterYear
    };
}
