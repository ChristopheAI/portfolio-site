// Main JavaScript Entry Point

// Import modules
import { initNavigation } from './components/navigation.js';
import { initSmoothScroll } from './components/smoothScroll.js';
import { initHero } from './components/hero.js';
import { initProjects } from './components/projects.js';

// Import smooth scroll functionality
import './components/smoothScroll.js';

// Video Lazy Loading Implementation
function initVideoLazyLoading() {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const sources = video.querySelectorAll('source[data-src]');
                
                // Load video sources
                sources.forEach(source => {
                    source.src = source.dataset.src;
                    source.removeAttribute('data-src');
                });
                
                // Load main video src if exists
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                }
                
                // Load the video
                video.load();
                
                // Stop observing this video
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before video enters viewport
    });

    // Observe all lazy videos
    document.querySelectorAll('video.lazy-video').forEach(video => {
        videoObserver.observe(video);
    });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized');
    
    // Initialize components
    initNavigation();
    initSmoothScroll();
    initHero();
    initProjects();
    initVideoLazyLoading(); // Initialize video lazy loading
    
    // Log performance metrics in development
    if (import.meta.env.DEV) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime, 'ms');
        });
    }
}); 