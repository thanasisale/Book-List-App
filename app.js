// Book constructor
function Book(title, author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
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

// Show alert
UI.prototype.showAlert = function(message, className) {
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

// Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear form fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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
    if(title === ''|| author === ''||isbn === '') {
        // Error Alert
        ui.showAlert('Please fill in all fields', 'err');
    } else {
        // Add book to List
        ui.addBookToList(book);

        // Show Success message
        ui.showAlert('Book Added', 'success');

        // Clear fields
        ui.clearFields();
    }
    
    // Add book to List
    ui.addBookToList(book);
    
    // Clear fields
    ui.clearFields();

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    // Instatiate the UI
    const ui = new UI();

    // Delete the book
    ui.deleteBook(e.target);

    // Show Message
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});