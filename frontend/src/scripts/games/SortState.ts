import type { BookCoverSprite } from './BookCoverSprite';

class SortState {
	public shelvedBooks: BookCoverSprite[] = []; // initially no shelved books

	public updateBookArrangement(): void {
		this.shelvedBooks.forEach((book, i) => {
			book.position.x = 100 + (170 * i); // 100px is first book distance to viewport left. 170px is width of BookCoverSprite.
		});
	}

	/**
	 * Custom string comparison.
	 * @param a the first string.
	 * @param b the second string.
	 * @returns true if b.length > a.length or if equal, a >= b (according to default js implementation).
	 */
	private static strGreaterThan(a: string, b: string): boolean {
		if (b.length > a.length) return true;
		else return a >= b;
	}

	public isCorrectlySorted(expectedBooksCount: number): boolean {
		if (this.shelvedBooks.length !== expectedBooksCount) return false;

		// make sure each book after the first is greater
		let prevCote = ''; // smallest string value (according to strGreaterThan)
		for (const cote of this.shelvedBooks.map(book => book.cote)) {
			if (SortState.strGreaterThan(cote, prevCote)) {
				prevCote = cote;
			}
			else {
				return false;
			}
		}
		return true;
	}
}

export const sortState = new SortState();