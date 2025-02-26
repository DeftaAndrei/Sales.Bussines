/* filepath: /c:/Users/Andrei-RobertDEFTA/Desktop/Vanzare siteuri/button1/button7/button7.js */
document.addEventListener('DOMContentLoaded', function() {
    // Wrap service sections in a grid container
    const servicesContainer = document.createElement('div');
    servicesContainer.className = 'services-grid';
    const serviceSections = document.querySelectorAll('.service-section');
    serviceSections.forEach(section => {
        const parent = section.parentNode;
        servicesContainer.appendChild(section);
    });
    document.querySelector('.intro').after(servicesContainer);

    // Add click handlers for accordions
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.icon');
            
            // Toggle active class
            content.classList.toggle('active');
            
            // Update icon
            icon.textContent = content.classList.contains('active') ? '−' : '+';
            
            // Animate height
            if (content.classList.contains('active')) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });

    // Add hover effects
    serviceSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});