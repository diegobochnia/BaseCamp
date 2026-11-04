const menuToggle = document.querySelector('[data-menu-toggle]');
const menuPrincipal = document.querySelector('#menu-principal');

if (menuToggle && menuPrincipal) {
    const setMenuOpen = (open) => {
        menuPrincipal.classList.toggle('hidden', !open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    menuToggle.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('header')) setMenuOpen(false);
    });

    const desktop = window.matchMedia('(min-width: 64rem)');
    desktop.addEventListener('change', () => setMenuOpen(false));
}
