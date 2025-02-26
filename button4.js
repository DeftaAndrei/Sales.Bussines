document.addEventListener('DOMContentLoaded', () => {
    // Ascunde inițial toate secțiunile
    gsap.set(['.website-section', '.integration-section', '.animation-section', '.innovation-section'], {
        x: -1000,
        opacity: 0
    });

    // Timeline pentru animații secvențiale
    const timeline = gsap.timeline();

    timeline
        .to('.website-section', {
            x: 0,
            opacity: 1,
            duration: 3,
            ease: 'power2.out'
        })
        .to('.integration-section', {
            x: 0,
            opacity: 1,
            duration: 3,
            ease: 'power2.out'
        }, '+=0.5')
        .to('.animation-section', {
            x: 0,
            opacity: 1,
            duration: 3,
            ease: 'power2.out'
        }, '+=0.5')
        .to('.innovation-section', {
            x: 0,
            opacity: 1,
            duration: 3,
            ease: 'power2.out'
        }, '+=0.5');
});