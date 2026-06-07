document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger
        mobileBtn.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(entry.target.classList.contains('reveal') ? 'active' : 'appear');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
    fadeElements.forEach(el => revealObserver.observe(el));

    // 3b. Flores decoration reveal on scroll
    const floresElements = document.querySelectorAll('.flores-decoration');
    const floresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('flores-visible');
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    floresElements.forEach(el => floresObserver.observe(el));

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const answer = item.nextElementSibling;
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 5. Interactivo: Antes y Después Slider MEJORADO
    const baSlider = document.getElementById('ba-slider');
    const baHandle = document.getElementById('ba-handle');
    const imgBefore = document.getElementById('img-before');
    const baPercentage = document.getElementById('ba-percentage');

    if (baSlider && baHandle && imgBefore) {
        let isDragging = false;
        
        const moveSlider = (clientX) => {
            const sliderRect = baSlider.getBoundingClientRect();
            // Calculate percentage
            let position = ((clientX - sliderRect.left) / sliderRect.width) * 100;
            
            // Constrain position between 0 and 100%
            position = Math.max(0, Math.min(position, 100));
            
            baHandle.style.left = `${position}%`;
            imgBefore.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            
            // Actualizar el display del porcentaje
            if (baPercentage) {
                baPercentage.textContent = `${Math.round(position)}%`;
            }
        };

        // Mouse events
        baHandle.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (isDragging) moveSlider(e.clientX);
        });

        // Touch events
        baHandle.addEventListener('touchstart', () => isDragging = true, {passive: true});
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (isDragging) moveSlider(e.touches[0].clientX);
        }, {passive: true});
        
        // Click to move on slider
        baSlider.addEventListener('click', (e) => {
             if (e.target !== baHandle && !baHandle.contains(e.target)) moveSlider(e.clientX);
        });
        
        // Animación de pulse inicial
        setTimeout(() => {
            baHandle.style.animation = 'none';
        }, 4000);
    }

    // 6. Floating Assistant Toggle
    const assistantIcon = document.querySelector('.assistant-icon');
    const assistantContent = document.querySelector('.assistant-content');
    const closeAssistant = document.querySelector('.close-assistant');

    if (assistantIcon && assistantContent) {
        assistantIcon.addEventListener('click', () => {
            assistantContent.classList.toggle('show');
            assistantIcon.style.animation = assistantContent.classList.contains('show') ? 'none' : 'pulse 2s infinite';
        });

        closeAssistant.addEventListener('click', () => {
            assistantContent.classList.remove('show');
            assistantIcon.style.animation = 'pulse 2s infinite';
        });
        
        // Auto-show after 5 seconds
        setTimeout(() => {
             if(!assistantContent.classList.contains('show')){
                 assistantContent.classList.add('show');
                 assistantIcon.style.animation = 'none';
             }
        }, 5000);
    }
});
