const slider = document.querySelector('.slider');
const images = [
    'image/coche1.jpg',
    'image/coche2.jpg',
    'image/coche3.jpg',
    'image/coche4.jpg',
    'image/coche5.jpg'
];

let currentIndex = 0;

// Cargar imágenes dinámicamente
images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    slider.appendChild(img);
});

function updateSlider() {
    const width = slider.clientWidth;
    slider.style.transform = `translateX(-${currentIndex * width}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

// Ajustar el slider al cargar la página
window.addEventListener('resize', updateSlider);
updateSlider();