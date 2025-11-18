/** @format */

// ---- DYNAMIC VERSION ----

const versiontag = document.getElementById('droptop-version');

const VERSION_CACHE_KEY = 'droptopVersionCache';
const VERSION_CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

function renderVersion(version) {
	if (!versiontag) return;
	const existing = versiontag.querySelector('.droptop-version-value');
	if (existing) existing.remove();
	const a = document.createElement('a');
	a.className = 'droptop-version-value';
	a.textContent = version;
	versiontag.appendChild(a);
}

function getCachedVersion() {
	try {
		const raw = localStorage.getItem(VERSION_CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed.version) return null;
		if (parsed.ts && Date.now() - parsed.ts > VERSION_CACHE_TTL)
			return null;
		return parsed.version;
	} catch (e) {
		console.error(e);
	}
}

async function fetchAndUpdateVersion() {
	try {
		const res = await fetch('https://api.droptopfour.com/v1/version');
		if (!res.ok) throw new Error('Network response not ok');
		const data = await res.json();
		const version = data.version;
		if (version) {
			const current = versiontag?.querySelector(
				'.droptop-version-value'
			)?.textContent;
			if (current !== version) renderVersion(version);
			localStorage.setItem(
				VERSION_CACHE_KEY,
				JSON.stringify({ version, ts: Date.now() })
			);
		}
	} catch (error) {
		console.log(error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const cached = getCachedVersion();
	if (cached) renderVersion(cached);
	fetchAndUpdateVersion();
});
