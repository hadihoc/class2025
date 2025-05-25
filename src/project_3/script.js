const admin = document.getElementById("admin_login");
const checkoutBtn = document.getElementById("ckout_btn");
const checkinBtn = document.getElementById("ckin_btn");
const viewBtn = document.getElementById("view_btn");
const logoutBtn = document.getElementById("logout");
const addScreen = document.getElementById("add_screen");
const bookInfScreen = document.getElementById("book_info");
const bookList = document.getElementById("book_list");

logoutBtn.disabled = true;
checkoutBtn.disabled = true;
viewBtn.disabled = true;
admin.disabled = false;

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
  let entry_counter = 0;

  /* Add event listener to a submit button, if click occurs, check for user name and password */
  submit.addEventListener('click', () => {
    if(user_name.value in admin_dict){
     /*Object.values(admin_dict).forEach(() => {
        /*Object.values(admin_dict) extracts all values from the admin_dict object and returns them as an array 
          .includes(targetValue) checks if the array contains 
          The ! negates the result — so if the password.value is not found, the alert() is triggered.*/
        if (!Object.values(admin_dict).includes(password.value)){  
               
        }
        else{         
             entry_counter += 1;   
        }        
    }
    if(entry_counter < 1){
      alert("⚠️ You've entered an invalid user name ⚠️. Please try again.");
    }
    if(entry_counter > 1){
      addScreen.style.display = 'block';  
      login_div.style.display = 'none';   
      checkoutBtn.disabled = false;
      viewBtn.disabled = false; 
      logoutBtn.disabled = false; 
      admin.disabled = true; 
      bookList.style.display = 'block'; 
      password_input.remove();
      user_name_input.remove();
      submitBtn.remove();
      alert("You've successfuly login to the Library System.");         
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

  const tx = db.transaction("books", "readwrite");
  const store = tx.objectStore("books");

  const book = { title, author, checkedOut: false };
  store.add(book);

  tx.oncomplete = () => {
    displayBooks();
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
  };
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
logoutBtn.addEventListener('click', ()=>{   
   addScreen.style.display = 'none';
   bookList.style.display = 'none';
   logoutBtn.disabled = true;
   checkoutBtn.disabled = true;
   viewBtn.disabled = true;
   admin.disabled = false;   
  /* alert("You've successfully logout."); */
   
})
