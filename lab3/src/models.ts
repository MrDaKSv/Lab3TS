import {Identifiable, Bookable} from './library';
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
        this.borrowedBooks.push(id);
    }

    canBorrow(): boolean {
        if (this.borrowedBooks.length < 3) {
            return true;
        }
        return false;
    }

    canReturn(id: number): boolean {
        if (this.borrowedBooks.includes(id)) {
            return true;
        }
        return false;
    }

    return(id: number): void {
        this.borrowedBooks = this.borrowedBooks.filter((id) => id !== id);
    }
}
