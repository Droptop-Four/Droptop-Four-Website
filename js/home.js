// ---- HOME ----

let slideIndex = 1;
let slides = document.getElementsByClassName('Slide');
var timer;

function showSlides() {
    let i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    timer = setTimeout(showSlides, 3500);
}

function MoveSlides(n) {
    clearTimeout(timer);
    SlidesButtons((slideIndex += n));
    timer = setTimeout(showSlides, 3500);
}

function SlidesButtons(n) {
    let i;
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
}


SlidesButtons(slideIndex);

showSlides();
