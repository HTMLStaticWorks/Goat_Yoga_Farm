document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu-wrapper');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Animate hamburger to X
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle:not(.rtl-toggle)');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcons('dark');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcons(newTheme);
        });
    });

    function updateToggleIcons(theme) {
        themeToggles.forEach(toggle => {
            if (theme === 'dark') {
                toggle.innerHTML = '☀️'; // Sun icon for light mode switch
            } else {
                toggle.innerHTML = '🌙'; // Moon icon for dark mode switch
            }
        });
    }

    // Set Active Menu Item
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // Form Validation (Basic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Only stop default if it's the contact or auth forms to show visual feedback
            const isAuth = form.closest('.auth-card');
            const isContact = form.closest('.contact-form');
            if (isAuth || isContact) {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Please wait...';
                btn.style.opacity = '0.7';

                setTimeout(() => {
                    btn.textContent = 'Success!';
                    btn.style.backgroundColor = 'var(--primary)';

                    setTimeout(() => {
                        if (isAuth) {
                            window.location.href = 'dashboard.html';
                        } else {
                            btn.textContent = originalText;
                            btn.style.opacity = '1';
                            form.reset();
                        }
                    }, 1000);
                }, 1500);
            }
        });
    });

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const savedRtl = localStorage.getItem('rtl');

    if (savedRtl === 'true') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('rtl', newDir === 'rtl' ? 'true' : 'false');
        });
    });
});
