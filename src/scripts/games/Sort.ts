// entrypoint for sort.html

// styles
import '../../styles/games/sort.scss';

import data from '../../model/mock.json';

async function ready(): Promise<void> {
	if (location.pathname === '/sort.html') {
		// on sort page
		const { SortCanvas } = await import('./SortCanvas');
		new SortCanvas();
	}
}

document.addEventListener('turbolinks:load', ready);
