const addBtn = document.getElementById('addBtn');
const displayBtn = document.getElementById('display-all-todo-list');
const createScreen = document.getElementById('create-screen');
const displayScreen = document.getElementById('display-screen');
const checkBox = document.getElementById('isCompleted');

    // Initialize Dexie database
    const db = new Dexie("ToDoDatabase");
    db.version(1).stores({
      todos: '++id,title,desc,completed, priority, due'
    });

// displayCreateForm function display a create a ToDo form
function displayCreateForm(){  
  createScreen.style.display = 'block';
  displayScreen.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {      

  // Add new todo item
  addBtn.addEventListener('click', async function(event) {
    event.preventDefault();    
    const title = document.getElementById('title-input').value.trim();
    const desc = document.getElementById('desc-input').value.trim();
    const option = document.querySelector('input[name="priority"]:checked').value;
    const dueDateInput = document.getElementById("due-date").value.trim();
    
    if (title && desc && option && dueDateInput) {
        await db.todos.add({
        title: title,
        desc: desc,
        completed: false,
        priority: option, 
        due: dueDateInput
      });

      document.getElementById('todoForm').reset();
      loadTodos();
    }
  });

  displayBtn.addEventListener('click', async function(event) {
    event.preventDefault();    
    createScreen.style.display = 'none';
    displayScreen.style.display = 'block';
    updateList();

  });

    // Load todos from IndexedDB
      async function loadTodos() {
        const todos = await db.todos.toArray();
        const list = document.getElementById('todoList1');
        list.innerHTML = '';

        todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = `${todo.title} -- ${todo.desc} -- Priority: ${todo.priority} -- Due Date: ${todo.due} - Completed: ${todo.completed}`;
        list.appendChild(li);
        list.style.fontSize = '13px';
        });
  }
  
   // Load todos list from IndexedDB
   async function updateList() {
   
    const todos = await db.todos.toArray();
    const list = document.getElementById('todoList2');
    list.innerHTML = '';

    todos.forEach(todo => {
    const li = document.createElement('li');
    const checkBox = document.createElement('input');
    const deleteBtn = document.createElement('button');
    checkBox.type = 'checkbox';
    checkBox.className = 'isCompleted';
    checkBox.dataset.todoId = todo.id;
    deleteBtn.type = 'button';
    deleteBtn.id = 'delete-button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.fontSize = '12px';

    // Label and checkbox
    li.textContent = `${todo.id}: ${todo.title} - ${todo.desc} - Priority: ${todo.priority} -- Due: ${todo.due} - Completed`;
    li.appendChild(checkBox);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    list.style.fontSize = '14px';

    checkBox.addEventListener('change', async function () {                
        if(checkBox.checked){            
           const update = await db.todos.update(todo.id, { completed: checkBox.checked });
          if(update){
            console.log("Todo updated successfully.");
           }else{
            console.warn("Update failed. Todo not found?");
           } 
           
        }else{
            alert('Checkbox is unchecked!')
            }

    });

    deleteBtn.addEventListener('click', async function() {        
            const idValue = todo.id;    
            if (!isNaN(idValue)) {
              const deleteRecord = await db.todos.delete(idValue);
              console.log(deleteRecord);
            } else {
              console.log("Please provide a valid ID to delete.");
                }
            updateList();
    })
});
    
} // End of updateList

}); // End document event handler

// clear the items table
/*db.todos.clear();*/


  
