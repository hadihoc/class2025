/* Create a placeholder variable called db for:
   db gets assigned the actual database connection object (IDBDatabase)
   use db to start transactions, access object stores, read/write data*/
let db;

/*Create a database called LibraryDB with version 1 
  indexedDB - the global browser API used to interact with IndexedDB, a client-side
  NoSQL database
  .open(name of the database, version) method to open a db (or create it if it doesn't exist*/
const request = indexedDB.open("LibraryDB", 1);

/* request.onerror event, catch errors (onerror) if it fails to connect to the db*/
request.onerror = (event) => {
  /* Alert the user if it fails to connect the DB*/
  alert("Oops! We couldn't open the library database. Please try refreshing the page or check your browser settings.")
  console.error("Database error:", event.target.errorCode);
};

/* request.onsuccess event, if it opens successfully */
request.onsuccess = (event) => {
 
  /* assign the opened database to the placeholder variable*/  
  db = event.target.result;

  /* Call the displayBooksOnly function, checkout or checkin status is hidden*/
  displayBooksOnly();
};

/* request.onupgradeneeded, if it's a new DB or version upgrade */
request.onupgradeneeded = (event) => {
  db = event.target.result;
  const store = db.createObjectStore("books", { keyPath: "id", autoIncrement: true });
  store.createIndex("title", "title", { unique: false });
};

/* This addBook function adds a book to the LibraryDB*/
function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  const tx = db.transaction("books", "readwrite");
  const store = tx.objectStore("books");

  const book = { title, author, checkedOut: false };
  store.add(book);

  tx.oncomplete = () => {
    displayBooksOnly();
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
  };
}


function displayBooksOnly() {
  const booksDiv = document.getElementById("books");
  booksDiv.innerHTML = "";

  const tx = db.transaction("books", "readonly");
  const store = tx.objectStore("books");

  store.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const {title, author} = cursor.value;

      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      bookDiv.innerHTML = `
        <strong>${title}</strong> by ${author} `
      
      booksDiv.appendChild(bookDiv);

      cursor.continue();
    }
  };
}

function toggleCheck(id, currentStatus) {
  const tx = db.transaction("books", "readwrite");
  const store = tx.objectStore("books");

  const request = store.get(id);
  request.onsuccess = () => {
    const book = request.result;
    book.checkedOut = !currentStatus;
    store.put(book);
    tx.oncomplete = displayBooks;
  };
}

function displayBooks() {
  const booksDiv = document.getElementById("books");
  booksDiv.innerHTML = "";

  const tx = db.transaction("books", "readonly");
  const store = tx.objectStore("books");

  store.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const { id, title, author, checkedOut } = cursor.value;

      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      bookDiv.innerHTML = `
        <strong>${title}</strong> by ${author} 
        [${checkedOut ? "Checked Out" : "Available"}]
        <button onclick="toggleCheck(${id}, ${checkedOut})">
          ${checkedOut ? "Check In" : "Check Out"}
        </button>
      `;
      booksDiv.appendChild(bookDiv);

      cursor.continue();
    }
  };
}

// clear the books table
function clearBooks() {
  const tx = db.transaction("books", "readwrite");
  const store = tx.objectStore("books");

  const clearRequest = store.clear();

  clearRequest.onsuccess = () => {
    console.log("All books have been cleared.");
    displayBooks(); // Refresh the UI if needed
  };

  clearRequest.onerror = (event) => {
    console.error("Failed to clear books:", event.target.error);
    alert("⚠️ Failed to clear the books list.");
  };
}

