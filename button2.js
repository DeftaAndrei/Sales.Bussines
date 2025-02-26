
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      
        if (entry.isIntersecting) {
          
            setTimeout(() => {
                entry.target.classList.add('show');
            }, 100);
            
           
            observer.unobserve(entry.target);
        }
    });
}, {

    threshold: 0.1,

    rootMargin: "-10px"
});


document.addEventListener('DOMContentLoaded', () => {

    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
    
    hiddenElements.forEach((el) => {
        observer.observe(el);
    });

  
    setTimeout(() => {
        const scrollPosition = window.scrollY;
        hiddenElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('show');
            }
        });
    }, 200);
});
