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
 
async function addModel() {   
      const description = document.getElementById('model-description').value;
      const modelID = document.getElementById('model-id').value;
      if (!description){
        showOutput('Please fill out the description field.');
      }else if (description && modelID) {
            await db.items.add({ description: `${description}`, id: `${modelID}` });
            showOutput("Item added.");
      }else {
            await db.items.add({ description: `${description}` });
            showOutput("Item added.");
      }     
      
}
      
async function updateItem() {  
  let modelDescription = description.value;
  let model_id = modelID.value;
      if (model_id && modelDescription) {             
          await db.items.update(model_id, {description: modelDescription});
              showOutput(`Item ${model_id} , ${modelDescription} updated.`);
           
      } else {
          showOutput("No items to update.");
        }
}

// Delete the first item
async function deleteItem() {  
  let model_id = modelID.value;
  if (model_id) {
      await db.items.delete(model_id);
      showOutput(`Item ${model_id} deleted.`);
  } else {
      showOutput("No items to delete.");
    }
}

function displayForm() {    
  mainScreen.style.display = 'block'; 
  outputMsg.innerHTML = ''; 
  location.reload;
}

document.addEventListener('DOMContentLoaded', function () {

  
updateBtn.addEventListener('click', (e) =>{
  e.defaultPrevented();
  updateItem();
})

deleteBtn.addEventListener('click', (e) =>{
  e.defaultPrevented();
  deleteItem();
})

});

// clear the items table
/*db.items.clear();*/
