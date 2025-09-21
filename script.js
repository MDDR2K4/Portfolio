document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', e => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
    });

    // Updated to include new interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .cert-item-3d, .flip-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // ===== 2. TYPEWRITER EFFECT =====
    const typewriterSpan = document.querySelector('.typewriter');
    if (typewriterSpan) {
        const typewriter = new Typewriter(typewriterSpan, {
            loop: true,
            delay: 75,
        });

        typewriter
            .pauseFor(1000)
            .typeString('Creative Tech-Enthusiast')
            .pauseFor(2000)
            .deleteChars(24)
            .typeString('Full-Stack Developer')
            .pauseFor(2000)
            .deleteChars(20)
            .typeString('UI/UX Designer')
            .pauseFor(2000)
            .start();
    }

    // ===== 3. NAVBAR, SCROLL-UP BTN & ACTIVE LINK LOGIC =====
    const navbar = document.querySelector('.navbar');
    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    const navLinks = document.querySelectorAll('.menu a');
    const allSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('sticky');
        else navbar.classList.remove('sticky');

        if (window.scrollY > 500) scrollUpBtn.classList.add('show');
        else scrollUpBtn.classList.remove('show');

        let currentSection = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== 4. SCROLL-TRIGGERED ANIMATIONS =====
    const sectionsToAnimate = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const children = entry.target.querySelectorAll('.anim-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.15}s`;
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});