/** @format */

// ---- HOME ----

let slideIndex = 0;
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
	timer = setTimeout(showSlides, 10000);
}

function MoveSlides(n) {
	clearTimeout(timer);
	SlidesButtons((slideIndex += n));
	timer = setTimeout(showSlides, 10000);
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

document.addEventListener('DOMContentLoaded', () => {
	const objects = document.getElementsByClassName('async-image');
	Array.from(objects).map((item) => {
		const img = new Image();
		img.src = item.dataset.src;
		img.onload = () => {
			item.classList.remove('asyncImage');
			return item.nodeName === 'IMG'
				? (item.src = item.dataset.src)
				: (item.style.backgroundImage = `url(${item.dataset.src})`);
		};
	});

	SlidesButtons(slideIndex);
	showSlides();
});
