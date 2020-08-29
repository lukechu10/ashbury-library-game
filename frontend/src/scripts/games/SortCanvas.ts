import * as PIXI from 'pixi.js';
import { API_URL_BASE } from '../constants';
import { BookCoverSprite } from './BookCoverSprite';

export const loader = PIXI.Loader.shared;
export const resources = loader.resources;

export class SortCanvas extends PIXI.Application {
	private sprites: any = {};
	private textures: any = {};

	public constructor() {
		super({
			view: document.querySelector<HTMLCanvasElement>('#sort-canvas')!,
			resolution: 1,
			width: window.innerWidth,
			height: window.innerHeight,
			antialias: true
		});

		console.log('Created PIXI application: ', this);
		this.renderer.backgroundColor = 0xffffff; // white

		this.stage.sortableChildren = true;
		
		// setup resize event
		window.addEventListener('resize', this.resizeHandler);

		(async (): Promise<void> => {
			PIXI.Loader.registerPlugin(new PIXI.BitmapFontLoader());
		
			loader
				.add('woodBackground', '/images/games/sort/woodBackground.png')
				.add('Berlin Sans FB', '/fonts/BerlinSansFB.ttf')
				.load(() => {
					// setup BitmapFont
					PIXI.BitmapFont.from('Cote Font', {
						fontFamily: 'Berlin Sans FB',
						fontSize: 30
					});
		
					this.setup();
				});
		})();
	}

	private async getBooks(): Promise<Book[]> {
		const apiRes = await fetch(`${API_URL_BASE}/books/get?amount=5&bookType=alpha`);
		const books: Book[] = await apiRes.json();
	
		return books;
	}

	
	/**
	 * Creates a BookCoverSprite and adds it to the stage.
	 * @param book the book to create the sprite from.
	 * @param position the initial position of the book.
	 */
	private async createBookCover(book: Book, position: number): Promise<void> {
		const sprite = new BookCoverSprite(book);
		sprite.zIndex = 10;
		sprite.x = 100 + (170 * position); // 100px is first book distance to viewport left. 170px is width of BookCoverSprite.
		sprite.y = 450;
		this.stage.addChild(sprite);
	}

	/**
	 * Should be called once loader is finished
	 */
	private async setup(): Promise<void> {
		this.textures.woodBackground = loader.resources.woodBackground.texture;
	
		this.sprites.woodBackground = new PIXI.TilingSprite(this.textures.woodBackground, this.view.width, 205);
		this.sprites.woodBackground.y = 96;
		this.sprites.woodBackground.zIndex = 1; // background
	
		this.stage.addChild(this.sprites.woodBackground);
	
		const books = await this.getBooks();
	
		// load book covers
		books.forEach((book, i) => {
			this.createBookCover(book, i);
		});
	}

	private resizeHandler(): void {
		this.renderer.resize(window.innerWidth, window.innerHeight);

		// resize woodBackground width
		(this.sprites.woodBackground as PIXI.TilingSprite).width = window.innerWidth;
	}
}