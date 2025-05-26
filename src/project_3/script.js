const admin = document.getElementById("admin_login");
const checkoutBtn = document.getElementById("ckout_btn");
const viewBtn = document.getElementById("view_btn");
const logoutBtn = document.getElementById("logout");
const addScreen = document.getElementById("add_screen");
const bookInfScreen = document.getElementById("book_info");
const bookList = document.getElementById("book_list");
viewBtn.disabled = true;
checkoutBtn.disabled = true;
logoutBtn.disabled = true;

admin_dict = {
              "anna@scf": "Iam12345",
              "andrea@scf": "Sheis6789"               
}

/* Add event listener to the administration login button*/
admin.addEventListener('click', ()=> {
  admin.disabled = true;
  const warning = '⚠️Authorize Access Only⚠️';
  alert(warning);
  /* Create a div tag for log in screen*/
  const login_div = document.getElementById("login_screen");  
  /* Create an input tag for user name */
  const user_name_input = document.createElement("input");
  user_name_input.type = 'text';
  user_name_input.placeholder = 'user name';
  user_name_input.id = 'user';
  user_name_input.style.height = '30px';
  user_name_input.style.width = '150px';
  user_name_input.style.marginRight = '15px';

  /* Create an input for password */
  const password_input = document.createElement("input");
  password_input.type = 'text';
  password_input.placeholder = 'password';
  password_input.id = 'password';
  password_input.style.height = '30px';
  password_input.style.width = '150px';
  password_input.style.marginRight = '15px';

  /* Create  a button for submitting user name and password*/
  const submitBtn = document.createElement("button"); 
  submitBtn.type = 'button';
  submitBtn.id = 'submit';
  submitBtn.innerText = 'SUBMIT';
  submitBtn.style.color = '#0247FE';
  submitBtn.style.fontWeight = 'bold';
  submitBtn.style.borderRadius = '5px';
  submitBtn.style.height = '30px';
  submitBtn.style.width = '80px';
    
  /* Add two input tags and two button tags inside log in screen div*/
  login_div.appendChild(user_name_input);
  login_div.appendChild(password_input);
  login_div.appendChild(submitBtn);
  
  /* Get elements by their ids*/
  const submit = document.getElementById("submit");
  const user_name = document.getElementById("user");
  const password = document.getElementById("password");
  
  /* Format the log in screen div for admin login */
  login_div.style.background = 'whitesmoke';
  login_div.style.width = '530px';
  login_div.style.padding = '40px'; 
  login_div.style.marginTop = '20px';
  login_div.style.marginLeft = '10px';
  login_div.style.display = 'block';
  login_div.style.boxShadow = "10px 10px 5px rgba(0, 0, 0, 0.5)";
  login_div.style.borderRadius = '5px';
  login_div.style.backgroundColor = '#E6E6FA';
  login_div.style.opacity = '60%';

  /* Add event listener to a submit button, if click occurs, check for user name and password */
    submit.addEventListener('click', () => {
        if (user_name.value in admin_dict){
            if (admin_dict[user_name.value] == password.value){
                login_div.style.display = 'none';  
                bookList.style.display = 'block'; 
                successfully_login();
                password_input.remove();
                user_name_input.remove();
                submitBtn.remove(); 
               
            }else{
               invalid_login();
               console.log("Invalid user name or password: " + user_name.value + ' ' + password.value); 
            }
        }else{
          invalid_login();
      }

  });

 
});

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
  displayBooks();
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
  
  if ( title && author ){
    const tx = db.transaction("books", "readwrite");
    const store = tx.objectStore("books");

    const book = { title, author, checkedOut: false };
    store.add(book);

    tx.oncomplete = () => {
      displayBooks();
      document.getElementById("title").value = '';
      document.getElementById("author").value = '';
    };
  }else{
    alert("Please enter the book title and its author!");
  }
}

/* This updateBook function update book by its id */
function updateBook() {
  let idNum = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const id = parseInt(idNum);
  

    const tx = db.transaction("books", "readwrite");
    const store = tx.objectStore("books");
    const request = store.get(id);
  if ( title && author ){
    request.onsuccess = () => {
      const book = request.result;
      if (book) {
        book.title = title;
        book.author = author;

        store.put(book); // Updates the existing record
      } else {
        console.error("Book not found with ID:", id);
        }
    };

    tx.oncomplete = () => {
      displayBooks();
      document.getElementById("title").value = '';
      document.getElementById("author").value = '';
    };

    request.onerror = () => {
      console.error("Failed to retrieve book for update.");
    };
  } else {
      alert("Please enter the book title and its author!");
  }
}

function deleteBook() {
  let idNum = document.getElementById("id").value;
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  const id = parseInt(idNum);

  const tx = db.transaction("books", "readwrite");
  const store = tx.objectStore("books");
  
  const request = store.delete(id);

  request.onsuccess = () => {
    console.log(`Book with ID ${id} deleted.`);
  };

  request.onerror = () => {
    console.error("Failed to delete book with ID:", id);
  };

  tx.oncomplete = () => {
    displayBooks(); // Refresh the displayed list
  };
}

function displayByTitles() {
  const booksDiv = document.getElementById("books");
  booksDiv.innerHTML = "";

  const tx = db.transaction("books", "readonly");
  const store = tx.objectStore("books");

  const titleIndex = store.index("title");

  titleIndex.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const { id, title, author } = cursor.value;

      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      bookDiv.innerHTML = `
         <strong>${id}</strong> - 
         <strong>${title}</strong> by ${author}`;

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
    tx.oncomplete = checkout; 
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
      const { id, title, author} = cursor.value;

      const bookDiv = document.createElement("div");
      bookDiv.className = "book";

      bookDiv.innerHTML = ` 
         <strong>${id}</strong> -      
         <strong>${title}</strong> by ${author} 
      `;      
      booksDiv.appendChild(bookDiv); 
      cursor.continue();
    }
  };
}

function checkout() {
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
      const statusText = checkedOut ? "Checked Out" : "Available";
      const statusColor = checkedOut ? "red" : "green";
      const buttonText = checkedOut ? "Check In" : "Check Out";
      const buttonColor = checkedOut ? "purple" : "blue";

      bookDiv.innerHTML = `
        <strong>${id}</strong> -
        <strong>${title}</strong> by ${author} 
        <span style="color: ${statusColor};">[${statusText}]</span>
        <button style="color: ${buttonColor};" onclick="toggleCheck(${id}, ${checkedOut})">
          ${buttonText}
        </button>
      `;

      booksDiv.appendChild(bookDiv);
      cursor.continue();
    }
  };
}

/* Add Event Listener to the Admin logout button and take away the update screen menu and book list view*/
logoutBtn.addEventListener('click', ()=>{   
   addScreen.style.display = 'none';
   bookList.style.display = 'none';
   logoutBtn.disabled = true;
   checkoutBtn.disabled = true;
   viewBtn.disabled = true;
   admin.disabled = false;   
     
})

/* This function will notify user about their invalid user name or password*/
function invalid_login() {
  alert("⚠️ You've entered an invalid user name or password ⚠️. Please try again.");
}

/* This function will able top menu buttons, display add screen for modifying, and display all books, 
   disable login screen and remove all elements in login screen */
function successfully_login(){
      
     
      checkoutBtn.disabled = false;
      viewBtn.disabled = false; 
      logoutBtn.disabled = false; 
      admin.disabled = true;      
      addScreen.style.display = 'block';         

      alert("You've successfuly login to the Library System.");       
  
}
