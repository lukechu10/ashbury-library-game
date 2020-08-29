import bookData from '../model/books.json';

export const enum BookType {
    /**
     * Fiction books. Uses alphabetical order for sorting
     */
    Alpha,
    /**
     * Non fiction books. Uses numerical order for sorting.
     */
    DeweyDecimal
}

export function getBookType(book: BookData): BookType{
	const cote = book.COTE;

	if (cote.search(/[0-9]{3}/) === -1) {
		return BookType.Alpha;
	}
	else {
		return BookType.DeweyDecimal;
	}
}

/**
 * Triages the BookList into fiction and non fiction (alphabetical sorting and numerical sorting).
 * @param data the `BookList` to triage.
 */
async function triage(data: BookList): Promise<{alpha: BookList, deweyDecimal: BookList}> {
	const alpha: BookList = [];
	const deweyDecimal: BookList = [];

	data.forEach(book => {
		const bookType = getBookType(book);
		if (bookType == BookType.Alpha) {
			alpha.push(book);
		}
		else {
			deweyDecimal.push(book);
		}
	});

	return { alpha, deweyDecimal };
}
const triageDone = triage(bookData);

/**
 * Shuffles `arr` in place.
 * @param arr items to shuffle.
 */
function shuffle<T>(arr: Array<T>):Array<T> {
	let j, x, i;
	for (i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = arr[i];
		arr[i] = arr[j];
		arr[j] = x;
	}
	return arr;
}

/**
 * Gets a list of random books.
 * @param type the type of book to get.
 * @param amount the amount of books to get.
 */
export async function getRandomBooks(type: BookType, amount: number): Promise<BookList> {
	let books: BookList;

	// Use .slice(0) to create a clone of array
	if (type == BookType.Alpha) {
		books = (await triageDone).alpha.slice(0);
	}
	else {
		books = (await triageDone).deweyDecimal.slice(0);
	}

	if (amount > books.length) {
		throw new Error('there are not enough books to satisfy amount');
	}

	const result = shuffle(books).slice(0, amount);

	return result;
}