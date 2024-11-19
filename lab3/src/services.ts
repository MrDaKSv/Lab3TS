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

    findBook() {
        let input = prompt('Ввведіть назву чи автора книги');
        if (input != null && input != '') {
            
            LibraryService.library.findBook(input);
        } else {
            alert('Порожній рядок');
        }
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

    public deleteBook(bookId: number): void {
        if (LibraryService.library.deleteBook(bookId)) {
            alert('Книга видалена');
            LibraryService.library.saveToLocalStorage();
        } else {
            alert('Книгу не знайдено');
        }
    }

    // Додатковий метод для видалення користувача
    public deleteUser(userId: number): void {
        if (LibraryService.library.deleteUser(userId)) {
            alert('Користувач видалений');
            LibraryService.library.saveToLocalStorage();
        } else {
            alert('Користувача не знайдено');
        }
    }

    public createBookElement(book: Book) {
    const bookDiv = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = `Назва книги: ${book.bookName}, Автор: ${book.author}, Рік: ${book.yearOfPublishing})`;

    

    const button = document.createElement('button');
    if (book.isBorrowed) {
        button.textContent = 'Повернути';
    } else {
        button.textContent = 'Позичити';
    }
    button.classList.add('btn', 'btn-secondary');
    button.style.float = 'right';
    button.id = 'Borrow';

    // Обробник для позичення/повернення книги
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
                            alert(`Книга ${book.bookName} (${book.yearOfPublishing}), була позичена ${user.id} ${user.name} ${user.email}`);
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
                            alert(`Книга ${book.bookName} (${book.yearOfPublishing}), була повернута`);
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


    const parentElement = document.getElementById('bookList');
    if (parentElement) {
        parentElement.appendChild(bookDiv);
    }
}

public createUserElement(user: User) {
    const userDiv = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = `ID: ${user.id}, Ім'я: ${user.name}, Email: ${user.email})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.style.float = 'right';

    // Подія для кнопки видалення користувача
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm(`Ви дійсно хочете видалити користувача ${user.name}?`)) {
            this.deleteUser(user.id);
        }
    });

    const horizontalLine = document.createElement('hr');
    userDiv.appendChild(label);
    userDiv.appendChild(deleteButton);  // Додаємо кнопку видалення
    userDiv.appendChild(horizontalLine);

    const parentElement = document.getElementById('userList');
    if (parentElement) {
        parentElement.appendChild(userDiv);
    }
}


    clear() {
        LibraryService.library.clear();
    }
}
