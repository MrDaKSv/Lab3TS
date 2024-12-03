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
        const input = prompt('Введіть назву чи автора книги');
        if (input != null && input.trim() !== '') {
            const foundBook = LibraryService.library.getBooks().find(
                (book) => book.author === input || book.bookName === input
            );
    
            if (foundBook) {
                const isBorrowedMessage = foundBook.isBorrowed ? 'Так' : 'Ні';
                const resultMessage = `Знайдено книгу:\n\nНазва: ${foundBook.bookName}\nАвтор: ${foundBook.author}\nРік публікації: ${foundBook.yearOfPublishing}\nПозичено: ${isBorrowedMessage}`;
                alert(resultMessage);
            } else {
                alert("Книги з таким ім'ям чи автором не знайдено");
            }
        } else {
            alert('Введений рядок порожній');
        }
    }
    
    

    loadContent() {
        LibraryService.library.loadFromLocalStorage();

        console.log(LibraryService.library);

        let users = LibraryService.library.getUsers();
        let books = LibraryService.library.getBooks();

        users.forEach((user) => {
            this.createUserElement(user);
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
        console.log(book instanceof Book); // Повинно вивести true, якщо book є екземпляром класу Book
    }

    public addUser() {
        const user = new User(
            Validation.userName.value,
            Validation.email.value,
        );
        LibraryService.library.addUser(user);
        console.log(user instanceof User); // Повинно вивести true, якщо user є екземпляром класу User
        this.createUserElement(user);
        LibraryService.library.saveToLocalStorage();
    }

    public createBookElement(book: Book) {
        console.log(book);
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
                userIdStr = userIdStr ? userIdStr.trim() : '';
                
                // Перевірка на null і порожній рядок
                if (userIdStr !== null && userIdStr.trim() !== '' && !isNaN(Number(userIdStr))) {
                    const userId = Number(userIdStr); // Перетворення в число
                    console.log(userId);
        
                    try {
                        let user = this.getUserById(userId);
                        if (user instanceof User){
                            if (user) {
                               
                                if (user.canBorrow()) {
                                   
                                    book.borrow();
                                    
                                    user.borrow(book.id);
                        
                                    flag = false;
                                    
            
                                    alert(
                                        `Книга ${book.bookName} (${book.yearOfPublishing}), була позичена ${user.id} ${user.name} ${user.email}`,
                                    );
                                    LibraryService.library.updateBookStatus(book.id, true);
                                    LibraryService.library.updateUserBorrowedBooks(userId, book.id);

                                    console.log(book);

                                    button.textContent = 'Повернути';
                                } else {
                                    alert('Користувач вже позичив 3 книги');
                                }
                            }else {
                                alert('Не існує користувача з таким ID');
                            }
                        }else{
                            alert('T');
                        } 
                    } catch (error: unknown) { // Використовуємо тип unknown
                        alert('Введіть коректні дані');
                        if (error instanceof Error) { // Перевіряємо, чи є це об'єкт Error
                            console.error('Тип помилки:', error.constructor.name); // Виведення типу помилки
                            console.error('Повна інформація про помилку:', error); // Виведення повної інформації про помилку
                            console.error('Повідомлення помилки:', error.message); // Виведення повідомлення помилки
                        } else {
                            console.error('Помилка не є екземпляром Error:', error);
                        }
                    }
                } else {
                    alert('Введіть коректний ID користувача');
                }
            }
        
            if (button.textContent == 'Повернути' && flag) {
                let userIdStr = prompt('введіть ID користувача');
                userIdStr = userIdStr ? userIdStr.trim() : '';
                
                // Перевірка на null і порожній рядок
                if (userIdStr !== null && userIdStr.trim() !== '' && !isNaN(Number(userIdStr))) {
                    const userId = Number(userIdStr); // Перетворення в число
        

                    try {
                        let user = this.getUserById(userId);
                        if (user) {
                            if (user.canReturn(book.id)) {
                                book.return();
                                user.return(book.id);

                                alert(
                                    `Книга ${book.bookName} (${book.yearOfPublishing}), була повернута`,
                                );
                        
                                LibraryService.library.updateBookStatus(book.id, false); // Оновити книгу на доступну

                                LibraryService.library.updateUserBorrowedBooks(userId, book.id);


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
                    alert('Введіть коректний ID користувача');
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
