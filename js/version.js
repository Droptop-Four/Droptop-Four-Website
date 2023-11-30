/** @format */

// ---- DYNAMIC VERSION ----

const versiontag = document.getElementById('droptop-version');

async function getVersion() {
	try {
		let result = await fetch(
			'https://raw.githubusercontent.com/Droptop-Four/GlobalData/v3/data/version.json'
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
