// entrypoint for sort.html

// styles
import '../../styles/games/sort.scss';

import { sortCanvasInstance } from './SortCanvas';

console.log('Created PIXI.Application instance: ', sortCanvasInstance);

document.querySelector('#validate-btn')!.addEventListener('click', event => {
	event.preventDefault();
});