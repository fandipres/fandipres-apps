document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    const sunIcon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>`;
    const moonIcon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`;

    const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
        htmlElement.classList.add('dark');
        themeIcon.innerHTML = sunIcon;
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.innerHTML = moonIcon;
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.innerHTML = sunIcon;
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.innerHTML = moonIcon;
        }
    });

    const shareBtn = document.getElementById('shareBtn');
    if (navigator.share) {
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Extra - Asisten Keuangan Pribadi',
                    text: 'Kelola arus kas dan investasi lebih mudah dengan Extra. Segera hadir!',
                    url: window.location.href
                });
            } catch (err) {
            }
        });
    } else {
        shareBtn.style.display = 'none';
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
});