// entrypoint for sort.html

// styles
import '../../styles/games/sort.scss';

import { SortCanvas } from './SortCanvas';
import { sortState } from './SortState';

const validateButton = document.querySelector<HTMLButtonElement>('#validate-btn')!; // alias

const sortCanvasInstance = new SortCanvas();
console.log('Created PIXI.Application instance: ', sortCanvasInstance);

let score = 100;
// setup timer
const timerStart = Date.now();
setInterval(() => {
	// update timer
	const duration = Date.now() - timerStart;
	document.querySelector('#time-counter')!.textContent = `Temps: ${Math.round(duration / 100) / 10}s`;
}, 100);

function updateScore(): void {
	document.querySelector('#score-counter')!.textContent = `Score: ${score}`;
}

validateButton.addEventListener('click', event => {
	if (sortState.isCorrectlySorted(5)) {
		// correct
		validateButton.classList.add('btn-success');

		setTimeout(() => {
			location.href = '/'; // navigate to home
		}, 1000);
	}
	else {
		// wrong
		validateButton.classList.add('btn-error');
		validateButton.disabled = true;
		setTimeout(() => {
			validateButton.classList.remove('btn-error');
			validateButton.disabled = false;
		}, 2000); // must wait 2 seconds before validating again
			
		score = Math.max(score - 10, 0); // score cannot go under 0
		updateScore();

		event.preventDefault();
	}
});

