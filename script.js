// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('hidden'), 500);
    }
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

let lastScrollY = 0;
let ticking = false;

function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }

    // Parallax suave en hero (solo si no es móvil)
    if (window.innerWidth > 768) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - (scrollY / window.innerHeight) * 0.8);
        }
    }

    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// ===== MENÚ MÓVIL =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== TABS DEL MENÚ =====
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.menu-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetContent = document.getElementById(target);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // En móvil, hacer scroll suave hacia el contenido del menú
        if (window.innerWidth <= 768) {
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const offsetTop = menuSection.offsetTop - 80;
                if (window.scrollY > offsetTop + 200) {
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        }

        // Centrar el tab clickeado en la barra horizontal
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
});

// ===== BACK TO TOP =====
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== ANIMACIONES AL SCROLL (con IntersectionObserver) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación a elementos (solo si no es móvil muy pequeño)
if (window.innerWidth > 480) {
    document.querySelectorAll('.menu-item, .gallery-item, .feature, .stat').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.02}s, transform 0.6s ease ${i * 0.02}s`;
        observer.observe(el);
    });
}

// ===== SCROLL SUAVE PARA ANCLAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = window.innerWidth <= 768 ? 70 : 90;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// ===== DETECTAR ORIENTACIÓN Y RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Cerrar menú móvil si cambia a desktop
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// ===== PREVENIR ZOOM EN DOBLE TAP EN iOS =====
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

console.log('🦐 Mr. Ma-Rez Mariscos - Responsive cargado correctamente');