// Detectăm dacă suntem pe un dispozitiv mobil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Funcție pentru animația de intrare optimizată pentru mobile
function animateEntry(element, delay) {
    // Setăm poziția și opacitatea inițială
    element.style.opacity = '0';
    element.style.transform = 'translateX(-100%)';
    element.style.filter = 'blur(10px)';
    
    // Ajustăm tranziția în funcție de dispozitiv
    element.style.transition = `all ${isMobile ? '0.3s' : '0.5s'} cubic-bezier(0.4, 0, 0.2, 1)`;

    // Forțăm un reflow pentru a aplica stilurile inițiale
    element.offsetHeight;

    // Programăm animația
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        element.style.filter = 'blur(0)';
    }, delay);
}

// Așteptăm încărcarea completă a documentului
document.addEventListener('DOMContentLoaded', () => {
    // Selectăm toate secțiunile
    const sections = document.querySelectorAll('.security-section, .protection-section, .ecommerce-section, .maintenance-section');
    
    // Animăm intrarea secțiunilor
    sections.forEach((section, index) => {
        const delay = isMobile ? index * 300 : index * 500; // Delay mai scurt pe mobile
        animateEntry(section, delay);
    });

    // Adăugăm efecte de hover 3D doar pe desktop
    if (!isMobile) {
        sections.forEach(section => {
            section.addEventListener('mousemove', (e) => {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                section.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
                section.style.transition = 'transform 0.1s';
                
                const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,0.2) 0%, rgba(0,229,255,0) 50%)`;
                section.style.backgroundImage = shine;
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                section.style.backgroundImage = 'none';
                section.style.transition = 'all 0.5s ease';
            });
        });
    }

    // Optimizăm efectele pentru mobile
    if (isMobile) {
        // Adăugăm efecte de touch pentru secțiuni
        sections.forEach(section => {
            let touchStartY = 0;
            let touchStartTime = 0;

            section.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
                touchStartTime = Date.now();
                
                // Efect de apăsare
                section.style.transform = 'scale(0.98)';
                section.style.transition = 'transform 0.2s ease';
                
                // Adăugăm strălucire la atingere
                section.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.3)';
            });

            section.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].clientY;
                const deltaY = touchY - touchStartY;

                // Prevenim scroll-ul dacă utilizatorul încearcă să interacționeze cu secțiunea
                if (Math.abs(deltaY) < 10) {
                    e.preventDefault();
                }
            }, { passive: false });

            section.addEventListener('touchend', (e) => {
                const touchEndTime = Date.now();
                const touchDuration = touchEndTime - touchStartTime;

                // Resetăm stilurile cu o întârziere pentru un efect mai plăcut
                setTimeout(() => {
                    section.style.transform = 'scale(1)';
                    section.style.boxShadow = 'none';
                }, touchDuration < 300 ? 200 : 0);

                // Adăugăm un efect de undă la atingere
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(0, 229, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    animation: rippleEffect 0.6s ease-out;
                `;
                
                section.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Optimizăm scroll-ul pentru mobile
        const content = document.querySelector('.content');
        let lastScrollTop = 0;
        let scrollTimeout;

        content.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            
            const st = content.scrollTop;
            const isScrollingDown = st > lastScrollTop;
            
            // Actualizăm bara de progres mai eficient
            scrollTimeout = setTimeout(() => {
                const progress = (st / (content.scrollHeight - content.clientHeight)) * 100;
                progressBar.style.height = `${progress}%`;
                progressBar.style.opacity = '1';
            }, 50);

            lastScrollTop = st;
        }, { passive: true });

        // Adăugăm feedback haptic pentru interacțiuni (dacă este disponibil)
        const provideHapticFeedback = () => {
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        };

        // Aplicăm feedback haptic la interacțiuni
        sections.forEach(section => {
            section.addEventListener('touchstart', provideHapticFeedback);
        });
    }

    // Adăugăm contor de timp pentru mentenanță
    const maintenanceSection = document.querySelector('.maintenance-section');
    if (maintenanceSection) {
        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'maintenance-timer';
        timeDisplay.style.cssText = `
            margin-top: 1rem;
            padding: 0.5rem;
            border-top: 1px solid rgba(0, 229, 255, 0.2);
            font-size: ${isMobile ? '0.8rem' : '0.9rem'};
            color: #00e5ff;
            text-align: right;
        `;
        maintenanceSection.appendChild(timeDisplay);

        // Actualizăm timpul mai rar pe mobile pentru performanță
        setInterval(() => {
            const now = new Date();
            timeDisplay.textContent = `Ultima verificare: ${now.toLocaleTimeString()}`;
        }, isMobile ? 5000 : 1000);
    }

    // Optimizăm bara de progres pentru mobile
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: ${isMobile ? '3px' : '5px'};
        height: 0;
        background: linear-gradient(to bottom, #00e5ff, rgba(0,229,255,0.5));
        transition: height 0.2s;
    `;
    document.body.appendChild(progressBar);

    // Adăugăm efecte de pulsație pentru titluri
    const titles = document.querySelectorAll('h2');
    titles.forEach(title => {
        title.addEventListener('click', () => {
            title.style.animation = 'titlePulse 0.5s ease';
            setTimeout(() => {
                title.style.animation = '';
            }, 500);
        });
    });

    // Adăugăm animație pentru textul din paragrafe
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.addEventListener('mouseover', () => {
            p.style.transform = 'scale(1.01)';
            p.style.transition = 'transform 0.3s ease';
        });
        
        p.addEventListener('mouseout', () => {
            p.style.transform = 'scale(1)';
        });
    });
});

// Adăugăm stiluri pentru animații
const style = document.createElement('style');
style.textContent = `
    @keyframes titlePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
