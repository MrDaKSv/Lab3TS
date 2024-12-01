import {Book, User, IBook, IUser} from './models';
import {Library} from './library';
import {Validation} from './validation';

export class LibraryService {
    static library = new Library();

    getUserById(id: number): IUser | undefined {
        const user = LibraryService.library.find(id);
        if (user) {
            return user;
        }
        return undefined;
    }

    loadContent() {
        LibraryService.library.loadFromLocalStorage();

        console.log(LibraryService.library);

        let users = LibraryService.library.getUsers();
        let books = LibraryService.library.getBooks();

        users.forEach((user) => {
            this.createUserElement(user);
            console.log(user);
        });

        books.forEach((book) => {
            this.createBookElement(book);
        });
    }

    public addBook() {
        const book = new Book(
            Validation.bookName.value,
            Validation.author.value,
            parseInt(Validation.yearOfPublication.value),
        );
        LibraryService.library.addBook(book);
        this.createBookElement(book);
        LibraryService.library.saveToLocalStorage();

        console.log('Book added: ', book);
    }

    public addUser() {
        const user = new User(
            Validation.userName.value,
            Validation.email.value,
        );
        LibraryService.library.addUser(user);
        this.createUserElement(user);
        LibraryService.library.saveToLocalStorage();

        console.log('User added: ', user);
    }

    public createBookElement(book: Book) {
        // Створюємо новий елемент div
        const bookDiv = document.createElement('div');

        // Створюємо елемент label і встановлюємо текст
        const label = document.createElement('label');
        label.textContent = `Назва книги: ${book.bookName}, Автор: ${book.author}, Рік: ${book.yearOfPublishing})`;

        // Створюємо кнопку
        const button = document.createElement('button');
        if (book.isBorrowed) {
            button.textContent = 'Повернути';
        } else {
            button.textContent = 'Позичити';
        }
        button.classList.add('btn', 'btn-secondary');
        button.style.float = 'right';
        button.id = 'Borrow';

        button.addEventListener('click', (event) => {
            event.preventDefault();

            let flag = true;
            if (button.textContent == 'Позичити') {
                let userIdStr = prompt('введіть ID користувача');
                if (userIdStr != null || userIdStr == '') {
                    let userId;
                    try {
                        userId = parseInt(userIdStr);
                        let user = this.getUserById(userId);
                        if (user) {
                            if (user.canBorrow()) {
                                book.borrow();
                                user.borrow(book.id);
                                flag = false;

                                alert(
                                    `Книга ${book.bookName} (${book.yearOfPublishing}), була позичена ${user.id} ${user.name} ${user.email}`,
                                );

                                button.textContent = 'Повернути';
                            } else {
                                alert('Користувач вже позичив 3 книги');
                            }
                        } else {
                            alert('Не існує користувача з таким ID');
                        }
                    } catch {
                        alert('Введіть коректні дані');
                    }
                } else {
                    alert('Порожній рядок');
                }
            }

            if (button.textContent == 'Повернути' && flag) {
                let userIdStr = prompt('введіть ID користувача');
                if (userIdStr != null || userIdStr == '') {
                    let userId;
                    try {
                        userId = parseInt(userIdStr);
                        let user = this.getUserById(userId);
                        if (user) {
                            if (user.canReturn(book.id)) {
                                book.return();
                                user.return(book.id);

                                alert(
                                    `Книга ${book.bookName} (${book.yearOfPublishing}), була повернута`,
                                );

                                button.textContent = 'Позичити';
                            } else {
                                alert('Користувач немає цієї книги');
                            }
                        } else {
                            alert('Не існує користувача з таким ID');
                        }
                    } catch {
                        alert('Введіть коректні дані');
                    }
                } else {
                    alert('Порожній рядок');
                }
            }
        });

        const horizontalLine = document.createElement('hr');

        // Додаємо label і button до div
        bookDiv.appendChild(label);
        bookDiv.appendChild(button);
        bookDiv.appendChild(horizontalLine);

        // Повертаємо створений елемент
        const parentElement = document.getElementById('bookList');
        if (parentElement) {
            parentElement.appendChild(bookDiv);
        }
    }

    public createUserElement(user: User) {
        const userDiv = document.createElement('div');

        // Створюємо елемент label і встановлюємо текст
        const label = document.createElement('label');
        label.textContent = `ID: ${user.id}, Ім'я: ${user.name}, Email: ${user.email})`;

        const horizontalLine = document.createElement('hr');

        // Додаємо label і button до div
        userDiv.appendChild(label);
        userDiv.appendChild(horizontalLine);

        // Повертаємо створений елемент
        const parentElement = document.getElementById('userList');
        if (parentElement) {
            parentElement.appendChild(userDiv);
        }
    }

    clear() {
        LibraryService.library.clear();
    }
}
