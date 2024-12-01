export class Library<
    BookType extends Bookable<string>,
    UserType extends Identifiable<string, number>,
> {
    private books: BookType[] = [];
    private users: UserType[] = [];

    addBook(book: BookType): void {
        this.books.push(book);
    }

    addUser(user: UserType): void {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }

    getBooks() {
        return this.books;
    }

    find(id: number): UserType | undefined {
        return this.users.filter((x) => x.id === id)[0];
    }

    saveToLocalStorage() {
        localStorage.clear();
        localStorage.setItem(
            'library',
            JSON.stringify({
                books: this.books,
                users: this.users,
            }),
        );
    }

    loadFromLocalStorage() {
        const savedData = localStorage.getItem('library');
        if (savedData) {
            const {books, users} = JSON.parse(savedData);
            this.books = books;
            this.users = users;
        }
    }
    clear() {
        localStorage.clear();
    }

    // findBook(condition: (book: BookType) => boolean): BookType | undefined {
    //     return this.books.find(condition);
    // }

    // findUsersByBook(bookId: string, condition: (user: UserType, book: BookType) => boolean): UserType[] {
    //     // Тут реалізуємо логіку пошуку користувачів за книгою, використовуючи condition
    //     return this.users.filter(user => /* ... логіка пошуку */);
    // }
}

export interface Identifiable<T, T1> {
    readonly name: T;
    readonly email: T;
    readonly id: T1;
    readonly borrowedBooks: number[];

    getId(): T1;

    borrow(id: T1): void;
    canBorrow(): boolean;
    return(id: number): void;
    canReturn(id: number): boolean;
}

export interface Bookable<T> {
    bookName: T;
    author: T;
    yearOfPublishing: number;
    isBorrowed: boolean;
    id: number;

    borrow(): void;
    return(): void;
}
