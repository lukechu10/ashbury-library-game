import { customElement, html, LitElement, query, TemplateResult } from 'lit-element';
import '../../styles/games/sort.scss';
import { SortCanvas } from './SortCanvas';
import { sortState } from './SortState';

const difficulties = [
	{
		bookCount: 3, modes: ['alpha', 'dewey']
	},
	{
		bookCount: 4, modes: ['alpha', 'dewey', 'alpha']
	},
	{
		bookCount: 5, modes: ['alpha', 'dewey', 'alpha', 'dewey']
	}
];

@customElement('sort-game-container')
export class SortGameContainer extends LitElement {
	protected createRenderRoot(): this { return this;}

	private score = 100;
	private timeMillis = 0;

	private selectedDifficulty = difficulties[2];

	@query('#sort-canvas') private sortCanvas!: HTMLCanvasElement;
	@query('#validate-btn') private validateBtn!: HTMLButtonElement;

	protected firstUpdated(): void {
		new SortCanvas(this.sortCanvas);

		const timerStart = Date.now();
		setInterval(() => {
			// update timer
			const duration = Date.now() - timerStart;
			document.querySelector('#time-counter')!.textContent = `Temps: ${Math.round(duration / 100) / 10}s`;
		}, 100);
	}

	protected render(): TemplateResult {
		return html`
			<header>
				<span id="time-counter">Temps: ${Math.round(this.timeMillis / 100) / 10}s</span>
				<span id="score-counter">Score: ${this.score}</span>
			</header>
			<button id="validate-btn" class="btn btn-primary" @click=${this.validate}>Valider</button>
			<canvas id="sort-canvas"></canvas>
		`;
	}

	protected validate(event: Event): void {
		if (sortState.isCorrectlySorted(5)) {
			// correct
			this.validateBtn.classList.add('btn-success');

			setTimeout(() => {
				// load next config
				new SortCanvas(this.sortCanvas);
			}, 1000);
		}
		else {
			// wrong
			this.validateBtn.classList.add('btn-error');
			this.validateBtn.disabled = true;

			this.score = Math.max(this.score - 10, 0); // score cannot go under 0
			this.requestUpdate();

			setTimeout(() => {
				this.validateBtn.classList.remove('btn-error');
				this.validateBtn.disabled = false;
			}, 2000); // must wait 2 seconds before attempting to validate again
		}

		event.preventDefault();
	}
}