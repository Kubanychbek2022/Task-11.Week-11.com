class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  };
}


class UI {
  addBook (book) {
    const bookList = document.getElementById("book-list");

    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td class="delete">${book.title}</td>
    <td class="delete">${book.author}</td>
    <td class="delete">${book.isbn}</td>
    <td class="delete"><button>X</button></td>`;
   
    bookList.append(tr);
  }


  showAlert (message, className) {
    const div = document.createElement("div");
    div.className = `window ${className}`;
    div.appendChild(document.createTextNode(message));

     const title = document.querySelector(".book-title");

    title.after(div);

    setTimeout(() => {
      document.querySelector(".window").remove();
    }, 4000);
  }


  clearStrings () {
    const title = document.getElementById("title").value = "";
    const author= document.getElementById("author").value = "";
    const isbn = document.getElementById("isbn").value = "";
  }


  removeBook (target) {
   if (target.className === "delete") {
    target.parentElement.remove();
   }
    }
  
}


class LocalStore {
  constructor() {
    this.key = "books";
  }

  getBooks () {
    let books;

    if (localStorage.getItem(this.key) !== null) {
      books = JSON.parse(localStorage.getItem(this.key));
    } else {
      books = [];
    }

    return books;
  }

  addBooks (book) {
    let books = this.getBooks();

    books.push(book);

    localStorage.setItem(this.key, JSON.stringify(books));

  }


  displayBooks () {
    let books = this.getBooks();
    
    books.forEach(function (book) {
      const ui = new UI();
      ui.addBook(book);
   });

  }

  
  removeStore () {
    let books = this.getBooks();

    books.forEach(() => {
      for (let i = 0; i < books.length; i++) {
        if (books.title !== "") {
          books.splice(i, 1);

          localStorage.setItem(this.key, JSON.stringify(books));
        }
      }
    })
  }

}






document.getElementById("book-form").addEventListener("submit", addBookToList);

function addBookToList (e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();
  const store = new LocalStore();
 
  
  
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Заполните все поля", "error");
  } else {
    ui.addBook(book);
    store.addBooks(book);
    ui.clearStrings();
    ui.showAlert("Книга добавлена!", "success");
    
  }
  
  e.preventDefault();
}



const store = new LocalStore();
 
 window.addEventListener("load", store.displayBooks());




document.querySelector("#book-list").addEventListener("click", function (e) {
  const ui = new UI();
  const store = new LocalStore();
 const btnDelete = document.querySelector(".delete");
  ui.removeBook(btnDelete);
  store.removeStore();
  ui.showAlert("Книга удалено", "success");
  
  e.preventDefault();
})
