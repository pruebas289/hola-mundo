// ===== PRELOADER =====
(function() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloaderFill');
    if (!preloader) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 400);
        }
        if (fill) fill.style.width = progress + '%';
    }, 150);

    // Fallback
    setTimeout(() => {
        clearInterval(interval);
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 3500);
})();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
let ticking = false;

function handleScroll() {
    const scrollY = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 40);
    if (backToTop) backToTop.classList.toggle('show', scrollY > 400);
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
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    if (navToggle) navToggle.classList.add('active');
    if (navMenu) navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
}
function closeMenu() {
    if (navToggle) navToggle.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) closeMenu();
        else openMenu();
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
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
        const content = document.getElementById(target);
        if (content) content.classList.add('active');
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

console.log('🦐 Mr. Ma-Rez · Listo');