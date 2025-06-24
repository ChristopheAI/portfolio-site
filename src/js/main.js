// Main JavaScript Entry Point

// Import modules
import { initNavigation } from './components/navigation.js';
import { initSmoothScroll } from './components/smoothScroll.js';
import { initHero } from './components/hero.js';
import { initProjects } from './components/projects.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized');
    
    // Initialize components
    initNavigation();
    initSmoothScroll();
    initHero();
    initProjects();
    
    // Log performance metrics in development
    if (import.meta.env.DEV) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime, 'ms');
        });
    }
}); 