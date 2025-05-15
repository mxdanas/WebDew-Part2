const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) {
        throw new Error(`Failed to fetch tasks`);
      }
      const tasks = await res.json();
      if (!Array.isArray(tasks)) {
        throw new Error('Tasks data is not an array');
      }
  
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span><strong>${task.title}</strong>: ${task.description}</span>
          <div>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Edit</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    } catch (err) {
      console.error('Error loading tasks:', err);
      taskList.innerHTML = '<li>Error loading tasks</li>';
    }
  }
  
taskForm.addEventListener('submit',async(e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    if(taskForm.dataset.editingId){
        const id= taskForm.dataset.editingId;
        await fetch(`/api/tasks/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, description})
        });
        delete taskForm.dataset.editingId;
        taskForm.querySelector('button').textContent = 'Add Task';
    }else{
        await fetch('/api/tasks',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
    }
    taskForm.reset();
    fetchTasks();
});

async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`,{method: 'DELETE'});
    fetchTasks();
}
function editTask(id, title, description){
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    taskForm.dataset.editingId = id;  
    taskForm.querySelector('button').textContent = 'Update Task';
}

fetchTasks();
