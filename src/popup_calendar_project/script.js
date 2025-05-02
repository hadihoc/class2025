const titleInput = document.getElementById("title");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTask");

// Initialize Dexie database
const db = new Dexie("TaskDatabase");
db.version(1).stores({
  tasks: '++id, title, dueDate'
});


document.addEventListener('DOMContentLoaded', function() {      

    // Add task to database
    addTaskBtn.addEventListener("click", async () => {
      alert("add btn");
      const title = titleInput.value.trim();
      const dueDateValue = dueDateInput.value;
    
      if (!title || !dueDateValue) {
        alert("Please enter both title and due date.");
        return;
      }

      const dueDate = new Date(dueDateValue);
      await db.tasks.add({ title, dueDate });

      titleInput.value = '';
      dueDateInput.value = '';
      loadTasks();
    });


// Load and display tasks
async function loadTasks() {
  const tasks = await db.tasks.orderBy("dueDate").toArray();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement("li");
    const formattedDate = task.dueDate.toLocaleDateString();
    li.textContent = `${task.title} — due ${formattedDate}`;
    taskList.appendChild(li);
  });
}
async function loadSortedTasks() {
  const tasks = await db.tasks.orderBy("dueDate").toArray(); // Get all tasks sorted by due date
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ''; // Clear previous content

  if (tasks.length === 0) {
    taskList.innerHTML = '<li>No tasks found.</li>';
    return;
  
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    const formattedDate = task.dueDate.toLocaleDateString();
    li.textContent = `${task.title} — due ${formattedDate}`;
    taskList.appendChild(li);
  });
}

});
// Initial load
loadTasks();
