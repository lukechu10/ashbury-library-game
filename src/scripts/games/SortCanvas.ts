import { css, customElement, html, LitElement, query, TemplateResult } from 'lit-element';
import * as PIXI from 'pixi.js';

@customElement('sort-canvas')
export class SortCanvas extends LitElement {
	@query('#sort-canvas')
	private canvas!: HTMLCanvasElement;

	private app!: PIXI.Application;
	private stage!: PIXI.Container;
	private loader = PIXI.Loader.shared;
	private interactionManager!: PIXI.InteractionManager;

	private static assetsLoaded = false; // true if assets have already been loaded

	public static styles = css`
		#sort-canvas {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
		
			z-index: -1;
		}
	`;

	public render(): TemplateResult {
		return html`
			<canvas id="sort-canvas"></canvas>
		`;
	}

	public async firstUpdated(): Promise<void> {
		const type = PIXI.utils.isWebGLSupported() ? 'webgl' : 'canvas';
		PIXI.utils.sayHello(type);

		this.app = new PIXI.Application({
			view: this.canvas,
			resolution: 1
		});
		this.stage = this.app.stage; // add alias
		this.interactionManager = new PIXI.InteractionManager(this.app.renderer);

		this.app.renderer.backgroundColor = 0xffffff; // set white background

		//#region load assets
		if (!SortCanvas.assetsLoaded) {
			this.loader
				.add('woodBg', '/images/games/sort/wood-bg.png')
				.load(() => {
					SortCanvas.assetsLoaded = true; // update assets loaded state
					this.setup();
				});
		}
		else {
			this.setup();
		}
		//#endregion
	}

	private setup(): void {		
		const woodBgSprite = new PIXI.TilingSprite(
			this.loader.resources.woodBg.texture, this.app.view.width, 205);
		woodBgSprite.position.y = 96;
			
		this.stage.addChild(woodBgSprite);
	}


}
