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


const themesList = document.getElementById('slideshow-container');

class Themes {
    async Items() {
        try {
            let result = await fetch('https://raw.githubusercontent.com/Droptop-Four/GlobalData/v3/data/legacy_themes/legacy_themes.json');
            let data = await result.json();
            let themesItems = data.themes;
            themesItems = themesItems.map((item) => {
                const { id, name, webp_url } = item.theme;

                return {
                    id,
                    name,
                    webp_url,
                };
            });
            return themesItems;
        } catch (error) {
            console.log(error);
        }
    }
}

class DisplayThemes {
    displayThemes(themes) {
        let result = '';
        themes.forEach((item) => {
            result += `
          <div class="Slide">
            <div class="theme-number">${item.id} / 22</div>
            <img src="${item.webp_url}" class="fade" style="width: 100%" alt="Droptop Default theme"/>
            <a class="prev fade2" onclick="MoveSlides(-1)">&#10094;</a>
            <div class="theme-name fade2">${item.name}</div>
            <a class="next fade2" onclick="MoveSlides(1)">&#10095;</a>
          </div>
          `;
        });
        themesList.innerHTML = result;
        SlidesButtons(slideIndex)

        showSlides();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themes = new Themes();
    const displaythemes = new DisplayThemes();

    themes
        .Items()
        .then((themes) => displaythemes.displayThemes(themes));
    
});
