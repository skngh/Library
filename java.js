//Select elements
const formContainer = document.querySelector(".form-container");
const newBook = document.querySelector(".new-book");
const submit = document.querySelector("#submit");
const books = document.querySelector(".books");
let title = document.getElementById("title");

//Array to store every book
let bookArr = [];

let formVisible = false;

//Show all books in the library on startup
(function displayBooks () {
    for (let i = 0; i < bookArr.length; i++) {
        makeBook (bookArr[i].title, bookArr[i].author, bookArr[i].pages, bookArr[i].read);
    }
}());
//Make the form appear when newBook is hit
newBook.addEventListener("click", () => {
    
    if (!formVisible) {
        clearForm();
        books.style.display = 'none';
        formContainer.style.display = 'block';
        formVisible = true;
    }
})
//Make new book with data from form
submit.addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("yes");
    //Make sure form is filled out
    if (title.length < 1 || author.length < 1 || pages.length < 1 || read < 1) return;
    let hasRead = "";
    //Check which read box is checked
    read.checked ? hasRead = "Read" : hasRead = "Not read yet";
    //Declare new book object, add it to array, and then make the book card
    let newBook = new Book (title, author, pages, hasRead);
    addBookToLibrary(newBook);
    makeBook (newBook.title, newBook.author, newBook.pages, newBook.read);
    //Turn back on book cards and turn off form
    formVisible = false;
    books.style.display = "flex";
    formContainer.style.display = 'none';
})
//Book object constructor
function Book (title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = `Title: ${title} Author: ${author} Pages: ${pages} ${read}`
}
//Adds book to book array
function addBookToLibrary(obj) {
    bookArr.push(obj);
}
//Make new book card
function makeBook (title, author, pages, read) {
    //Adds book card container
    const bookContainer = document.createElement('div');
    bookContainer.classList.add("book");
    books.appendChild(bookContainer);
    //Adds title section
    const bookTitleHead = document.createElement('h3');
    bookContainer.appendChild(bookTitleHead);
    bookTitleHead.classList.add("words");
    bookTitleHead.textContent = "Title:";
    const pageBreak = document.createElement("br");
    bookTitleHead.appendChild(pageBreak);

    const bookTitle = document.createElement('p');
    bookContainer.appendChild(bookTitle);
    bookTitle.classList.add("words");
    bookTitle.textContent = title;
    bookTitle.appendChild(pageBreak);
    //Adds author section
    const bookAuthorHead = document.createElement('h3');
    bookContainer.appendChild(bookAuthorHead);
    bookAuthorHead.classList.add("words");
    bookAuthorHead.textContent = "Author:";
    bookAuthorHead.appendChild(pageBreak);

    const bookAuthor = document.createElement('p');
    bookContainer.appendChild(bookAuthor);
    bookAuthor.classList.add("words");
    bookAuthor.textContent = author;
    bookAuthor.appendChild(pageBreak);
    //Adds pages section 
    const bookPagesHead = document.createElement('h3');
    bookContainer.appendChild(bookPagesHead);
    bookPagesHead.classList.add("words");
    bookPagesHead.textContent = "Pages:";
    bookPagesHead.appendChild(pageBreak);

    const bookPages = document.createElement('p');
    bookContainer.appendChild(bookPages);
    bookPages.classList.add("words");
    bookPages.textContent = pages;
    bookPages.appendChild(pageBreak);
    //Add read section with appropriate color
    const bookReadHead = document.createElement('button');
    bookContainer.appendChild(bookReadHead);
    bookReadHead.classList.add("read");
    read == "Read" ? bookReadHead.style.color = "green" : bookReadHead.style.color = "red";
    bookReadHead.textContent = read;
    bookReadHead.appendChild(pageBreak);

    //Changes "Read" to "Not read yet" when clicked or vice versa
    bookReadHead.addEventListener("click", () => {
        if (bookReadHead.textContent == "Read") {
            bookReadHead.textContent = "Not read yet"
            bookReadHead.style.color = "red";
        } else {
            bookReadHead.textContent = "Read";
            bookReadHead.style.color = "green";
        }
    })

    //Delete button that deletes book card
    const deleteButton = document.createElement('button');
    bookContainer.appendChild(deleteButton);
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("read");
    deleteButton.style.color = "red";

    deleteButton.addEventListener('click', () => [
        books.removeChild(bookContainer)
    ])
    
}
function clearForm () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = null;
}