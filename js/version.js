/** @format */

// ---- DYNAMIC VERSION ----

const versiontag = document.getElementById('droptop-version');

async function getVersion() {
	try {
		let result = await fetch(
			'https://api.droptopfour.com/v1/version'
		);
		let data = await result.json();
		version = data.version;
	} catch (error) {
		console.log(error);
	}
	document.getElementById('droptop-version').innerHTML += `<a>${version}</a>`;
}

document.addEventListener('DOMContentLoaded', () => {
	getVersion();
});
