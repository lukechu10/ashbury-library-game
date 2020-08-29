import type { BookCoverSprite } from './BookCoverSprite';

class SortState {
	public shelvedBooks: BookCoverSprite[] = []; // initially no shelved books

	public updateBookArrangement(): void {
		this.shelvedBooks.forEach((book, i) => {
			book.position.x = 100 + (170 * i); // 100px is first book distance to viewport left. 170px is width of BookCoverSprite.
		});
	}
}

export const sortState = new SortState();