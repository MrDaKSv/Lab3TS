import { Book } from './models';
import { User } from './models';
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

    findBook(info: string): void {
        let flag = true;
        this.books.forEach((book) => {
            if (book.author === info || book.bookName === info) {
                alert(JSON.stringify(book));
                flag = false;
            }
        });
        if (flag) {
            alert("Книги з таким ім'ям чи автором не знайдено");
        }
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
            const { books, users } = JSON.parse(savedData);
    
            // Перестворюємо книги та користувачів як екземпляри відповідних класів
            this.books = books.map((bookData: any) => new Book(bookData.bookName, bookData.author, bookData.yearOfPublishing));
            this.users = users.map((userData: any) => new User(userData.name, userData.email));
    
            // За бажанням можна також ініціалізувати інші властивості, такі як `borrowedBooks` для користувачів
        } else {
            console.log('Дані не знайдено в localStorage');
        }
    }
    
     // Оновити статус позички книги за її id
     updateBookStatus(bookId: number, isBorrowed: boolean): void {
        const book = this.books.find((b) => b.id === bookId);
        if (book) {
            book.isBorrowed = isBorrowed;
            this.saveToLocalStorage(); // Оновлюємо локальне сховище після зміни статусу
        }
    }

    // Оновити список позичених книг користувача
    updateUserBorrowedBooks(userId: number, bookId: number): void {
        const user = this.users.find((u) => u.id === userId);
        const book = this.books.find((b) => b.id === bookId);
        
        if (user && book && !book.isBorrowed) {
            user.borrowedBooks.push(bookId);  // Додаємо книгу до списку позичених
            book.isBorrowed = true;  // Змінюємо статус книги на позичену
            this.saveToLocalStorage();  // Оновлюємо локальне сховище після зміни
        }
    }

    updateView() {
        return {
            books: this.books,
            users: this.users,
        };
    }

    clear() {
        localStorage.clear();
    }

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
