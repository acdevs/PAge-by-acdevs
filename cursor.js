const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (event) => setTimeout(() => {
    cursor.style.transform = `translate3d(${(event.clientX)}px, ${event.clientY}px, 320px)`
}));

document.documentElement.addEventListener('mouseenter', (event) => {
    cursor.style.transform = `translate3d(${(event.clientX)}px, ${event.clientY}px, 320px)`
    cursor.style.display = 'block';
})

document.documentElement.addEventListener('mouseleave', () => setTimeout(() => {
    cursor.style.display = 'none';
}));