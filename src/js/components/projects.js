// Projects Section Component

// Loading State Management Class
class ProjectCard {
    constructor(container) {
        this.container = container;
        this.loadingState = 'loading'; // loading, loaded, error
        this.img = container.querySelector('.project-card__img');
        this.video = container.querySelector('.project-card__video');
        this.imageContainer = container.querySelector('.project-card__image');
    }
    
    showLoading() {
        this.container.classList.add('is-loading');
        this.container.classList.remove('is-loaded', 'is-error');
        this.loadingState = 'loading';
    }
    
    showLoaded() {
        this.container.classList.remove('is-loading', 'is-error');
        this.container.classList.add('is-loaded');
        this.loadingState = 'loaded';
    }
    
    showError() {
        this.container.classList.remove('is-loading', 'is-loaded');
        this.container.classList.add('is-error');
        this.loadingState = 'error';
    }
    
    getState() {
        return this.loadingState;
    }
}

export function initProjects() {
    const projectCardElements = document.querySelectorAll('.project-card');
    const projectImages = document.querySelectorAll('.project-card__img');
    
    // Initialize ProjectCard instances
    const projectCards = Array.from(projectCardElements).map(card => new ProjectCard(card));
    
    // Handle media loading with fallbacks (images and videos)
    function handleMediaError(media) {
        const card = media.closest('.project-card');
        const imageContainer = media.closest('.project-card__image');
        const staticFallback = media.dataset.fallback;
        
        // For videos, try to show poster or fallback image
        if (media.tagName === 'VIDEO' && staticFallback) {
            const fallbackImg = document.createElement('img');
            fallbackImg.src = staticFallback;
            fallbackImg.className = 'project-card__img';
            fallbackImg.alt = 'Stock2coat inventory management interface';
            
            media.style.display = 'none';
            imageContainer.insertBefore(fallbackImg, media);
            console.log('Video failed, showing static fallback image');
            return;
        }
        
        // Try static fallback first (for images)
        if (staticFallback && !media.dataset.fallbackAttempted) {
            media.dataset.fallbackAttempted = 'true';
            media.src = staticFallback;
            console.log('Media failed, trying static fallback');
            return;
        }
        
        // Check if this is the portfolio card - don't show "Preview Coming Soon" for it
        const isPortfolioCard = card && card.querySelector('.project-card__title')?.textContent.includes('Portfolio Website');
        
        if (isPortfolioCard) {
            // For portfolio card, just hide the media and show the overlay text
            media.style.display = 'none';
            console.log('Portfolio card image failed, keeping overlay text only');
            return;
        }
        
        // Create ultimate fallback content for other projects
        const fallback = document.createElement('div');
        fallback.className = 'project-card__image-fallback';
        fallback.innerHTML = `
            <div class="project-card__fallback-content">
                <span class="project-card__fallback-icon">📱</span>
                <span class="project-card__fallback-text">Preview Coming Soon</span>
            </div>
        `;
        
        // Replace media with fallback
        media.style.display = 'none';
        imageContainer.appendChild(fallback);
        
        console.log('All media sources failed, showing fallback content');
    }
    
    // Set up media loading handlers (images and videos) with ProjectCard instances
    const projectMedia = document.querySelectorAll('.project-card__img, .project-card__video');
    
    projectMedia.forEach(media => {
        const cardElement = media.closest('.project-card');
        const projectCard = projectCards.find(pc => pc.container === cardElement);
        
        if (!projectCard) return;
        
        // Show loading state initially
        projectCard.showLoading();
        
        // Handle videos
        if (media.tagName === 'VIDEO') {
            const imageContainer = media.closest('.project-card__image');
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'project-card__loading';
            loadingIndicator.innerHTML = `
                <div class="project-card__loading-content">
                    <div class="project-card__loading-spinner"></div>
                    <span class="project-card__loading-text">Loading demo...</span>
                </div>
            `;
            imageContainer.appendChild(loadingIndicator);
            
            // Video events
            media.addEventListener('loadeddata', () => {
                loadingIndicator.remove();
                projectCard.showLoaded();
                console.log('Video loaded successfully');
            });
            
            media.addEventListener('error', () => {
                loadingIndicator.remove();
                handleMediaError(media);
                projectCard.showError();
            });
            
            // Handle video loading issues
            media.addEventListener('stalled', () => {
                console.log('Video loading stalled, showing poster');
            });
            
        } else {
            // Handle images
            media.addEventListener('load', () => {
                projectCard.showLoaded();
            });
            
            if (media.complete) {
                if (media.naturalWidth === 0) {
                    handleMediaError(media);
                    projectCard.showError();
                } else {
                    projectCard.showLoaded();
                }
            } else {
                media.addEventListener('error', () => {
                    handleMediaError(media);
                    projectCard.showError();
                });
            }
        }
    });
    
    // Add intersection observer for animation on scroll
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate3d(0, 0, 0)';
                    
                    // Remove will-change after animation completes for performance
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 600);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        projectCards.forEach((projectCard, index) => {
            // Initial state for animation
            const card = projectCard.container;
            card.style.opacity = '0';
            card.style.transform = 'translate3d(0, 20px, 0)';
            card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            
            observer.observe(card);
        });
    }
    
    // Add keyboard navigation for project cards
    projectCards.forEach(projectCard => {
        const card = projectCard.container;
        const buttons = card.querySelectorAll('.project-card__btn');
        
        buttons.forEach(button => {
            // Skip disabled buttons
            if (button.hasAttribute('disabled')) return;
            
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
        
        // Add card hover effect on focus
        const focusableElements = card.querySelectorAll('a:not([disabled]), button:not([disabled])');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                card.classList.add('project-card--focused');
            });
            
            element.addEventListener('blur', () => {
                card.classList.remove('project-card--focused');
            });
        });
    });
    
    // Add click tracking for analytics (if needed)
    const trackProjectClick = (projectName, actionType) => {
        if (window.gtag) {
            window.gtag('event', 'project_interaction', {
                'project_name': projectName,
                'action_type': actionType
            });
        }
        console.log(`Project interaction: ${projectName} - ${actionType}`);
    };
    
    // Set up click tracking for project buttons
    projectCards.forEach(projectCard => {
        const card = projectCard.container;
        const projectTitle = card.querySelector('.project-card__title')?.textContent || 'Unknown';
        const buttons = card.querySelectorAll('.project-card__btn:not([disabled])');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const actionType = button.textContent.trim().toLowerCase();
                trackProjectClick(projectTitle, actionType);
            });
        });
    });
    
    console.log('Projects section initialized');
}

// CSS for fallback content and loading states
const fallbackStyles = `
.project-card__image-fallback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-bg-alt), #e9ecef);
}

.project-card__fallback-content {
    text-align: center;
    color: var(--color-text-light);
}

.project-card__fallback-icon {
    display: block;
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.7;
}

.project-card__fallback-text {
    font-weight: 600;
    font-size: 1.125rem;
}

.project-card__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    z-index: 5;
}

.project-card__loading-content {
    text-align: center;
    color: white;
}

.project-card__loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

.project-card__loading-text {
    font-weight: 600;
    font-size: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.project-card--focused {
    transform: translate3d(0, -4px, 0);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.1);
}

/* Loading State Classes */
.project-card.is-loading {
    opacity: 0.8;
}

.project-card.is-loading .project-card__img {
    opacity: 0.5;
}

.project-card.is-loaded {
    opacity: 1;
    animation: cardLoadIn 0.3s ease-out;
}

.project-card.is-error .project-card__img {
    opacity: 0.3;
}

@keyframes cardLoadIn {
    from {
        opacity: 0.8;
        transform: translate3d(0, 5px, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
`;

// Inject styles
const style = document.createElement('style');
style.textContent = fallbackStyles;
document.head.appendChild(style); 