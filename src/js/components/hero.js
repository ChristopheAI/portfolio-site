// Hero Section Component

export function initHero() {
    const heroImage = document.querySelector('.hero__image');
    const heroFallback = document.querySelector('.hero__avatar-fallback');
    
    if (!heroImage || !heroFallback) return;
    
    // Handle image loading
    function handleImageLoad() {
        heroImage.style.opacity = '1';
        heroFallback.style.zIndex = '-1';
    }
    
    function handleImageError() {
        heroImage.style.opacity = '0';
        heroFallback.style.zIndex = '1';
        console.log('Hero image failed to load, showing fallback');
    }
    
    // Set up image loading handlers
    if (heroImage.complete) {
        if (heroImage.naturalWidth === 0) {
            handleImageError();
        } else {
            handleImageLoad();
        }
    } else {
        heroImage.addEventListener('load', handleImageLoad);
        heroImage.addEventListener('error', handleImageError);
    }
    
    // Add scroll-based animations (optional enhancement)
    function handleScroll() {
        const scrollY = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection) return;
        
        const heroHeight = heroSection.offsetHeight;
        const scrollPercent = Math.min(scrollY / heroHeight, 1);
        
        // Subtle parallax effect for hero content
        const heroContent = document.querySelector('.hero__content');
        if (heroContent && scrollPercent < 1) {
            const translateY = scrollPercent * 20; // Subtle movement
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
        
        // Fade out scroll indicator
        const scrollIndicator = document.querySelector('.hero__scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(1 - scrollPercent * 2, 0);
            scrollIndicator.style.opacity = opacity;
        }
    }
    
    // Throttled scroll handler for performance
    let ticking = false;
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Only add scroll effects if user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', requestScrollUpdate);
        handleScroll(); // Initial call
    }
    
    // Add keyboard navigation for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero__cta');
    ctaButtons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    console.log('Hero section initialized');
} 