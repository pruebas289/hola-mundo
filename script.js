// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('hidden'), 500);
    }
});

// ===== NAVBAR + BACK TO TOP =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

let ticking = false;

function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
        navbar.classList.add('scrolled');
        if (backToTop) backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        if (backToTop) backToTop.classList.remove('show');
    }

    // Parallax suave solo en desktop
    if (window.innerWidth > 768) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - (scrollY / window.innerHeight) * 0.8);
        }
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// ===== MENÚ MÓVIL (CON OVERLAY) =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Cerrar al hacer clic en el overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
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

        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
});

// ===== BACK TO TOP =====
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

// ===== RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }, 250);
});

console.log('🦐 Mr. Ma-Rez Mariscos - Cargado correctamente');