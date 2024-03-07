/** @format */

// ---- CHANGELOG ----

const changenotesList = document.getElementById('changenotesList');

class Changenotes {
	async Items() {
		try {
			let result = await fetch(
				'https://api.droptopfour.com/v1/changelog'
			);
			let data = await result.json();

			let changenotesItems = data;

			if (changenotesItems.length > 0) {
				const { version, new_features, modifications, bug_fixes } =
					changenotesItems[0];

				return [
					{
						version,
						new_features,
						modifications,
						bug_fixes,
					},
				];
			} else {
				return []; // Return an empty array if no changenotes are available
			}
		} catch (error) {
			console.log(error);
		}
	}
}

class DisplayChangenotes {
	displayChangenotes(changenotes) {
		let result = '';
		if (changenotes.length > 0) {
			const item = changenotes[0];
			result += `
            <div class="changenote-card">
                <h2 class="changenote-title"><a class="link" href="https://github.com/Droptop-Four/Droptop-Four/releases/tag/v${
					item.version
				}" target="_blank">Droptop Four v${item.version}</a></h2>
                ${
					item.new_features && item.new_features.length > 0
						? `<div>🆕 New Features: 
                        <ul>${item.new_features
							.map((feature) => `<li>${feature}</li>`)
							.join('')}</ul>
                    </div>`
						: ''
				}
                ${
					item.modifications && item.modifications.length > 0
						? `<div>⚠️ Modifications: 
                        <ul>${item.modifications
							.map((modification) => `<li>${modification}</li>`)
							.join('')}</ul>
                    </div>`
						: ''
				}
                ${
					item.bug_fixes && item.bug_fixes.length > 0
						? `<div>🪲 Bug Fixes: 
                        <ul>${item.bug_fixes
							.map((bugFix) => `<li>${bugFix}</li>`)
							.join('')}</ul>
                    </div>`
						: ''
				}
            </div>
            `;
		}
		changenotesList.innerHTML = result;
	}
}

// ---- MAIN ----

document.addEventListener('DOMContentLoaded', () => {
	const changenotes = new Changenotes();
	const displaychangenotes = new DisplayChangenotes();

	changenotes
		.Items()
		.then((changenotes) =>
			displaychangenotes.displayChangenotes(changenotes)
		);
});
