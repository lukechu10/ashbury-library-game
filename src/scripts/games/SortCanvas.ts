import * as PIXI from 'pixi.js';
import { LitElement, TemplateResult, html, customElement, css, CSSResult, query } from 'lit-element';
import '@webcomponents/shadydom';

@customElement('sort-canvas')
export class SortCanvas extends LitElement {
	@query('#sort-canvas')
	private canvas!: HTMLCanvasElement;

	private app!: PIXI.Application;
	private loader!: PIXI.Loader;
	private resources!: PIXI.IResourceDictionary;
	private stage!: PIXI.Container;
	private interactionManager!: PIXI.InteractionManager;

	public static get styles(): CSSResult {
		return css`
			#sort-canvas {
				position: fixed;
				top: 0;
				width: 100%;
				height: 100%;
			
				z-index: -1;
			}
		`;
	}

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

		await this.loadAssets();

		this.setup();
	}

	private loadAssets(): Promise<void> {
		return new Promise<void>(resolve => {
			this.loader = new PIXI.Loader();
			this.loader.add('/images/games/sort/wood-bg.png').load(() => resolve());
		});
	}

	private setup(): void {
		this.resources = this.loader.resources;

		const sprite = new PIXI.TilingSprite(
			this.resources['/images/games/sort/wood-bg.png'].texture, this.app.view.width, 205);
		sprite.position.y = 96;
			
		this.stage.addChild(sprite);
	} 
}
