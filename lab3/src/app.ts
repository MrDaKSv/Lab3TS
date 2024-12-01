import {Validation} from './validation';
import {IBook, Book, IUser, User} from './models';
import {LibraryService} from './services';
import {Library} from './library';

class App {
    private readonly validation = new Validation();
    private readonly libraryService = new LibraryService();

    constructor() {
        this.addUserBookHandler();
        this.libraryService.loadContent();
        //this.libraryService.clear();
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

        // Логіка обробки кліку на кнопці "Додати книгу"

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
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
