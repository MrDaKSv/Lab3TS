import {Validation} from './validation';

import {LibraryService} from './services';


class App {
    private readonly validation = new Validation();
    private readonly libraryService = new LibraryService();

    constructor() {
        this.addUserBookHandler();
        this.libraryService.loadContent();

        this.addFindHandler();
        //this.libraryService.clear();
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
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
