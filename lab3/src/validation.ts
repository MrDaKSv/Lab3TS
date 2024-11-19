export class Validation {
    static bookName = document.getElementById('bookName') as HTMLButtonElement;
    static author = document.getElementById('author') as HTMLButtonElement;
    static yearOfPublication = document.getElementById(
        'yearOfPublication',
    ) as HTMLButtonElement;

    static userName = document.getElementById('userName') as HTMLButtonElement;
    static email = document.getElementById('email') as HTMLButtonElement;

    public checkBookFields(): boolean {
        //Перевірка поля назва книжки
        const bookNameLabel = document.getElementById('bookNameLabel');
        if (bookNameLabel != null) {
            if (Validation.bookName.value === '') {
                bookNameLabel.style.display = 'block';
                return false;
            } else {
                bookNameLabel.style.display = 'none';
            }
        }

        //Перевірка поля автор

        const bookAuthorLabel = document.getElementById('bookAuthorLabel');
        if (bookAuthorLabel != null) {
            if (Validation.author.value === '') {
                bookAuthorLabel.style.display = 'block';
                return false;
            } else {
                bookAuthorLabel.style.display = 'none';
            }
        }

        //Перевірка поля рік видання

        const bookYearLabel = document.getElementById('bookYearLabel');
        if (bookYearLabel != null) {
            if (Validation.yearOfPublication.value === '') {
                bookYearLabel.style.display = 'block';
                return false;
                // } else if (!/^\d+$/.test(Validation.bookName.value)) {
                //     alert('Введіть тільки цифри');
                //     return false;
            } else {
                bookYearLabel.style.display = 'none';
            }
        }
        return true;
    }

    checkUserFields(): boolean {
        //Перевірка поля ім'я користувача

        const userNameLabel = document.getElementById('userNameLabel');
        if (userNameLabel != null) {
            if (Validation.userName.value === '') {
                userNameLabel.style.display = 'block';
                return false;
            } else {
                userNameLabel.style.display = 'none';
            }
        }

        //Перевірка поля email

        const emailLabel = document.getElementById('emailLabel');
        if (emailLabel != null) {
            if (Validation.email.value === '') {
                emailLabel.style.display = 'block';
                return false;
                // } else if (
                //     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Validation.bookName.value)
                // ) {
                alert('Введіть правильний email');
                return false;
            } else {
                emailLabel.style.display = 'none';
            }
        }
        return true;
    }
}
