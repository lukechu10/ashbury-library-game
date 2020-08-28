interface Book extends BookData {
    imageUrl: string;
}

interface BookData {
    DOCUMENT_ID: string;
    TITRE: string;
    SUPPORT: string;
    IMAGE: string;
}

type BookList = BookData[]

declare module '*.json' {
    const bookList: BookList;
    export default bookList;
}