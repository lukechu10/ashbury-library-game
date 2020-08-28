import * as PIXI from 'pixi.js';

const loader = PIXI.Loader.shared;
const app = new PIXI.Application({
    view: document.querySelector<HTMLCanvasElement>('#sort-canvas')!
});
app.renderer.backgroundColor = 0xffffff; // white

const stage = app.stage;
const textures: any = {};
const sprites: any = {};

function createBookCover(): PIXI.Sprite {
    const bookCoverSprite = new PIXI.Sprite(textures.bookCover);

    let data: PIXI.InteractionData | null; // closure data
    let dragging: boolean = false; // closure data

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

    stage.addChild(bookCoverSprite);
    return bookCoverSprite;
}

function setup(): void {
    textures.woodBackground = loader.resources.woodBackground.texture;
    textures.bookCover = loader.resources.bookCover.texture;

    sprites.woodBackground = new PIXI.TilingSprite(textures.woodBackground, app.view.width, 205);
    sprites.woodBackground.y = 96;

    stage.addChild(sprites.woodBackground);

    createBookCover();
}

loader
    .add('woodBackground', '/images/games/sort/woodBackground.png')
    .add('bookCover', '/images/games/sort/bookCover.gif')
    .load(setup);
