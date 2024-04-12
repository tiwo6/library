const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} written by ${this.author}, containing ${this.pages} pages.`;
    };
}

const hobbitBook = new Book("The Hobbit", "J.R.R Tolkein", "256", false);
const lotrBook = new Book("The Lord of The Rings", "J.R.R Tolkein", "350", true);
const eragonBook = new Book("Eragon", "Christopher Paolini", "487", true);

addBookToLibrary(hobbitBook);
addBookToLibrary(lotrBook);
addBookToLibrary(eragonBook);

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

const container = document.getElementById("container");

function createCard(book) {
    let card = document.createElement("div");
    container.appendChild(card);
    card.classList.add("card");
    let text = document.createElement("div");   
    let toggleContainer = document.createElement("div");
    toggleContainer.classList.add("toggle-container");
    let toggleText = document.createElement("div");
    toggleText.classList.add("toggle-text"); 
    let toggle = document.createElement("div");
    toggle.classList.add("toggle");
    if (book.read == true) {
        toggle.classList.add("active");
        toggleText.textContent = "Read";
    }
    else {
        toggleText.textContent = "Not Read";
    }
    toggle.addEventListener("click", function(e) {
        toggle.classList.toggle("active"); 
        if (toggle.classList.contains("active")) {
            toggleText.textContent = "Read";
            book.read= true;
        }
        else {
            toggleText.textContent = "Not Read";
            book.read = false;
        }
        });
    let readButton = document.createElement("div");
    readButton.classList.add("toggle-button");
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent ="Remove";
    removeButton.setAttribute("element", myLibrary.indexOf(book));
    removeButton.addEventListener("click", function(e) {
        this.parentNode.remove();
        let deletedItem = this.getAttribute("element");
        delete myLibrary[deletedItem];
        console.log(myLibrary);
        }
    );
    card.appendChild(text);
    card.appendChild(toggleContainer);
    card.appendChild(removeButton);
    toggleContainer.appendChild(toggle);
    toggleContainer.appendChild(toggleText);
    toggle.appendChild(readButton);
    text.textContent = book.info();
}

function showLibrary() {
    let i = 0;
    while (i < myLibrary.length) {
        createCard(myLibrary[i]);
        i++;
    }
}

function updateLibrary() {
    createCard(myLibrary[myLibrary.length-1]);
}
showLibrary();

const openBtn = document.getElementById("openModal");
const submitBtn = document.getElementById("closeModal");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close");

openBtn.addEventListener("click", () => {
    dialog.showModal();
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const author = document.getElementById("author").value
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("isRead").checked;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    updateLibrary();
    dialog.close();    
    const form = document.getElementById("addBookForm");
    form.reset();
})

closeBtn.addEventListener("click", (e) => {
    dialog.close();
    const form = document.getElementById("addBookForm");
    form.reset();
})
