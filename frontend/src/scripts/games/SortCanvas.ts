import * as PIXI from 'pixi.js';
import { API_URL_BASE } from '../constants';

const loader = PIXI.Loader.shared;
const resources = loader.resources;

const app = new PIXI.Application({
	view: document.querySelector<HTMLCanvasElement>('#sort-canvas')!
});
app.renderer.backgroundColor = 0xffffff; // white

const stage = app.stage;
const textures: any = {};
const sprites: any = {};

async function getBooks(): Promise<Book[]> {
	const apiRes = await fetch(`${API_URL_BASE}/books/get?amount=10&bookType=alpha`);
	const books: Book[] = await apiRes.json();

	return books;
}

async function createBookCover(imageUrl: string): Promise<void> {
	const bookCoverSprite = new PIXI.Sprite(await PIXI.Texture.fromURL(imageUrl));

	let data: PIXI.InteractionData | null; // closure data
	let dragging = false; // closure data
	
	bookCoverSprite.interactive = true;
	bookCoverSprite.anchor.set(0.5);
	
	bookCoverSprite.on('pointerdown', (event: PIXI.InteractionEvent) => {
		data = event.data;
		bookCoverSprite.alpha = 0.5;
		dragging = true;
	}).on('pointerup', () => {
		data = null;
		bookCoverSprite.alpha = 1;
		dragging = false;
	}).on('pointermove', () => {
		if (dragging) {
			const newPosition = data!.getLocalPosition(bookCoverSprite.parent);
			bookCoverSprite.position.set(newPosition.x, newPosition.y);
		}
	});

	bookCoverSprite.x = 100;
	bookCoverSprite.y = 100;
	
	stage.addChild(bookCoverSprite);
}

async function setup(): Promise<void> {
	textures.woodBackground = loader.resources.woodBackground.texture;

	sprites.woodBackground = new PIXI.TilingSprite(textures.woodBackground, app.view.width, 205);
	sprites.woodBackground.y = 96;

	stage.addChild(sprites.woodBackground);
}

(async (): Promise<void> => {
	loader.add('woodBackground', '/images/games/sort/woodBackground.png');

	const books = await getBooks();

	// load book covers
	books.forEach(book => {
		createBookCover(`${API_URL_BASE}/books/imageProxy?imageUrl=${book.imageUrl}`); // get image through proxy because of cors
	});

	// render book covers
	loader.load(setup);
})();
