// Navigation Component

export function initNavigation() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    const links = document.querySelectorAll('.nav__link');
    
    if (!toggle || !menu) return;
    
    // Toggle mobile menu
    toggle.addEventListener('click', () => {
        menu.classList.toggle('nav__menu--active');
        toggle.classList.toggle('nav__toggle--active');
    });
    
    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('nav__menu--active');
            toggle.classList.remove('nav__toggle--active');
        });
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('nav__link--active');
            } else {
                navLink?.classList.remove('nav__link--active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Initial check
} 