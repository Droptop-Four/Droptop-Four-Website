/** @format */

// ---- DOWNLOAD COUNTER ----

const downloadstag = document.getElementById('download-count');

async function getDownloads() {
	try {
		let result = await fetch('https://api.droptopfour.com/v1/downloads');
		let data = await result.json();
		downloads = data.basic_downloads;
	} catch (error) {
		console.log(error);
	}
	document.getElementById(
		'download-count'
	).innerHTML += `<a>${downloads}</a> downloads `;
}

document.addEventListener('DOMContentLoaded', () => {
	getDownloads();
});
