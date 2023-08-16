class BookCollection {
//   constructor() {
//     this.books = [];
//     this.getBooksFromStorage();
//     this.displayBooks();
//   }

//   getBooksFromStorage() {
//     const storedBooks = localStorage.getItem('books');
//     if (storedBooks) {
//       this.books = JSON.parse(storedBooks);
//     }
//   }

  saveBooksToStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBookToCollection(title, author) {
    const book = {
      id: Math.floor(Math.random() * 1000),
      title,
      author,
    };
    this.books.push(book);
    this.saveBooksToStorage();
  }

//   removeBookFromCollection(id) {
//     const index = this.books.findIndex((book) => book.id === id);
//     if (index !== -1) {
//       this.books.splice(index, 1);
//       this.saveBooksToStorage();
//     }
//   }

  displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    this.books.forEach((book) => {
      const bookItem = document.createElement('tr');
      const bookTitle = document.createElement('td');
      const bookAuthor = document.createElement('td');
      const removeButton = document.createElement('button');

      bookTitle.textContent = `"Title": ${book.title} by`;
      bookAuthor.textContent = `Author: ${book.author}`;
      removeButton.textContent = 'Remove';

      removeButton.addEventListener('click', () => {
        this.removeBookFromCollection(book.id);
        this.displayBooks();
      });

      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(removeButton);

      bookList.appendChild(bookItem);
    });
  }

  addBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title && author) {
      this.addBookToCollection(title, author);
      titleInput.value = '';
      authorInput.value = '';
      this.displayBooks();
    }
  }
}

const bookCollection = new BookCollection();

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => bookCollection.addBook());