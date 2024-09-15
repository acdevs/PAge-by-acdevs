const cursor = document.querySelector('.cursor');
const container = document.querySelector('.container');

document.addEventListener('mousemove', (event) => setTimeout(() => {
    const xAxis = -(window.innerWidth / 2 - event.clientX) / 69;
    const yAxis = (window.innerHeight / 2 - event.clientY) / 69;
    cursor.style.transform = `translate3d(${(event.clientX)}px, ${event.clientY}px, 320px)`
    container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}));

document.documentElement.addEventListener('mouseenter', (event) => {
    container.classList.remove('container-focus-lost')
    cursor.style.transform = `translate3d(${(event.clientX)}px, ${event.clientY}px, 320px)`
    cursor.style.display = 'block';
})

document.documentElement.addEventListener('mouseleave', () => setTimeout(() => {
    cursor.style.display = 'none';
    container.classList.add('container-focus-lost');
    container.style.transform = 'unset';
}))