import * as PIXI from 'pixi.js';
import { API_URL_BASE } from '../constants';

export class BookCoverSprite extends PIXI.Sprite {
	public constructor(book: Book) {
		super();

		this.interactive = true;
		this.anchor.set(0.5);
		this.position.set(100);

		(async (): Promise<void> => {
			const imageUrl = `${API_URL_BASE}/books/imageProxy?imageUrl=${book.imageUrl}`; // get image through proxy to bypass cors
			const bookCoverSprite = new PIXI.Sprite(await PIXI.Texture.fromURL(imageUrl));
			bookCoverSprite.anchor.set(0.5);
			this.addChild(bookCoverSprite);
		})();

		// attach events
		let data: PIXI.InteractionData | null; // closure data
		let dragging = false; // closure data
		this.on('pointerdown', (event: PIXI.InteractionEvent) => {
			data = event.data;
			this.alpha = 0.5;
			dragging = true;
		}).on('pointerup', () => {
			data = null;
			this.alpha = 1;
			dragging = false;
		}).on('pointermove', () => {
			if (dragging) {
				const newPosition = data!.getLocalPosition(this.parent);
				this.position.set(newPosition.x, newPosition.y);
			}
		});
	}
}