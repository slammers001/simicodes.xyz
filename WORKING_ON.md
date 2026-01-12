also on desktop the header should scroll down when you scroll down icons do not look good on desktop like github, emial, location get in touch is on top of th etext that should be under it.
my projects need ot be fixed. and remove languages. get in touch also doesn't look good.
and add chess.simicodes.xyz also.

this is styles: /* Restore section title mobile styles */
@media (max-width: 768px) {
    .section-title {
        font-size: 38px !important;
        line-height: 1.1 !important;
        margin-bottom: 20px !important;
    }
    
    .text-underline {
        line-height: 0.8 !important;
    }
}

/* Ensure proper spacing after fixing the header */
.about,
.projects,
.contact {
    padding-top: 40px;
    padding-bottom: 40px;
}

/* Fix mobile layout */
@media (max-width: 768px) {
    .about,
    .projects,
    .contact {
        padding-top: 30px;
        padding-bottom: 30px;
    }
}
/* Make header scroll with content on desktop */
@media (min-width: 769px) {
    .navbar {
        position: sticky;
        top: 0;
        z-index: 1000;
        background-color: var(--light);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
}

/* Make header fixed on mobile */
@media (max-width: 768px) {
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: var(--light);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Add padding to account for fixed header */
    .hero {
        padding-top: 80px;
    }
}

/* Move projects section up */
.projects {
    padding-top: 20px !important;
}

/* Adjust spacing for mobile */
@media (max-width: 768px) {
    .projects {
        padding-top: 10px !important;
    }
}

/* Ensure content doesn't jump when header becomes fixed */
html {
    scroll-padding-top: 80px;
}
/* Improve contact section for mobile */
.contact {
    padding: 30px 15px;
}

.contact-note {
    font-size: 16px;
    margin-bottom: 25px;
    line-height: 1.5;
}

.contact-content {
    flex-direction: column;
    gap: 30px;
}

.contact-info {
    width: 100%;
    text-align: center;
}

.contact-form {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}

/* Adjust form elements */
.form-group {
    margin-bottom: 20px;
}

.form-control {
    width: 100%;
    padding: 12px 15px;
    font-size: 16px;
    border: 2px solid var(--dark);
    border-radius: 4px;
    background-color: var(--light);
}

/* Improve button styling */
.btn-submit {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
}

/* Social links */
.social-links {
    justify-content: center;
    margin-top: 20px;
}

.social-link {
    margin: 0 10px;
    font-size: 24px;
    color: var(--dark);
    transition: color 0.3s ease;
}

.social-link:hover {
    color: var(--primary);
}

/* Adjust section title for mobile */
.contact .section-title {
    margin-bottom: 15px;
}

/* Make form more compact on desktop */
@media (min-width: 992px) {
    .contact-content {
        flex-direction: row;
        align-items: flex-start;
        max-width: 1000px;
        margin: 0 auto;
    }
    
    .contact-info {
        width: 40%;
        text-align: left;
        padding-right: 30px;
    }
    
    .contact-form {
        width: 60%;
        padding-left: 30px;
        border-left: 2px solid var(--dark);
    }
}
/* Fix header scrolling on desktop */
@media (min-width: 769px) {
    .navbar {
        position: relative; /* Changed from sticky to relative */
        top: auto;
        box-shadow: none; /* Remove shadow when not sticky */
    }
    
    /* Add shadow only when scrolled */
    .scrolled .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: var(--light);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s ease-out;
    }
    
    /* Add padding to body when header is fixed */
    body.scrolled {
        padding-top: 80px;
    }
}
/* Animation for header */
@keyframes slideDown {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}
/* Improve contact section layout */
.contact-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
.contact-info {
    order: 2; /* Move contact info below form */
    width: 100%;
    text-align: center;
}
.contact-form {
    order: 1; /* Move form to top */
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}
/* Improve contact info items */
.contact-info-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    text-align: left;
}
.contact-info-item i {
    font-size: 24px;
    min-width: 40px;
    margin-right: 15px;
    color: var(--primary);
}
/* Improve social links */
.social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
}
.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--dark);
    color: var(--light);
    transition: all 0.3s ease;
}
.social-link:hover {
    background-color: var(--primary);
    color: var(--light);
    transform: translateY(-3px);
}
/* Desktop layout */
@media (min-width: 992px) {
    .contact-content {
        flex-direction: row;
        align-items: flex-start;
        gap: 60px;
    }
    
    .contact-info {
        order: 1;
        width: 40%;
        position: sticky;
        top: 100px;
    }
    
    .contact-form {
        order: 2;
        width: 60%;
        padding: 30px;
        background: var(--light);
        border: 2px solid var(--dark);
        border-radius: 8px;
        box-shadow: 4px 4px 0 var(--dark);
    }
}
/* Prevent horizontal scrolling on mobile */
html, body {
    max-width: 100%;
    overflow-x: hidden;
}
/* Ensure electricity effect works on mobile */
@media (max-width: 768px) {
    .electric-border-btn {
        position: relative;
        overflow: visible !important;
    }
}
/* Fix button width and prevent text wrapping */
@media (max-width: 768px) {
    .project-links {
        flex-direction: column;
        gap: 10px;
    }
    
    .project-link {
        width: 100%;
        text-align: center;
        white-space: nowrap;
    }
}
/* Ensure project cards don't cause horizontal scroll */
@media (max-width: 480px) {
    .projects-grid {
        grid-template-columns: 1fr;
        padding: 0 10px;
    }
    
    .project-card {
        margin: 0;
        width: 100%;
        box-sizing: border-box;
    }
}
/* Adjust container padding on mobile */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }
}
/* Ensure project images don't overflow */
@media (max-width: 768px) {
    .project-image {
        width: 100%;
        height: auto;
        aspect-ratio: 16/9;
    }
}
/* Center button text on mobile */
@media (max-width: 768px) {
    .project-link {
        justify-content: center;
        display: flex;
        align-items: center;
    }
}
/* Ensure electricity effect appears above other elements */
.electric-border-btn::before {
    z-index: 1;
}

.electric-border-btn > * {
    position: relative;
    z-index: 2;
}
/* Prevent long project titles from breaking layout */
.project-title {
    word-break: break-word;
    overflow-wrap: break-word;
}

/* Hide cat image on mobile */
@media (max-width: 768px) {
    .profile-image-container {
        display: none;
    }
}
/* Add this at the end of the file, just before the last closing brace */
@media (max-width: 768px) {
    .project-title {
        font-weight: 800; /* Bolder for better visibility */
        text-shadow: 0 0 1px rgba(0, 0, 0, 0.1); /* Subtle shadow for contrast */
    }
    
    /* Darker colors for better visibility on mobile */
    .project-card[data-project-id="2"] .project-title {
        color: #3ab8b0; /* Slightly darker turquoise */
    }
    
    .project-card[data-project-id="3"] .project-title {
        color: #e6b83d; /* Slightly darker yellow */
    }
    
    .project-card[data-project-id="4"] .project-title {
        color: #7fc75a; /* Slightly darker green */
    }
    
    .project-card[data-project-id="6"] .project-title {
        color: #0099d4; /* Slightly darker blue */
    }
}

/* Neobrutalism CSS Theme */
:root {
    --primary: #FF6B6B;
    --secondary: #4ECDC4;
    --accent: #FFD166;
    --dark: #2D3047;
    --light: #F7FFF7;
    --shadow: 8px 8px 0px #000000;
    --border: 3px solid #000000;
    --font-heading: 'Syne', sans-serif;
    --font-body: 'Onest', sans-serif;
    --skeleton-base: #e0e0e0;
    --skeleton-shine: #f0f0f0;
}

[data-theme="dark"] {
    --primary: #FF6B6B;
    --secondary: #4ECDC4;
    --accent: #FFD166;
    --dark: #F7FFF7;
    --light: #2D3047;
    --shadow: 8px 8px 0px #FFFFFF;
    --border: 3px solid #FFFFFF;
    --skeleton-base: #3a3a3a;
    --skeleton-shine: #4a4a4a;
}

/* Skeleton Loader Styles for CLS Prevention */
.skeleton {
    animation: skeleton-loading 1.5s infinite ease-in-out;
}

.skeleton-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(
        90deg,
        var(--skeleton-base) 0%,
        var(--skeleton-shine) 50%,
        var(--skeleton-base) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s infinite;
    border-radius: 8px;
    aspect-ratio: 2/1; /* Prevent CLS by maintaining aspect ratio */
}

.skeleton-title {
    width: 60%;
    height: 24px;
    background: linear-gradient(
        90deg,
        var(--skeleton-base) 0%,
        var(--skeleton-shine) 50%,
        var(--skeleton-base) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 12px;
}

.skeleton-text {
    width: 100%;
    height: 16px;
    background: linear-gradient(
        90deg,
        var(--skeleton-base) 0%,
        var(--skeleton-shine) 50%,
        var(--skeleton-base) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 8px;
}

.skeleton-text:last-child {
    width: 80%;
}

.skeleton-tags {
    display: flex;
    gap: 8px;
    margin: 16px 0;
}

.skeleton-tags::before,
.skeleton-tags::after {
    content: '';
    width: 60px;
    height: 24px;
    background: linear-gradient(
        90deg,
        var(--skeleton-base) 0%,
        var(--skeleton-shine) 50%,
        var(--skeleton-base) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s infinite;
    border-radius: 12px;
}

.skeleton-links {
    display: flex;
    gap: 12px;
    margin-top: 16px;
}

.skeleton-links::before,
.skeleton-links::after {
    content: '';
    width: 80px;
    height: 32px;
    background: linear-gradient(
        90deg,
        var(--skeleton-base) 0%,
        var(--skeleton-shine) 50%,
        var(--skeleton-base) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes skeleton-shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

@keyframes skeleton-loading {
    0% {
        opacity: 0.7;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.7;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-body);
    background-color: var(--light);
    color: var(--dark);
    line-height: 1.6;
    transition: all 0.3s ease;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.header {
    padding: 20px 0;
    position: sticky;
    top: 0;
    background-color: var(--light);
    z-index: 100;
    border-bottom: var(--border);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.github-star-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: #24292e;
    color: var(--light);
    border: var(--border);
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
}

.github-star-btn:hover {
    background-color: var(--primary);
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow);
}

.github-star-btn i {
    font-size: 16px;
}

.logo {
    position: relative;
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: 24px;
    letter-spacing: 2px;
}

.logo-underline {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--primary);
    transform: skew(-20deg);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
    align-items: center;
}

.nav-link {
    text-decoration: none;
    color: var(--dark);
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1px;
    padding: 8px 16px;
    border: var(--border);
    background-color: var(--light);
    transition: all 0.2s ease;
}

.nav-link:hover {
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow);
}

.theme-toggle {
    width: 50px;
    height: 50px;
    border: var(--border);
    background-color: var(--accent);
    cursor: pointer;
    font-size: 20px;
    transition: all 0.2s ease;
}

.theme-toggle:hover {
    transform: rotate(15deg);
    box-shadow: var(--shadow);
}

/* Hero Section */
.hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    padding: 80px 0;
    align-items: center;
}

.hero-title {
    font-family: var(--font-heading);
    font-size: 64px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 30px;
}

.text-highlight {
    background-color: var(--accent);
    padding: 0 10px;
    display: inline-block;
}

.name {
    color: var(--primary);
    text-shadow: 3px 3px 0px var(--dark);
}

.hero-subtitle {
    font-size: 24px;
    margin-bottom: 40px;
    font-weight: 500;
}

.hero-buttons {
    display: flex;
    gap: 20px;
}

.btn {
    padding: 15px 30px;
    border: var(--border);
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s ease;
    letter-spacing: 1px;
}

.btn-primary {
    background-color: var(--primary);
    color: var(--light);
}

.btn-secondary {
    background-color: var(--light);
    color: var(--dark);
}
.btn-github {
    background-color: #24292e;
    color: var(--light);
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-github:hover {
    background-color: #0366d6;
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow);
}
.nav-github {
    color: var(--dark) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    line-height: 1;
}

.nav-github:hover {
    color: var(--primary) !important;
}
.github-float-btn {
    position: fixed;
    top: 30px;
    right: 30px;
    background-color: transparent;
    color: #000;
    padding: 15px 20px;
    border-radius: 0px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 14px;
    border: 3px solid #000;
    transition: all 0.3s ease;
    z-index: 1000;
}

.github-float-btn:hover {
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0px #000;
}
.nav-github i {
    font-size: 1.2em;
    vertical-align: middle;
}

.btn:hover {
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow);
}

.hero-image {
    display: flex;
    justify-content: center;
}

.profile-image-container {
    width: 300px;
    height: 300px;
    border: var(--border);
    background-color: var(--secondary);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow);
    overflow: hidden;
    aspect-ratio: 1/1; /* Ensure perfect circle and prevent CLS */
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-dots {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    background-color: var(--primary);
    border: var(--border);
}

.image-text {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    padding: 20px;
}

/* Section Styles */
.section-title {
    font-family: var(--font-heading);
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 60px;
    text-align: center;
}

.text-underline {
    position: relative;
    display: inline-block;
}

.text-underline::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: var(--primary);
    transform: skew(-20deg);
}

/* About Section */
.about {
    padding: 80px 0;
    border-top: var(--border);
    border-bottom: var(--border);
    margin: 40px 0;
}

.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 60px;
}

.about-paragraph {
    font-size: 18px;
    margin-bottom: 40px;
    line-height: 1.8;
}

.skills-title {
    font-family: var(--font-heading);
    font-size: 24px;
    margin-bottom: 20px;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.skill-tag {
    padding: 10px 15px;
    border: var(--border);
    background-color: var(--light);
    text-align: center;
    font-weight: 600;
    transition: all 0.2s ease;
}

.skill-tag:hover {
    background-color: var(--accent);
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0px var(--dark);
}

.about-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.stat-card {
    border: var(--border);
    padding: 30px;
    text-align: center;
    background-color: var(--light);
    transition: all 0.2s ease;
}

.stat-card:hover {
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow);
}

.stat-number {
    font-family: var(--font-heading);
    font-size: 48px;
    font-weight: 800;
    color: var(--primary);
}

.stat-label {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
}

/* Projects Section */
.projects {
    padding: 80px 0;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    contain: layout style; /* Prevent CLS by containing layout changes */
}

.projects-note {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.project-card {
    border: var(--border);
    background-color: var(--light);
    transition: all 0.3s ease;
    overflow: hidden;
    min-height: 400px; /* Prevent CLS by reserving space */
}

.project-card:hover {
    transform: translate(-8px, -8px);
    box-shadow: var(--shadow);
}

.project-image {
    height: 200px;
    background-color: var(--secondary);
    border-bottom: var(--border);
    position: relative;
    overflow: hidden;
    aspect-ratio: 2/1; /* Prevent CLS by maintaining aspect ratio */
}

.project-image::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px dashed var(--dark);
    z-index: 1;
    pointer-events: none;
}

.project-image-no-border::before {
    display: none;
}

.project-content {
    padding: 25px;
}

.project-title {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 15px;
}

/* Project-specific title colors */
.project-card[data-project-id="1"] .project-title {
    color: var(--primary);
}

.project-card[data-project-id="2"] .project-title {
    color: #4ECDC4;
}

.project-card[data-project-id="3"] .project-title {
    color: #FFD166;
}

.project-card[data-project-id="4"] .project-title {
    color: #95E06C;
}

.project-card[data-project-id="5"] .project-title {
    color: #9B5DE5;
}

.project-card[data-project-id="6"] .project-title {
    color: #00BBF9;
}

.project-description {
    margin-bottom: 20px;
    color: var(--dark);
    opacity: 0.9;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.project-tag {
    padding: 5px 10px;
    background-color: var(--accent);
    font-size: 12px;
    font-weight: 600;
    border: 2px solid var(--dark);
}

.project-links {
    display: flex;
    gap: 15px;
}

.project-link {
    padding: 10px 20px;
    border: var(--border);
    background-color: var(--light);
    color: var(--dark);
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
}

.project-link:hover {
    background-color: var(--primary);
    color: var(--light);
}

/* Stickee project buttons: clear background with black border and red ring */
.project-card[data-project-id="1"] .project-link {
    position: relative;
    overflow: visible;
    border: 2px solid #000000;
    background: transparent;
    color: var(--dark);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 1;
    box-shadow:
        0 0 0 3px var(--primary);
}

.project-card[data-project-id="1"] .project-link:hover {
    background: transparent;
    transform: translateY(-2px) translate(-2px, -2px);
    box-shadow:
        0 0 0 3px var(--primary),
        4px 4px 0 var(--dark);
}

.project-card[data-project-id="1"] .project-link:nth-child(2):hover {
    background-color: var(--primary);
    color: var(--light);
    transform: translateY(-2px) translate(-2px, -2px);
    box-shadow:
        4px 4px 0 var(--dark);
}

.project-card[data-project-id="6"] .project-link:hover {
    background: transparent;
    color: var(--dark);
    transform: translateY(-2px) translate(-2px, -2px);
    box-shadow:
        0 0 0 3px #00BBF9,
        4px 4px 0 var(--dark);
}

.project-card[data-project-id="6"] .project-link:nth-child(2):hover {
    background-color: #00BBF9;
    color: var(--light);
    transform: translateY(-2px) translate(-2px, -2px);
    box-shadow:
        4px 4px 0 var(--dark);
}

/* NEW badge styling */
.new-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
    color: white;
    font-size: 9px;
    font-weight: 800;
    padding: 3px 6px;
    transform: rotate(45deg);
    transform-origin: center;
    box-shadow: 0 2px 4px rgba(255, 107, 107, 0.4);
    z-index: 10;
    white-space: nowrap;
    line-height: 1;
}

@keyframes pulse-glow {
    0%, 100% {
        box-shadow:
            0 0 0 3px var(--primary),
            0 0 20px rgba(255, 107, 107, 0.3);
    }
    50% {
        box-shadow:
            0 0 0 3px var(--primary),
            0 0 30px rgba(255, 107, 107, 0.6);
    }
}

@keyframes badge-diagonal-pulse {
    0%, 100% {
        transform: rotate(45deg) scale(1);
        box-shadow: 0 2px 6px rgba(255, 107, 107, 0.4);
    }
    50% {
        transform: rotate(45deg) scale(1.1);
        box-shadow: 0 2px 10px rgba(255, 107, 107, 0.6);
    }
}

/* Contact Section */
.contact {
    padding: 80px 0;
    border-top: var(--border);
    margin-top: 40px;
}

.contact-note {
    text-align: center;
    margin: 0 0 20px 0;
    font-size: 16px;
    color: var(--dark);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 20px;
}

.contact-icon {
    width: 60px;
    height: 60px;
    border: var(--border);
    background-color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--light);
}

.contact-text h3 {
    font-family: var(--font-heading);
    font-size: 18px;
    margin-bottom: 5px;
}

.form-group {
    margin-bottom: 25px;
}

.form-input, .form-textarea {
    width: 100%;
    padding: 15px;
    border: var(--border);
    background-color: var(--light);
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    color: var(--dark);
    transition: all 0.2s ease;
}

.form-input:focus, .form-textarea:focus {
    outline: none;
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow);
}

.form-textarea {
    resize: vertical;
}

/* Footer */
.footer {
    padding: 40px 0;
    border-top: var(--border);
    margin-top: 40px;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.social-links {
    display: flex;
    gap: 20px;
}

.social-link {
    width: 50px;
    height: 50px;
    border: var(--border);
    background-color: var(--light);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--dark);
    text-decoration: none;
    transition: all 0.2s ease;
}

.social-link:hover {
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow);
    background-color: var(--accent);
}

.footer-text {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .hero {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .about-content {
        grid-template-columns: 1fr;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 48px;
    }
    
    .section-title {
        font-size: 36px;
    }
    
    .nav-links {
        display: none;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .skills-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 36px;
    }
    
    .hero-buttons {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
        text-align: center;
    }
}




















/* Mobile Star Button */
@media (max-width: 768px) {
    .github-float-btn {
    position: fixed;
    top: 30px;
    right: 30px;
    background-color: transparent;
    color: #000;
    padding: 15px 20px;
    border-radius: 0px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 14px;
    border: 3px solid #000;
    transition: all 0.3s ease;
    z-index: 1000;
}
    
    .navbar {
        text-align: center;
        padding-bottom: 10px;
        justify-content: center;
        flex-direction: column;
    }
    
    .navbar-actions {
        flex-direction: column;
        gap: 15px;
        width: 100%;
    }
    
    .github-star-btn {
        display: none;
    }
    
    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .nav-links li:last-child {
        width: 100%;
        margin-top: 10px;
    }
}

/* Email Link Styling */
.contact-link {
    color: var(--primary) !important;
    text-decoration: underline !important;
    font-weight: 600 !important;
    transition: all 0.2s ease;
    cursor: pointer !important;
}

.contact-link:hover {
    color: var(--secondary) !important;
    text-decoration: none !important;
}

.contact-text p a {
    color: var(--primary) !important;
    text-decoration: underline !important;
    font-weight: 600 !important;
    transition: all 0.2s ease;
    cursor: pointer !important;
}

.contact-text p a:hover {
    color: var(--secondary) !important;
    text-decoration: none !important;
}

/* Mobile Star Button */
.github-mobile-btn {
    display: none;
}

@media (max-width: 768px) {
    .github-float-btn {
    position: fixed;
    top: 30px;
    right: 30px;
    background-color: transparent;
    color: #000;
    padding: 15px 20px;
    border-radius: 0px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 14px;
    border: 3px solid #000;
    transition: all 0.3s ease;
    z-index: 1000;
}
    
    .github-mobile-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: transparent;
        color: #000;
        padding: 15px 20px;
        border-radius: 0px;
        text-decoration: none;
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: 14px;
        border: 3px solid #000;
        margin-top: 20px;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .github-mobile-btn:hover {
        transform: translate(-4px, -4px);
        box-shadow: 8px 8px 0px #000;
    }

    /* Add this to your CSS file */
    .project-image-stickee {
        border: 3px solid var(--primary);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .project-image-stickee:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    /* Ensure the image inside fills the container */
    .project-image-stickee img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    /* Mobile Stickee project buttons: match clear background with black border and red ring */
    .project-card[data-project-id="1"] .project-link {
        position: relative;
        overflow: hidden;
        border: 2px solid #000000;
        background: transparent;
        color: var(--dark);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 1;
        box-shadow:
            0 0 0 3px var(--primary);
    }

    .project-card[data-project-id="1"] .project-link:hover {
        background: transparent;
        color: var(--dark);
        transform: translateY(-2px) translate(-2px, -2px);
        box-shadow:
            0 0 0 3px var(--primary),
            4px 4px 0 var(--dark);
    }

    .project-card[data-project-id="1"] .project-link:nth-child(2):hover {
        background-color: var(--primary);
        color: var(--light);
        transform: translateY(-2px) translate(-2px, -2px);
        box-shadow:
            4px 4px 0 var(--dark);
    }

    .project-card[data-project-id="1"] .project-link:hover {
        background: transparent;
        transform: translateY(-2px) translate(-2px, -2px);
        box-shadow:
            0 0 0 3px var(--primary),
            4px 4px 0 var(--dark);
    }

    .project-card[data-project-id="6"] .project-link:hover {
        background: transparent;
        color: var(--dark);
        transform: translateY(-2px) translate(-2px, -2px);
        box-shadow:
            0 0 0 3px #00BBF9,
            4px 4px 0 var(--dark);
    }

    .project-card[data-project-id="6"] .project-link:nth-child(2):hover {
        background-color: #00BBF9;
        color: var(--light);
        transform: translateY(-2px) translate(-2px, -2px);
        box-shadow:
            4px 4px 0 var(--dark);
    }

}

