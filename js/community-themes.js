/** @format */

// ---- COMMUNITY THEMES ----

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let id_query = params.id;

const themesList = document.getElementById('themesList');

class Themes {
	async Items() {
		try {
			let result = await fetch(
				'https://raw.githubusercontent.com/Droptop-Four/GlobalData/v3/data/community_themes/community_themes.json'
			);
			let data = await result.json();

			let themesItems = data.themes;

			themesItems = themesItems.map((item) => {
				const {
					id,
					name,
					author,
					author_link,
					desc,
					official_link,
					direct_download_link,
					secondary_link,
					image_url,
					hidden,
				} = item.theme;

				return {
					id,
					name,
					author,
					author_link,
					desc,
					official_link,
					direct_download_link,
					secondary_link,
					image_url,
					hidden,
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
			if (item.hidden != 1) {
				if (item.author_link == '') {
					result += `
          <div>
            <div class="theme-card" id="${item.id}">
              <div class="theme-card-container">
                <a><img href="javascript:void(0)" onclick="openImageModal('${item.image_url}', '${item.name}');  return false" class="theme-card-image" src="${item.image_url}" alt="${item.name} image"></a>
                <h3 class="theme-card-name">${item.name}</h3>
                <p class="theme-card-author">Created by <a class="theme-card-author-link">${item.author}</a></p>
                <p class="theme-card-desc">${item.desc}</p>
                <div class="theme-card-buttons">
                    <a class="theme-card-button bold" href="${item.direct_download_link}">Download</a>
                </div>
              </div>  
            </div>
          </div>
          `;
				} else {
					result += `
          <div>
            <div class="theme-card" id="${item.id}">
              <div class="theme-card-container">
                <a><img href="javascript:void(0)" onclick="openImageModal('${item.image_url}', '${item.name}');  return false" class="theme-card-image" src="${item.image_url}" alt="${item.name} image"></a>
                <h3 class="theme-card-name">${item.name}</h3>
                <p class="theme-card-author">Created by <a class="theme-card-author-link" href="${item.author_link}">${item.author}</a></p>
                <p class="theme-card-desc">${item.desc}</p>
                <div class="theme-card-buttons">
                    <a class="theme-card-button bold" href="${item.direct_download_link}">Download</a>
                </div>
              </div>  
            </div>
          </div>
          `;
				}
			}
		});
		themesList.innerHTML = result;
	}
}

function openImageModal(imageUrl, imageName) {
	const modal = document.createElement('div');
	modal.classList.add('image-modal');
	modal.innerHTML = `
		<div class="image-modal-close" onclick="closeImageModal()">
			<svg width="50" height="50" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
				<line x1="5" y1="5" x2="25" y2="25" stroke="currentColor" stroke-width="2" />
				<line x1="25" y1="5" x2="5" y2="25" stroke="currentColor" stroke-width="2" />
			</svg>
		</div>
		<div class="image-modal-content">
            <img src="${imageUrl}" alt="${imageName}">
        </div>
    `;
	document.body.appendChild(modal);
	disableScroll();

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			closeImageModal();
		}
	});

	modal.addEventListener('click', function (event) {
		if (event.target === modal) {
			closeImageModal();
		}
	});
}

function closeImageModal() {
	const modal = document.querySelector('.image-modal');
	if (modal) {
		enableScroll();
		modal.remove();
		document.removeEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				closeImageModal();
			}
		});
	}
}

var keys = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
	e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

var supportsPassive = false;
try {
	window.addEventListener(
		'test',
		null,
		Object.defineProperty({}, 'passive', {
			get: function () {
				supportsPassive = true;
			},
		})
	);
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
	'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false);
	window.addEventListener(wheelEvent, preventDefault, wheelOpt);
	window.addEventListener('touchmove', preventDefault, wheelOpt);
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function Scroll() {
	const appElement = document.getElementById(id_query);
	if (appElement) {
		appElement.scrollIntoView();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const themes = new Themes();
	const displaythemes = new DisplayThemes();

	themes
		.Items()
		.then((themes) => displaythemes.displayThemes(themes))
		.then(Scroll);
});
