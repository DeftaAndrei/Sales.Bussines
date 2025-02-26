document.addEventListener('DOMContentLoaded', () => {
    // Asigurăm funcționarea corectă a video loop
    const video = document.getElementById('myVideo');
    
    // Forțăm loop-ul și în cazul în care atributul HTML nu funcționează
    video.addEventListener('ended', function() {
        video.play();
    });

    // Ne asigurăm că videoclipul pornește și după ce pagina revine din background
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            video.play();
        }
    });

    // Reîncercăm redarea dacă apare vreo eroare
    video.addEventListener('error', function(e) {
        console.error('Error playing video:', e);
        setTimeout(() => video.load(), 1000);
    });

    const form = document.getElementById('projectForm');
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    
    // Actualizare valoare buget
    const updateBudgetValue = (value) => {
        budgetValue.textContent = value;
    };

    budgetSlider.addEventListener('input', (e) => {
        updateBudgetValue(e.target.value);
        
        // Adăugăm un efect de strălucire la modificarea valorii
        budgetValue.style.animation = 'none';
        budgetValue.offsetHeight; // Trigger reflow
        budgetValue.style.animation = 'valueChange 0.5s ease';
    });

    // Validare și trimitere formular
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Verificăm validitatea formularului
        if (!form.checkValidity()) {
            showError('Please fill in all required fields correctly.');
            return;
        }

        // Animație pentru butonul de trimitere
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="btn-text">Sending...</span>
            <span class="btn-shine"></span>
        `;

        // Simulăm trimiterea datelor (aici veți adăuga logica reală de trimitere)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulare delay
            
            // Afișăm mesaj de succes
            showSuccess('We will contact you in 24 hours');
            
            // Resetăm formularul
            form.reset();
            updateBudgetValue(1000); // Resetăm slider-ul la valoarea implicită
            
        } catch (error) {
            showError('An error occurred. Please try again.');
        } finally {
            // Restaurăm butonul
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span class="btn-text">Send Project Request</span>
                <span class="btn-shine"></span>
            `;
        }
    });

    // Funcții helper pentru mesaje :))
    function showSuccess(message) {
        const alert = createAlert('success', message);
        document.querySelector('.form-container').appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    function showError(message) {
        const alert = createAlert('error', message);
        document.querySelector('.form-container').appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    function createAlert(type, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
            z-index: 1000;
        `;
        
        if (type === 'success') {
            alert.style.background = 'rgba(40, 167, 69, 0.9)';
        } else {
            alert.style.background = 'rgba(220, 53, 69, 0.9)';
        }
        
        alert.textContent = message;
        return alert;
    }
});

// Stiluri animatie
const style = document.createElement('style');
style.textContent = `
    @keyframes valueChange {
        0% { transform: scale(1.1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scrollToTop');


    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
