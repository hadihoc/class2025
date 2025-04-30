const addScreenBtn = document.getElementById('add-item');
const readScreen = document.getElementById('read-screen');
const mainScreen = document.getElementById('main-screen');
const submitBtn = document.getElementById('submit-button'); 
const bottomDiv = document.getElementById('bottom-div');
const updateBtn = document.getElementById('update');
const deleteBtn = document.getElementById('delete');
const description = document.getElementById('model-description');
const modelID = document.getElementById('model-id');
const outputMsg = document.getElementById('output');
modelID.innerHTML = '';
description.innerHTML = '';

// Initialize Dexie and define a DB schema
const db = new Dexie("MyDatabase"); //// Create a new database instance named 'MyDatabase'
db.version(1).stores({
  items: '++id, description' // Define a table named 'items' with an auto-incrementing primary key (id) and an indexed 'name' field
});

// Read all items
async function readItems() {
    mainScreen.style.display = 'none';
    const allItems = await db.items.toArray();
    showOutput("Items: " + JSON.stringify(allItems, null, 2));
  }

// Display output in <pre>
function showOutput(msg) {
    document.getElementById("output").textContent = msg;
  }
 
// Add a new model
async function addModel() {
  const descValue = description.value.trim();
  const idValue = parseInt(modelID.value);

  if (!descValue) {
    showOutput('Please fill out the description field.');
    return;
  }

  if (descValue && !isNaN(idValue)) {
    await db.items.add({ description: descValue, id: idValue });
    showOutput(`Item added with ID ${idValue}.`);
  } else {
    await db.items.add({ description: descValue });
    showOutput("Item added.");
  }
}

// Update an existing item
async function updateItem() {
  const descValue = description.value.trim();
  const idValue = parseInt(modelID.value);

  if (!isNaN(idValue) && descValue) {
    await db.items.update(idValue, { description: descValue });
    showOutput(`Item ${idValue} updated with description: "${descValue}".`);
  } else {
    showOutput("Please provide a valid ID and description to update.");
  }
}
// Delete an item
async function deleteItem() {
  const idValue = parseInt(modelID.value);

  if (!isNaN(idValue)) {
    await db.items.delete(idValue);
    showOutput(`Item ${idValue} deleted.`);
  } else {
    showOutput("Please provide a valid ID to delete.");
  }
}

function displayForm() {    
  mainScreen.style.display = 'block'; 
  outputMsg.innerHTML = ''; 
}

document.addEventListener('DOMContentLoaded', function () {

  
updateBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  updateItem();
})

deleteBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  deleteItem();
})

});

// clear the items table
/*db.items.clear();*/
