import * as PIXI from 'pixi.js';
import { API_URL_BASE } from '../constants';
import { sortState } from './SortState';

const woodBackgroundYMiddle = 96 + (205 / 2); // y at 96 and height at 205

export class BookCoverSprite extends PIXI.Sprite {
	public constructor(book: Book) {
		super();
		this.interactive = true;
		this.anchor.set(0.5);

		(async (): Promise<void> => {
			// background
			const coteTextBackground = new PIXI.Graphics();
			coteTextBackground.beginFill(0x888888, 0.7);
			coteTextBackground.drawRoundedRect(0, 0, 160, 190, 4);
			coteTextBackground.position.set(-80);
			this.addChild(coteTextBackground);

			// cote text
			let cote: string;
			{
				const deweyPos = book.COTE.search(/[0-9]{3}/);
				if (deweyPos !== -1) {
					cote = book.COTE.substr(deweyPos, 3);
				}
				else {
					const alphaPos = book.COTE.search(/ [a-zA-Z]{1,}/);
					if (alphaPos !== -1) {
						cote = book.COTE.substr(alphaPos);
					}
					else {
						throw new Error('Invalid COTE');
					}
				}
			}

			const coteText = new PIXI.BitmapText(cote, {
				fontName: 'Cote Font'
			});
			coteText.anchor = new PIXI.Point(0.5);
			coteText.y = 150 / 2; // half of height of bookCoverSprite

			this.addChild(coteText);

			// book
			const imageUrl = `${API_URL_BASE}/books/imageProxy?imageUrl=${book.imageUrl}`; // get image through proxy to bypass cors
			const bookCoverSprite = new PIXI.Sprite(await PIXI.Texture.fromURL(imageUrl));
			bookCoverSprite.anchor.set(0.5);
			bookCoverSprite.height = 150; // woodBackground height is 205px
			this.addChild(bookCoverSprite);
		})();

		// attach events
		let data: PIXI.InteractionData | null; // closure data
		let dragging = false; // closure data
		this.on('pointerdown', (event: PIXI.InteractionEvent) => {
			data = event.data;
			this.alpha = 0.5;
			dragging = true;
			this.zIndex = 11; // show above all other books
		}).on('pointerup', () => {
			data = null;
			this.alpha = 1;
			dragging = false;
			this.zIndex = 10; // reset zIndex

			// book is on shelf
			if (this.position.y - woodBackgroundYMiddle < 30) {
				this.position.x = 100 + (170 * sortState.shelvedBooks.length); // 100px is first book distance to viewport left. 170px is width of BookCoverSprite.
				// only add book if not already on shelf
				if (!sortState.shelvedBooks.includes(this)) {
					sortState.shelvedBooks.push(this);
				}
			}
			// remove book from shelf
			else if (sortState.shelvedBooks.includes(this)) {
				sortState.shelvedBooks = sortState.shelvedBooks.filter(book => book !== this);
				sortState.updateBookArrangement();
			}
		}).on('pointermove', () => {
			if (dragging) {
				const newPosition = data!.getLocalPosition(this.parent);
				
				// snap to woodBackground
				if (newPosition.y - woodBackgroundYMiddle < 30) {
					// position on shelf
					newPosition.y = woodBackgroundYMiddle - 15; // override y
				}

				this.position.set(newPosition.x, newPosition.y);				
			}
		});
	}
}