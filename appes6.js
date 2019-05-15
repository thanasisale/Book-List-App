class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // Create a tr element
        const row = document.createElement('tr');

        // Inset cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add Classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');

        // Get form
        const form = document.querySelector('#book-form');

        // Insert alert
        container.insertBefore(div,form);

        // Timeout after 3s
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 300);
    }

    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //Add book to ui
            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks());
//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get Form Values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value; 

    // Instantiate new Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === ''|| author === ''|| isbn === '') {
        // Error Alert
        ui.showAlert('Please fill in all fields', 'err');
    } else {
        // Add book to List
        ui.addBookToList(book);

        // Add to local storage
        Store.addBook(book);

        // Show Success message
        ui.showAlert('Book Added', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    // Instatiate the UI
    const ui = new UI();

    // Delete the book
    ui.deleteBook(e.target);

    // Delete Book from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Message
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});