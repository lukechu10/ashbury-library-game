import * as PIXI from 'pixi.js';

export class SortCanvas {
	private app: PIXI.Application;
	private loader!: PIXI.Loader;
	private resources!: PIXI.IResourceDictionary;
	private stage: PIXI.Container;

	/**
	 * Setup #sort-canvas element
	 */
	public constructor() {
		const canvas = (document.querySelector('#sort-canvas') as HTMLCanvasElement);
		const type = PIXI.utils.isWebGLSupported() ? 'webgl' : 'canvas';
		PIXI.utils.sayHello(type);

		this.app = new PIXI.Application({
			view: canvas,
			resolution: 1
		});
		this.stage = this.app.stage; // add alias

		this.app.renderer.backgroundColor = 0xffffff; // set white background

		(async (): Promise<void> => {
			await this.loadAssets();

			this.setup();
		})();
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

		console.log(this);
	}
}
