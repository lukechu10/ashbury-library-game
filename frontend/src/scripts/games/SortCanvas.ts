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
	const apiRes = await fetch(`${API_URL_BASE}/books/get?amount=3&bookType=alpha`);
	const books: Book[] = await apiRes.json();

	return books;
}

async function createBookCover(book: Book): Promise<void> {
	const sprite = new BookCoverSprite(book);
	sprite.zIndex = 10;
	stage.addChild(sprite);
}

async function setup(): Promise<void> {
	textures.woodBackground = loader.resources.woodBackground.texture;

	sprites.woodBackground = new PIXI.TilingSprite(textures.woodBackground, app.view.width, 205);
	sprites.woodBackground.y = 96;
	sprites.woodBackground.zIndex = 1; // background

	stage.addChild(sprites.woodBackground);

	PIXI.BitmapFont.from('Cote Font', {
		fontFamily: 'Berlin Sans FB',
		fontSize: 30
	});
}

(async (): Promise<void> => {
	PIXI.Loader.registerPlugin(new PIXI.BitmapFontLoader());

	loader
		.add('woodBackground', '/images/games/sort/woodBackground.png')
		.add('Berlin Sans FB', '/fonts/BerlinSansFB.ttf')
		.load(setup);
	console.log(loader);

	const books = await getBooks();

	// load book covers
	books.forEach(book => {
		createBookCover(book);
	});
})();

// setup resize event
window.addEventListener('resize', () => {
	app.renderer.resize(window.innerWidth, window.innerHeight);

	// resize woodBackground width
	(sprites.woodBackground as PIXI.TilingSprite).width = window.innerWidth;
});