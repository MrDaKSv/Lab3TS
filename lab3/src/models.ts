import { Identifiable, Bookable } from './library';

export interface IBook extends Bookable<string> {
    bookName: string;
    author: string;
    yearOfPublishing: number;
    isBorrowed: boolean;
    id: number;

    borrow(): void;
    return(): void;
}

export class Book implements IBook {
    bookName: string;
    author: string;
    yearOfPublishing: number;
    isBorrowed: boolean;
    id: number;

    constructor(bookname: string, author: string, yearOfPublishing: number) {
        this.bookName = bookname;
        this.author = author;
        this.yearOfPublishing = yearOfPublishing;
        this.isBorrowed = false;
        this.id = Math.floor(Math.random() * 1000000000);
    }

    

    borrow(): void {
        this.isBorrowed = true;
    }

    return(): void {
        this.isBorrowed = false;
    }
}

export interface IUser extends Identifiable<string, number> {
    name: string;
    email: string;
    id: number;

    getId(): number;
    borrow(id: number): void;
    canBorrow(): boolean;
    return(id: number): void;
    canReturn(id: number): boolean;
}

export class User implements IUser {
    name: string;
    email: string;
    id: number;
    borrowedBooks: number[];

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.id = Math.floor(Math.random() * 1000000000);
        this.borrowedBooks = [];
    }

    

    getId(): number {
        return this.id;
    }

    borrow(id: number) {
        // Перевірка чи книга вже не позичена
        if (!this.borrowedBooks.includes(id)) {
            if (this.canBorrow()) {
                this.borrowedBooks.push(id);
            } else {
                alert('Неможливо позичити більше трьох книг');
            }
        } else {
            alert('Цю книгу вже позичено');
        }
    }

    canBorrow(): boolean {
        // Користувач може позичити книгу, якщо у нього менше 3 позичених
        return this.borrowedBooks.length < 3;
    }

    canReturn(id: number): boolean {
        // Перевіряє, чи є книга у списку позичених
        return this.borrowedBooks.includes(id);
    }

    return(id: number): void {
        // Перевіряємо, чи дійсно є ця книга в списку позичених
        if (this.canReturn(id)) {
            this.borrowedBooks = this.borrowedBooks.filter((bookId) => bookId !== id);
        } else {
            alert('Книга не знайдена у вашому списку');
        }
    }
}
