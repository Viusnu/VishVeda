const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nativePageTransitions = window.location.protocol !== 'file:'
    && CSS.supports('view-transition-name: root');

if (!reducedMotion && !nativePageTransitions) {
    document.documentElement.classList.add('page-transition-enter');

    document.addEventListener('click', (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
        if (!link || link.target || link.hasAttribute('download')) return;

        const destination = new URL(link.href, window.location.href);
        if (destination.origin !== window.location.origin || destination.protocol !== window.location.protocol) return;
        if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

        event.preventDefault();
        document.documentElement.classList.remove('page-transition-enter');
        document.documentElement.classList.add('page-transition-leave');
        window.setTimeout(() => window.location.assign(destination.href), 150);
    }, true);
}