document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul.nav-links');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const carouselList = document.querySelector(".carousel-list");
    const carouselItems = document.querySelectorAll(".carousel-item");
    let currentIndex = 0;

    // Función para ir al testimonio anterior
    function prevTestimonial() {
        currentIndex = currentIndex <= 0 ? carouselItems.length - 1 : currentIndex - 1;
        updateCarousel();
    }

    // Función para ir al testimonio siguiente
    function nextTestimonial() {
        currentIndex = currentIndex >= carouselItems.length - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    }

    // Función para actualizar el carrusel
    function updateCarousel() {
        const newPosition = -currentIndex * carouselItems[0].offsetWidth;
        carouselList.style.transform = `translateX(${newPosition}px)`;
    }

    // Asignar eventos a los botones de navegación
    document.querySelector(".nav-btn.prev").addEventListener("click", prevTestimonial);
    document.querySelector(".nav-btn.next").addEventListener("click", nextTestimonial);

    // Intervalo para cambiar automáticamente el testimonio cada 5 segundos
    setInterval(nextTestimonial, 5000);
});

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
});

// Selecciona el botón de menú
const menuToggle = document.querySelector('.menu-toggle');

// Agrega un listener para el evento de clic
menuToggle.addEventListener('click', function() {
    // Cambia la clase del botón de menú cuando se hace clic
    this.classList.toggle('open');
});

