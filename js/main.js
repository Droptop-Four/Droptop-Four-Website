/** @format */

// ---- MAIN ----

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/serviceWorker.js');
	});
}

function DownloadBase() {
	window.location.href = '../direct-download?variant=base';
}

function UpdateBase() {
	window.location.href = '../direct-download?variant=update';
}

function Download(version) {
	if (navigator.userAgent.indexOf('Win') != -1) {
		if (version == 'base') {
			DownloadBase();
		} else {
			DroptopAlert(version);
		}
	} else {
		AgentAlert(version);
	}
}

function DroptopAlert(version) {
	Swal.fire({
		title: '<p class="download-alert-title" style="font-weight: 600; font-size: 2rem;">The basic version of Droptop must be installed first!</p>',
		html: '<p class="download-alert-text">Please download and install the basic version of Droptop before installing the supporter version or an update.</p>',
		icon: 'warning',
		imageWidth: 100,
		imageHeight: 100,
		background: '#181820ee',
		backdrop: 'rgba(0,0,0,0.4)',
		confirmButtonColor: '#5AB05B',
		confirmButtonText: 'I have it already',
		showDenyButton: true,
		denyButtonText: 'Get Basic Version',
		denyButtonColor: '#84858A',
		reverseButtons: true,
	}).then((result) => {
		if (result.isConfirmed) {
			if (version == 'supporter') {
				window.open(
					'https://cariboudjan.gumroad.com/l/droptop',
					'_blank'
				);
				Swal.close();
			} else if (version == 'update') {
				UpdateBase();
				Swal.close();
			}
		} else if (result.isDenied) {
			DownloadBase();
			Swal.close();
		}
	});
}

function AgentAlert(version) {
	Swal.fire({
		title: '<p class="agent-alert-title">Incompatible Device</p>',
		html: '<p class="agent-alert-text">Droptop Four only works on Windows devices. Download anyway?</p>',
		icon: 'warning',
		background: '#181820ee',
		backdrop: 'rgba(0,0,0,0.4)',
		confirmButtonColor: '#5AB05B',
		confirmButtonText: 'Download',
		showDenyButton: true,
		denyButtonText: 'Cancel',
	}).then((result) => {
		if (result.isConfirmed) {
			if (version == 'base') {
				DownloadBase();
			} else {
				DroptopAlert(version);
			}
		}
	});
}

let mybutton = document.getElementById('scroll-to-top');

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (
		document.body.scrollTop > 600 ||
		document.documentElement.scrollTop > 600
	) {
		mybutton.style.display = 'block';
	} else {
		mybutton.style.display = 'none';
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function checkAnnouncements() {
	fetch(
		'https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/announcements.json'
	)
		.then((response) => response.json())
		.then((data) => {
			let website_ann = data.website;

			if (website_ann.date != null) {
				let date = website_ann.date;
				let expiration = website_ann.expiration;

				const currentDate = new Date();
				const year = currentDate.getFullYear().toString().slice(-2);
				const month = (currentDate.getMonth() + 1)
					.toString()
					.padStart(2, '0');
				const day = currentDate.getDate().toString().padStart(2, '0');

				const now = `${year}.${month}${day}`;

				if (now >= date) {
					let announcement = website_ann.announcement;
					let type = website_ann.type;

					if (expiration == 'none') {
						const dismissed = sessionStorage.getItem(
							'announcementDismissed'
						);
						if (!dismissed) {
							showFloatingBanner(announcement, type);
						}
					} else if (expiration >= now) {
						const dismissed = sessionStorage.getItem(
							'announcementDismissed'
						);
						if (!dismissed) {
							showFloatingBanner(announcement, type);
						}
					} else if (expiration < now) {
						// Announcement expired
					}
				}
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

function showFloatingBanner(message, type) {
	const bannerContainer = document.createElement('div');
	bannerContainer.id = 'floatingBanner';
	bannerContainer.style.position = 'fixed';
	bannerContainer.style.bottom = '10px';
	bannerContainer.style.right = '10px';
	bannerContainer.style.backgroundColor = '#303842';
	bannerContainer.style.padding = '10px';
	bannerContainer.style.borderRadius = '5px';
	bannerContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
	bannerContainer.style.zIndex = '9999';
	bannerContainer.style.width = '75%';
	bannerContainer.style.maxWidth = '75%';

	const announcementContent = document.createElement('div');
	announcementContent.style.display = 'flex';
	announcementContent.style.alignItems = 'center';

	const icon = document.createElement('span');
	icon.style.display = 'flex';
	icon.style.alignItems = 'center';
	icon.style.marginBottom = '1%';

	const announcementMessage = document.createElement('p');
	announcementMessage.textContent = message;
	announcementMessage.style.color = '#ffffff';
	announcementMessage.style.margin = '0';
	announcementMessage.style.marginLeft = '10px';

	const dismissButton = document.createElement('button');
	dismissButton.textContent = '✕';
	dismissButton.style.position = 'absolute';
	dismissButton.style.top = '10px';
	dismissButton.style.right = '10px';
	dismissButton.style.backgroundColor = 'transparent';
	dismissButton.style.border = 'none';
	dismissButton.style.cursor = 'pointer';
	dismissButton.style.color = '#ffffff';
	dismissButton.style.fontWeight = 'bold';

	if (type == 'important') {
		bannerContainer.style.borderLeft = 'solid 5px red';
		icon.textContent = '🛑';
		icon.style.color = 'red';
	} else if (type == 'warning') {
		bannerContainer.style.borderLeft = 'solid 5px orange';
		icon.textContent = '⚠️';
		icon.style.color = 'orange';
	} else if (type == 'info') {
		bannerContainer.style.borderLeft = 'solid 5px #346ddb';
		icon.textContent = '🛈';
		icon.style.color = '#346ddb';
	}

	announcementContent.appendChild(icon);
	announcementContent.appendChild(announcementMessage);
	bannerContainer.appendChild(dismissButton);
	bannerContainer.appendChild(announcementContent);
	document.body.appendChild(bannerContainer);

	dismissButton.addEventListener('click', dismissFloatingBanner);
}

function dismissFloatingBanner() {
	const bannerContainer = document.getElementById('floatingBanner');
	if (bannerContainer) {
		bannerContainer.remove();
	}
	sessionStorage.setItem('announcementDismissed', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
	checkAnnouncements();
});
