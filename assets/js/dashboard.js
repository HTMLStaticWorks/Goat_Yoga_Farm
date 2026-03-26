document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcons('light');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        });
    }

    // 2. RTL Toggle
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

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if(sidebar.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
                hamburger.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
        
        // Prevent clicks inside sidebar from closing it
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 4. Active Nav State
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});
