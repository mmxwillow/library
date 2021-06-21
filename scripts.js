let books = document.querySelector('.main');
let displayFormBtn = document.querySelector('.display-form-btn');
let addBookBtn = document.querySelector('#add-book-btn');
let addBookForm = document.querySelector('.add-book-form');

let myLibrary = [];
var i = 0;

function deleteBook(e) {
    let id = e.currentTarget.value;
    document.getElementById(id).remove();
}

function changeStatus(e) {
    let id = e.currentTarget.value;
    let status = myLibrary[id].isRead;
    myLibrary[id].isRead = !status;
    e.currentTarget.textContent = !status ? "finished reading" : "not finished";
}

displayFormBtn.addEventListener('click', () => {
    if (addBookForm.style.visibility == "visible") {
        addBookForm.style.visibility = "hidden";
    }
    else {
        addBookForm.style.visibility = "visible";
    }
})

document.addEventListener('DOMContentLoaded', () => {
    addBookBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let isRead = false;

        if (document.querySelector('#is-read:checked') !== null) {
            isRead = true;
        }

        let book = new Book(title, author, pages, isRead);
        addBookToLibrary(book);
        displayBooks();
        document.querySelector('form').reset();
    })
})

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    for (i; i < myLibrary.length; i++) {
        let newBook = document.createElement('div');
        let bookData = document.createElement('div');
        let author = document.createElement('div');
        let title = document.createElement('div');
        let pages = document.createElement('div');
        let buttons = document.createElement('div');
        let close = document.createElement('button');
        let status = document.createElement('button');

        newBook.id = i;
        close.value = i;
        status.value = i;

        newBook.className = "book";
        bookData.className = "book-data";
        author.className = "author";
        title.className = "title";
        pages.className = "pages";
        buttons.className = "buttons";
        close.className = "close";
        status.className = "status";

        author.textContent = myLibrary[i].author;
        title.textContent = myLibrary[i].title;
        pages.textContent = myLibrary[i].pages + " pages";
        status.textContent = myLibrary[i].isRead ? "finished reading" : "not finished";
        close.textContent = "×";

        books.appendChild(newBook);
        newBook.appendChild(bookData);
        bookData.appendChild(title);
        bookData.appendChild(author);
        bookData.appendChild(pages);
        newBook.appendChild(buttons);
        buttons.appendChild(close);
        buttons.appendChild(status);

        close.addEventListener('click', deleteBook);
        status.addEventListener('click', changeStatus);
    }
}

const book = new Book('In Search of Lost Time', 'Marcel Proust', '4,215', false);
const book1 = new Book('Moby Dick', 'Herman Melville', '635', true);
const book2 = new Book('Hamlet', 'William Shakespeare', '104', false);
addBookToLibrary(book);
addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks();