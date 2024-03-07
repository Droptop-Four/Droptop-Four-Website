/** @format */

// ---- DOWNLOAD COUNTER ----

const downloadstag = document.getElementById('download-count');
const salestag = document.getElementById('sales-count');

async function getDownloads() {
	try {
		let result = await fetch('https://api.droptopfour.com/v1/downloads');
		let data = await result.json();
		let downloads = data.basic_downloads;
		let sales = data.supporter_downloads;
		downloadstag.innerHTML += `Downloaded ${downloads} times`;
		salestag.innerHTML += `Downloaded ${sales} times`;
	} catch (error) {
		console.log(error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	getDownloads();
});
