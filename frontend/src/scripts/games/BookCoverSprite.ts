import * as PIXI from 'pixi.js';
import { API_URL_BASE } from '../constants';

export class BookCoverSprite extends PIXI.Sprite {
	public constructor(book: Book) {
		super();

		this.interactive = true;
		this.anchor.set(0.5);
		this.position.set(100);

		(async (): Promise<void> => {
			// book
			const imageUrl = `${API_URL_BASE}/books/imageProxy?imageUrl=${book.imageUrl}`; // get image through proxy to bypass cors
			const bookCoverSprite = new PIXI.Sprite(await PIXI.Texture.fromURL(imageUrl));
			bookCoverSprite.anchor.set(0.5);
			bookCoverSprite.height = 150; // woodBackground height is 205px
			this.addChild(bookCoverSprite);

			// cote text
			let cote: string;
			{
				const deweyPos = book.COTE.search(/[0-9]{3}/);
				if (deweyPos !== -1) {
					cote = book.COTE.substr(deweyPos, 3);
				}
				else {
					const alphaPos = book.COTE.search(/[a-zA-Z]{3}/);
					if (alphaPos !== -1) {
						cote = book.COTE.substr(alphaPos);
					}
					else {
						throw new Error('Invalid COTE');
					}
				}
			}
			const coteText = new PIXI.Text(cote, {
				fontName: '35px Arial'
			});
			coteText.anchor.set(0.5, 0);
			coteText.y = 150 / 2; // half of height of bookCoverSprite

			this.addChild(coteText);
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