const API_URL = 'http://localhost:3000/tasks';

document.addEventListener('DOMContentLoaded', fetchTasks);

function fetchTasks() {
  fetch(API_URL)
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Due Date: ${task.dueDate}</p>
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskElement);
      });
    });
}

function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, dueDate })
  })
  .then(response => response.json())
  .then(() => {
    fetchTasks();
  });
}

function editTask(id) {
  // Implement edit functionality (can be similar to addTask but with PUT request)
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    fetchTasks();
  });
}