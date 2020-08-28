import Router from '@koa/router';
import { getRandomBooks, BookType } from '../model/model';


const router = new Router();

function getImageUrl(book: BookData): Book {
	const BASE_URL = 'https://www.hiboutheque.fr/noyau/upload/vignette_document/';

	const imageData = book.IMAGE;
	let imageUrl: string;

	if (imageData.match(/[0-9]{15}\.[a-z]*/)) { // e.g. 200804011130508.jpg
		imageUrl = `${BASE_URL}A_${imageData.slice(0, 4)}/M_${imageData.slice(4, 6)}/${imageData}`;
	}
	else if (imageData.match(/[a-z0-9]{1,8}\.[a-z]*/)) { // e.g. 80116005.jpg or tob165.jpg
		imageUrl = `${BASE_URL}F_${imageData.slice(0, 2)}/${imageData}`;
	}
	else if (imageData.match(/[0-9]+_[0-9]{4}-[0-9]{2}.*/)) { // e.g. 2_2012-06-18_10-46-37_.gif
		const firstUnderscorePos = imageData.indexOf('_');
		const year = imageData.slice(firstUnderscorePos + 1, firstUnderscorePos + 5);
		const month = imageData.slice(firstUnderscorePos + 6, firstUnderscorePos + 8);
		imageUrl = `${BASE_URL}A_${year}/M_${month}/${imageData}`;
	}
	else {
		throw new Error(`Could not get image url for ${imageData}`); // should be unreachable
	}

	return { ...book, imageUrl };
}

router.get('get', async ctx => {
	const amount: number = ctx.query.amount;
	if (amount === undefined) ctx.throw(400, 'invalid amount query');

	const bookTypeStr: string = ctx.query.bookType;
	if (bookTypeStr === undefined) ctx.throw(400, 'invalid bookType query');
	else if (bookTypeStr !== 'alpha' && bookTypeStr !== 'dewey') ctx.throw(400, 'invalid bookType query');

	const bookType: BookType = bookTypeStr === 'alpha' ? BookType.Alpha : BookType.DeweyDecimal;
	
	try {
		const res = (await getRandomBooks(bookType, amount)).map(getImageUrl);
		ctx.body = res;
	}
	catch(err) {
		if (err.message === 'there are not enough books to satisfy amount') {
			ctx.throw(400, 'amount query exceeds the number of books');
		}
	}
});

export { router };
