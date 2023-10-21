/** @format */

// ---- COMMUNITY APPS ----

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let id_query = params.id;

const appsList = document.getElementById('appsList');

class Apps {
	async Items() {
		try {
			let result = await fetch(
				'https://raw.githubusercontent.com/Droptop-Four/GlobalData/v3/data/community_apps/community_apps.json'
			);
			let data = await result.json();

			let appsItems = data.apps;

			appsItems = appsItems.map((item) => {
				const {
					id,
					name,
					author,
					author_link,
					desc,
					version,
					official_link,
					direct_download_link,
					secondary_link,
					image_url,
					hidden,
				} = item.app;

				return {
					id,
					name,
					author,
					author_link,
					desc,
					version,
					official_link,
					direct_download_link,
					secondary_link,
					image_url,
					hidden,
				};
			});
			return appsItems;
		} catch (error) {
			console.log(error);
		}
	}
}

class DisplayApps {
	displayApps(apps) {
		let result = '';
		apps.forEach((item) => {
			if (item.hidden != 1) {
				if (item.author_link == '') {
					if (item.official_link == '') {
						result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <a><img href="javascript:void(0)" onclick="openImageModal('${item.image_url}', '${item.name}'); return false" class="app-card-image" src="${item.image_url}" alt="${item.name} image"></a>
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
					} else {
						result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <a><img href="javascript:void(0)" onclick="openImageModal('${item.image_url}', '${item.name}'); return false" class="app-card-image" src="${item.image_url}" alt="${item.name} image"></a>
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                      <a class="app-card-button" href="${item.official_link}" target="_blank">See on Github</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
					}
				} else {
					if (item.official_link == '') {
						result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <a><img href="javascript:void(0)" onclick="openImageModal('${item.image_url}', '${item.name}'); return false" class="app-card-image" src="${item.image_url}" alt="${item.name} image"></a>
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link" href="${item.author_link}">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
					} else {
						result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <a><img href="javascript:void(0)" onclick="openImageModal('${item.image_url}', '${item.name}'); return false" class="app-card-image" src="${item.image_url}" alt="${item.name} image"></a>
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link" href="${item.author_link}">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                      <a class="app-card-button" href="${item.official_link}" target="_blank">See on Github</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
					}
				}
			}
		});
		appsList.innerHTML = result;
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
	const apps = new Apps();
	const displayapps = new DisplayApps();

	apps.Items()
		.then((apps) => displayapps.displayApps(apps))
		.then(Scroll);
});
