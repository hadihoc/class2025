const admin = document.getElementById("admin_login");
const checkoutBtn = document.getElementById("ckout_btn");
const checkinBtn = document.getElementById("ckin_btn");
const viewBtn = document.getElementById("view_btn");
checkoutBtn.disabled = true;
checkinBtn.disabled = true;
viewBtn.disabled = true;

admin_dict = {
              "anna@scf": "Iam12345",
              "andrea@scf": "Sheis6789"               
}

/* Add event listener to the administration login button*/
admin.addEventListener('click', ()=> {

  /* Create a div tag for log in screen*/
  const login_div = document.getElementById("login_screen");

  /* Create an input tag for user name */
  const user_name_input = document.createElement("input");
  user_name_input.type = 'text';
  user_name_input.placeholder = 'user name';
  user_name_input.id = 'user';
  user_name_input.style.height = '30px';
  user_name_input.style.width = '150px';
  
  /* Create an input for password */
  const password_input = document.createElement("input");
  password_input.type = 'text';
  password_input.placeholder = 'password';
  password_input.id = 'password';
  password_input.style.height = '30px';
  password_input.style.width = '150px';
  
  /* Create  a button for submitting user name and password*/
  const submitBtn = document.createElement("button"); 
  submitBtn.type = 'button';
  submitBtn.id = 'submit';
  submitBtn.innerText = 'SUBMIT';
  submitBtn.style.height = '30px';
  submitBtn.style.width = '80px';
  
  
  /* Create a button for log out Library System*/
  const logoutBtn = document.createElement("button");
  logoutBtn.type = 'button';
  logoutBtn.id = 'submit';
  logoutBtn.innerText = 'LOG OUT';
  logoutBtn.style.height = '30px';
  logoutBtn.style.width = '80px';
  
  /* Add two input tags and two button tags inside log in screen div*/
  login_div.appendChild(user_name_input);
  login_div.appendChild(password_input);
  login_div.appendChild(submitBtn);
  login_div.appendChild(logoutBtn);
  
  /* Get elements by their ids*/
  const submit = document.getElementById("submit");
  const user_name = document.getElementById("user");
  const password = document.getElementById("password");
  
  /* Set the log in screen div background color*/
  login_div.style.background = 'whitesmoke';
  login_div.style.width = '540px';
  login_div.style.paddingLeft = '10px';
  /* Add event listener to a submit button, if click occurs, check for user name and password */
  submit.addEventListener('click', () => {
    if(user_name.value in admin_dict){
      Object.values(admin_dict).forEach(() => {
        /*Object.values(admin_dict) extracts all values from the admin_dict object and returns them as an array 
          .includes(targetValue) checks if the array contains 
          The ! negates the result — so if the password.value is not found, the alert() is triggered.*/
        if (!Object.values(admin_dict).includes(password.value)){
            alert("⚠️ You've entered an invalid password ⚠️");
        }
        else{
          alert("true");
            checkoutBtn.disabled = false;
            checkinBtn.disabled = false;
            viewBtn.disabled = false; 
                  
        }
      })
    }else{
      alert("⚠️ You've entered an invalid user name ⚠️");
    }
  })

admin.disabled = true;
})

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

