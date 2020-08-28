interface BookData {
    DOCUMENT_ID: string;
    TITRE: string;
    SUPPORT: string;
}

type BookList = BookData[]

declare module '*.json' {
    const bookList: BookList;
    export default bookList;
}