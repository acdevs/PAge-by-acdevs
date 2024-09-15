const container = document.querySelector('.container');

document.addEventListener('mousemove', (event) => setTimeout(() => {
    const xAxis = -(window.innerWidth / 2 - event.clientX) / 80;
    const yAxis = (window.innerHeight / 2 - event.clientY) / 20;
    container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}));

document.documentElement.addEventListener('mouseenter', (event) => {
    container.classList.remove('container-focus-lost')
})

document.documentElement.addEventListener('mouseleave', () => setTimeout(() => {
    container.classList.add('container-focus-lost');
    container.style.transform = 'unset';
}))