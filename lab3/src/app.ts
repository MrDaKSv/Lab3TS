import {Validation} from './validation';
import {IBook, Book, IUser, User} from './models';
import {LibraryService} from './services';
import {Library} from './library';

class App {
    private readonly validation = new Validation();
    private readonly libraryService = new LibraryService();
    private readonly library = new Library();

    constructor() {
        this.addUserBookHandler();
        this.addClearHandler();
        this.libraryService.loadContent();
        //this.updateUI();
        this.addFindHandler();
    }
    

    private addFindHandler() {
        const findButton = document.getElementById(
            'findButton',
        ) as HTMLButtonElement;
        findButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.libraryService.findBook();
        });
    }

    private addUserBookHandler() {
        // Логіка обробки кліку на кнопці "Додати книгу"

        const addBookButton = document.getElementById(
            'addBook',
        ) as HTMLButtonElement;
        addBookButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.validation.checkBookFields()) {
                this.libraryService.addBook();
            }
        });

        // Логіка обробки кліку на кнопці "Додати корстувача"

        const addUserButton = document.getElementById(
            'addUser',
        ) as HTMLButtonElement;
        addUserButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.validation.checkUserFields()) {
                this.libraryService.addUser();
            }
        });
    }
    private addClearHandler() {
        const clearButton = document.getElementById('clearStorageButton') as HTMLButtonElement;
    
        clearButton.addEventListener('click', (event) => {
            event.preventDefault();
    
            // Підтвердження дії
            const confirmation = confirm("Ви дійсно хочете очистити сховище? Ця дія незворотна.");
            if (confirmation) {
                // Очищаємо сховище
                this.libraryService.clear();
    
                // Оновлюємо вигляд
                this.updateUI();
    
                alert("Сховище успішно очищено.");
            }
        });
    }
    
    
    private updateUI() {
        const { books, users } = this.library.updateView();
    
        const bookListElement = document.getElementById('bookList') as HTMLElement;
        const userListElement = document.getElementById('userList') as HTMLElement;
    
        // Очищення списків у DOM
        bookListElement.innerHTML = '';
        userListElement.innerHTML = '';
    
        // Відображення книг
        books.forEach((book) => {
            const bookItem = document.createElement('div');
            bookItem.textContent = `Назва: ${book.bookName}, Автор: ${book.author}, Рік: ${book.yearOfPublishing}`;
            bookListElement.appendChild(bookItem);
        });
    
        // Відображення користувачів
        users.forEach((user) => {
            const userItem = document.createElement('div');
            userItem.textContent = `Ім'я: ${user.name}, Email: ${user.email}`;
            userListElement.appendChild(userItem);
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {
    new App();
});
