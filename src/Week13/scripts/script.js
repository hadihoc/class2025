
const addItemBtn = document.getElementById('add');
const addScreenBtn = document.getElementById('add-item');
const readScreen = document.getElementById('read-screen');
const addScreen = document.getElementById('add-screen');
const deleteItemBtn = document.getElementById('delete-item');

// Initialize Dexie and define a DB schema
const Db = new Dexie("MyDatabase");
Db.version(1).stores({
  items: '++id, firstName, lastName, email' 
});
 

// Read all items
async function readItems() {
  const allItems = await Db.items.toArray();
  showOutput("Items: " + JSON.stringify(allItems, null, 2));
}

// Update the first item
async function updateFirstItem() {
  addScreen.style.display = 'block';
  const first = await Db.items.orderBy('id').first();
  if (first) {
    await Db.items.update(first.id, { name: "Updated Name" });
    showOutput(`Item ${first.id} updated.`);
  } else {
    showOutput("No items to update.");
  }
}

// Delete the first item
async function deleteFirstItem() {
  const first = await Db.items.orderBy('id').first();
  if (first) {
    await Db.items.delete(first.id);
    showOutput(`Item ${first.id} deleted.`);
  } else {
    showOutput("No items to delete.");
  }
}

// Display output in <pre>
function showOutput(msg) {
  document.getElementById("output").textContent = msg;
}

// Read all items
async function readItems() {
  addScreen.style.display = 'none';
  readScreen.style.display = 'block';
  const allItems = await db.items.toArray();
  showOutput("Items: " + JSON.stringify(allItems, null, 2));
}

// Update the first item
async function updateFirstItem() {
  const first = await Db.items.orderBy('id').first();
  if (first) {
    await Db.items.update(first.id, { name: "Updated Name" });
    showOutput(`Item ${first.id} updated.`);
  } else {
    showOutput("No items to update.");
  }
}

// Delete the first item
async function deleteFirstItem() {
  const first = await Db.items.orderBy('id').first();
  if (first) {
    await Db.items.delete(first.id);
    showOutput(`Item ${first.id} deleted.`);
  } else {
    showOutput("No items to delete.");
  }
}

// Display output in <pre>
function showOutput(msg) {
  document.getElementById("output").textContent = msg;
}

document.addEventListener('DOMContentLoaded', function () {
    addItemBtn.addEventListener('click', (event) => {
        event.preventDefault();       
        const first = document.getElementById('first-name-input').value;
        const last = document.getElementById('last-name-input').value;
        const email = document.getElementById('email-input').value;    
        const itemId = document.getElementById('item-id').value;    
        addItem(first, last, email, itemId);
    });

   
    // Add an item     
    async function addItem(first, last, email, itemId) {  
        if (!first || !last || !email) {
            alert("Please fill out all fields.");
            return;
        }else if( !first || !last || !email || !itemId ){
            await Db.items.add({ firstName: `${first}`, 
                                 lastName:  `${last}`,
                                 email: `${email}`  
          })
        }
        else {
            await Db.items.add({ id: `${itemId}`, firstName: `${first}`, 
                                 lastName:  `${last}`,
                                email: `${email}`  
            
            });
          }
        alert("Item added.");
    
    } //End addItem function

}); //End DOMContentLoaded
addScreenBtn.addEventListener('click', () => {     
  readScreen.style.display = 'none';
  addScreen.style.display = 'block';
  
});
deleteItemBtn.addEventListener('click', () => {   
  deleteItem();
});
// Delete the item
async function deleteItem() {
  const ID = document.getElementById('item-id');
  idNumber = ID. value;

  if (idNumber) {
    await Db.items.delete(idNumber.id);
    showOutput(`Item ${idNumber.id} deleted.`);
  } else {
    showOutput("No items to delete.");
  }
}

async function updateItem() {
  /*addScreen.style.display = 'block';*/  
  const id = document.getElementById('item-id');
  const firstName = document.getElementById('first-name-input');
  const lastName = document.getElementById('last-name-input');
  const email = document.getElementById('email-input');
  idNumber = id.value;
  first = firstName.value;
  last = lastName.value;
  e = email.value; 

  if (idNumber && first && last && e) {
   
        await Db.items.update(idNumber.id, { firstName: first, lastName: last, email: e});
        alert(`Item ${idNumber} , ${first}, ${last} updated.`);
     
  } else {
    showOutput("No items to update.");
  }
}
// Initialize Dexie and define a DB schema
const Db = new Dexie("MyDatabase");
Db.version(1).stores({
  items: '++id, name'
});

// Add an item
async function addItem() {
  await Db.items.add({ name: "Hello Dexie" });
  showOutput("Item added.");
}

// Read all items
async function readItems() {
  const allItems = await Db.items.toArray();
  showOutput("Items: " + JSON.stringify(allItems, null, 2));
}

// Update the first item
async function updateFirstItem() {
  const first = await Db.items.orderBy('id').first();
  if (first) {
    await Db.items.update(first.id, { name: "Updated Name" });
    showOutput(`Item ${first.id} updated.`);
  } else {
    showOutput("No items to update.");
  }
}

// Delete the first item
async function deleteFirstItem() {
  const first = await Db.items.orderBy('id').first();
  if (first) {
    await Db.items.delete(first.id);
    showOutput(`Item ${first.id} deleted.`);
  } else {
    showOutput("No items to delete.");
  }
}

// Display output in <pre>
function showOutput(msg) {
  document.getElementById("output").textContent = msg;
}
