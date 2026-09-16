let library = [];
const libraryContainer = document.querySelector("#library-container");
const dialog = document.querySelector('#book-dialog')

function Book(title, author, pages, read_status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_status = read_status;
}

function addBookToLibrary(title, author, pages, read_status) {
    const book = new Book(title, author, pages, read_status);
    library.push(book);

    createNewBookCard(book);
}

addBookToLibrary("one", "two", 3, true);

console.log(library);

function createNewBookCard(book) {
    const newCard = document.createElement("div");
    newCard.classList.add("book-card");

    const title = document.createElement("h2");
    title.textContent = book.title;
    title.classList.add("book-title");
    newCard.appendChild(title);

    const author = document.createElement("h3");
    author.textContent = book.author;
    author.classList.add("book-author");
    newCard.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = book.pages;
    pages.classList.add("book-pages");
    newCard.appendChild(pages);

    const isRead = document.createElement("h2");
    isRead.textContent = book.read_status? "Read" : "Not Read";
    isRead.classList.add("book-status");
    newCard.appendChild(isRead);

    const buttons = document.createElement("div");
    buttons.classList.add("button-group");

    const readBtn = document.createElement("button");
    readBtn.textContent = "Toggle Read";
    readBtn.classList.add("toggle-read-btn");
    buttons.appendChild(readBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    buttons.appendChild(removeBtn);

    newCard.addEventListener('click', (event) => {
        if (event.target.classList.contains("toggle-read-btn")) {
            book.read_status = !book.read_status;
            isRead.textContent = book.read_status? "Read" : "Not Read";
        }
        else if (event.target.classList.contains("remove-btn")) {
            
            library = library.filter(item => item != book);
            libraryContainer.removeChild(newCard);
            console.log(library);
        }
    });

    newCard.appendChild(buttons);

    libraryContainer.appendChild(newCard);
    console.log(library);
}

function HandleClick(event) {
    const button = event.target.closest('button');

    if (!button) return;

    if (button.id === 'new-book-btn') {

        dialog.showModal();

    }

    else if (button.classList.contains('submit-btn')) {

            event.preventDefault();

            const title = dialog.querySelector('#title').value;
            const author = dialog.querySelector('#author').value;
            const pages = dialog.querySelector('#pages').value;
            const isRead = dialog.querySelector('#isRead').checked;

            if (!title || !author || !pages) return;

            addBookToLibrary(title, author, pages, isRead);

            dialog.close();
            dialog.querySelector('#book-form').reset();

        }

    else if (button.classList.contains('cancel-btn')) {
        event.preventDefault();
        dialog.close();

        dialog.querySelector('#book-form').reset();
    }
}

document.addEventListener('click', HandleClick)

