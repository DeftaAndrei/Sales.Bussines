document.addEventListener('DOMContentLoaded', function() {
    const benefits = document.querySelectorAll('.benefit-item');
    
    benefits.forEach((benefit, index) => {
        // Adăugăm clasa pentru animație alternativă stânga/dreapta
        benefit.classList.add(index % 2 === 0 ? 'hidden-left' : 'hidden-right');
        // Setăm întârzierea pentru fiecare element
        benefit.style.transitionDelay = `${index * 1.5}s`;
    });

    const title = document.querySelector('.header h1');
    const subtitle = document.querySelector('.header h2');
    
    function animateText(element) {
        const text = element.textContent;
        element.textContent = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            span.className = 'letter-animation';
            element.appendChild(span);
        });
    }

    // Animăm titlul
    animateText(title);
    
    // Adăugăm un observator pentru a detecta când elementele intră în viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    // Observăm fiecare element benefit
    benefits.forEach(benefit => observer.observe(benefit));
});
