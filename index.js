document.addEventListener('DOMContentLoaded', () => {
    // Animație pentru textul din header
    const animateText = () => {
        const title = document.querySelector('h1');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${i * 0.1}s`;
            title.appendChild(span);
            
            requestAnimationFrame(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        });
    };

    // Smooth scroll pentru butoane de navigare
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (!element) return;

        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    };

    // Detector de scroll pentru animații la scroll
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    };

    // Loading state pentru butoane
    const initializeButtons = () => {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const btn = e.currentTarget;
                btn.classList.add('loading');
                
                // Simulare loading state
                setTimeout(() => {
                    btn.classList.remove('loading');
                }, 1000);
            });
        });
    };

    // Mobile menu toggle
    const initializeMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    };

    // Dark mode toggle
    const initializeDarkMode = () => {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (!darkModeToggle) return;

        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    };

    // Performance optimization
    const optimizePerformance = () => {
        if ('connection' in navigator) {
            if (navigator.connection.saveData) {
                // Disable animations for data saver mode
                document.body.classList.add('reduce-motion');
            }
        }
    };

    // Initialize all features
    animateText();
    observeElements();
    initializeButtons();
    initializeMobileMenu();
    initializeDarkMode();
    optimizePerformance();
});