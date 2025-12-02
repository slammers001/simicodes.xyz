// Additional interactive features and animations

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
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

    // Add typing effect to hero title
    const heroName = document.querySelector('.name');
    const originalName = heroName.textContent;
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
        }
        
        /* Particle background for hero */
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 30%, var(--primary) 2px, transparent 3px),
                radial-gradient(circle at 80% 70%, var(--secondary) 2px, transparent 3px),
                radial-gradient(circle at 40% 80%, var(--accent) 2px, transparent 3px);
            background-size: 100px 100px;
            opacity: 0.1;
            pointer-events: none;
            z-index: -1;
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

    // Add project filter functionality
    addProjectFilter();
    
    // Add dynamic year to footer
    updateFooterYear();
});

// Project Filtering System
function addProjectFilter() {
    // Create filter buttons container
    const projectsSection = document.querySelector('.projects');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    
    // Get all unique tags
    const allTags = [...new Set(window.portfolioData.projects.flatMap(p => p.tags))];
    
    // Create "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.textContent = 'ALL';
    allButton.dataset.filter = 'all';
    filterContainer.appendChild(allButton);
    
    // Create tag buttons
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = tag;
        button.dataset.filter = tag.toLowerCase();
        filterContainer.appendChild(button);
    });
    
    // Insert before projects grid
    projectsSection.insertBefore(filterContainer, projectsGrid);
    
    // Add filter functionality
    filterContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Filter projects
            const filter = e.target.dataset.filter;
            filterProjects(filter);
        }
    });
    
    // Add filter styles
    const filterStyle = document.createElement('style');
    filterStyle.textContent = `
        .project-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 40px;
            justify-content: center;
        }
        
        .filter-btn {
            padding: 10px 20px;
            border: 3px solid var(--dark);
            background-color: var(--light);
            font-family: var(--font-body);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background-color: var(--primary);
            color: var(--light);
            transform: translate(-2px, -2px);
            box-shadow: 4px 4px 0px var(--dark);
        }
    `;
    document.head.appendChild(filterStyle);
}

// Filter projects based on tag
function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (filter === 'all') {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 10);
        } else {
            const tags = Array.from(project.querySelectorAll('.project-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            if (tags.includes(filter)) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        }
    });
}

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
        addProjectFilter,
        filterProjects,
        updateFooterYear
    };
}