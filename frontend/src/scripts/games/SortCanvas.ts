import * as PIXI from 'pixi.js';
import { API_URL_BASE } from '../constants';
import { BookCoverSprite } from './BookCoverSprite';

const loader = PIXI.Loader.shared;
const resources = loader.resources;

const view = document.querySelector<HTMLCanvasElement>('#sort-canvas')!;
const app = new PIXI.Application({
	view,
	resolution: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true
});
console.log('Created PIXI application: ', app);
app.renderer.backgroundColor = 0xffffff; // white

const stage = app.stage;
stage.sortableChildren = true;
const textures: any = {};
const sprites: any = {};

async function getBooks(): Promise<Book[]> {
	const apiRes = await fetch(`${API_URL_BASE}/books/get?amount=5&bookType=alpha`);
	const books: Book[] = await apiRes.json();

	return books;
}

/**
 * Creates a BookCoverSprite and adds it to the stage.
 * @param book the book to create the sprite from.
 * @param position the initial position of the book.
 */
async function createBookCover(book: Book, position: number): Promise<void> {
	const sprite = new BookCoverSprite(book);
	sprite.zIndex = 10;
	sprite.x = 100 + (170 * position); // 100px is first book distance to viewport left. 170px is width of BookCoverSprite.
	sprite.y = 450;
	stage.addChild(sprite);
}

async function setup(): Promise<void> {
	textures.woodBackground = loader.resources.woodBackground.texture;

	sprites.woodBackground = new PIXI.TilingSprite(textures.woodBackground, app.view.width, 205);
	sprites.woodBackground.y = 96;
	sprites.woodBackground.zIndex = 1; // background

	stage.addChild(sprites.woodBackground);

	const books = await getBooks();

	// load book covers
	books.forEach((book, i) => {
		createBookCover(book, i);
	});
}

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

			setup();
		});
})();

// setup resize event
window.addEventListener('resize', () => {
	app.renderer.resize(window.innerWidth, window.innerHeight);

	// resize woodBackground width
	(sprites.woodBackground as PIXI.TilingSprite).width = window.innerWidth;
});
