import * as PIXI from 'pixi.js';
import { API_URL_BASE } from '../constants';
import { sortState } from './SortState';

const woodBackgroundYMiddle = 96 + (205 / 2); // y at 96 and height at 205

export class BookCoverSprite extends PIXI.Sprite {
	public cote = '';

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
			const deweyPos = book.COTE.search(/[0-9]{3}/);
			if (deweyPos !== -1) {
				this.cote = book.COTE.substr(deweyPos, 3);
			}
			else {
				const alphaPos = book.COTE.search(/ [a-zA-Z]{1,}/);
				if (alphaPos !== -1) {
					this.cote = book.COTE.substr(alphaPos);
				}
				else {
					throw new Error('Invalid COTE');
				}
			}

			const coteText = new PIXI.BitmapText(this.cote, {
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

			// book position is on shelf
			if (this.position.y - woodBackgroundYMiddle < 50) {
				// remove book if already on shelf
				if (sortState.shelvedBooks.includes(this)) {
					sortState.shelvedBooks = sortState.shelvedBooks.filter(book => book !== this);
					sortState.updateBookArrangement();
				}
				// add book to shelf state
				const pos = Math.min(BookCoverSprite.closestBookPosition(this.position.x), sortState.shelvedBooks.length);
				sortState.shelvedBooks.splice(pos, 0, this);

				sortState.updateBookArrangement();
			}
			// remove book from shelf state
			else if (sortState.shelvedBooks.includes(this)) {
				sortState.shelvedBooks = sortState.shelvedBooks.filter(book => book !== this);
				sortState.updateBookArrangement();
			}
		}).on('pointermove', () => {
			if (dragging) {
				const newPosition = data!.getLocalPosition(this.parent);
				
				// snap to woodBackground
				if (newPosition.y - woodBackgroundYMiddle < 50) {
					// position on shelf
					newPosition.y = woodBackgroundYMiddle - 15; // override y

					// remove book if already on shelf
					if (sortState.shelvedBooks.includes(this)) {
						sortState.shelvedBooks = sortState.shelvedBooks.filter(book => book !== this);
						sortState.updateBookArrangement();
					}
					// add book to shelf state
					const pos = Math.min(BookCoverSprite.closestBookPosition(this.position.x), sortState.shelvedBooks.length);
					sortState.shelvedBooks.splice(pos, 0, this);

					sortState.updateBookArrangement();
					
				}
				// remove ghost book from shelf state
				else if (sortState.shelvedBooks.includes(this)) {
					sortState.shelvedBooks = sortState.shelvedBooks.filter(book => book !== this);
					sortState.updateBookArrangement();
				}

				this.position.set(newPosition.x, newPosition.y);
			}
		});
	}

	/**
	 * @param xCoord the current coordinate of the book.
	 * @returns the closest book position on the shelf.
	 */
	private static closestBookPosition(xCoord: number): number {
		const position = Math.max(Math.round((xCoord - 100) / 170), 0);
		return position;
	}
}