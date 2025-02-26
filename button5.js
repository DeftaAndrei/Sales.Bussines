// Efect de typing pentru titlul "Contact Us"
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Efect de hover 3D pentru cardurile de contact
function init3DEffect() {
    const cards = document.querySelectorAll('.contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Animație de intrare pentru elementele de contact
function animateContactItems() {
    const items = document.querySelectorAll('.contact-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

// Efect de particule în fundal
function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    // Culorile inspirate din imagini
    const colors = [
        'rgba(0, 255, 255, 0.3)',  // Cyan/turcoaz strălucitor
        'rgba(255, 140, 0, 0.2)',  // Portocaliu pentru lumina din imagine
        'rgba(0, 255, 150, 0.2)',  // Verde neon
        'rgba(0, 100, 255, 0.2)',  // Albastru electric
        'rgba(255, 0, 100, 0.2)'   // Roșu neon
    ];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1, // Mărim puțin dimensiunea particulelor
            speedX: Math.random() * 3 - 1.5, // Mărim viteza
            speedY: Math.random() * 3 - 1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.5 + 0.2,
            pulse: Math.random() * 0.1 // Pentru efect de pulsare
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 150; i++) { // Mărim numărul de particule la 150
            particles.push(createParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Actualizăm poziția
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Adăugăm efect de pulsare
            particle.size += Math.sin(Date.now() * 0.01) * particle.pulse;
            
            // Verificăm marginile
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
                particle.color = colors[Math.floor(Math.random() * colors.length)]; // Schimbăm culoarea la coliziune
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
                particle.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            // Desenăm particula cu glow
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = particle.color;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Adăugăm linii între particulele apropiate
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particle.color;
                    ctx.globalAlpha = (100 - distance) / 1000;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.globalAlpha = particle.opacity;
                }
            });
        });
        
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    initParticles();
    animate();
}

// Inițializare când pagina se încarcă
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');
    typeWriter(title, 'Contact Us');
    init3DEffect();
    animateContactItems();
    createParticles();
});
