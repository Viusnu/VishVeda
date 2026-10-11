const customCursor = document.querySelector('.custom-cursor');
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (customCursor && hasFinePointer) {
    document.body.classList.add('custom-cursor-active');
    window.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        customCursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        customCursor.classList.add('is-visible');
        const target = event.target instanceof Element ? event.target : null;
        customCursor.classList.toggle('is-large', Boolean(target?.closest('a, button, [role="button"], input[type="button"], input[type="submit"]')));
    }, { passive: true });
    window.addEventListener('pointerleave', () => customCursor.classList.remove('is-visible'));
}