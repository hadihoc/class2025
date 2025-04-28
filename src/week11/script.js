// Initialize Dexie and define a DB schema
const db = new Dexie("MyDatabase");
db.version(1).stores({
  items: '++id, name'
});

db.items.clear()
  .then(() => {
    showOutput('Table has been cleared');
  })
  .catch((error) => {
    showOutput('Failed to clear table: ', error);
  });
  
// Add an item
async function addItem() {
  await db.items.add({ name: "Hello Dexie" });
  showOutput("Item added.");
}

// Read all items
async function readItems() {
  const allItems = await db.items.toArray();
  showOutput("Items: " + JSON.stringify(allItems, null, 2));
}

// Update the first item
async function updateFirstItem() {
  const first = await db.items.orderBy('id').first();
  if (first) {
    await db.items.update(first.id, { name: "Updated Name" });
    showOutput(`Item ${first.id} updated.`);
  } else {
    showOutput("No items to update.");
  }
}

// Delete the first item
async function deleteFirstItem() {
  const first = await db.items.orderBy('id').first();
  if (first) {
    await db.items.delete(first.id);
    showOutput(`Item ${first.id} deleted.`);
  } else {
    showOutput("No items to delete.");
  }
}

// Display output in <pre>
function showOutput(msg) {
  document.getElementById("output").textContent = msg;
}
