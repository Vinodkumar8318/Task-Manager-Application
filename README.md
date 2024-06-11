# ☑️ Task-Manager-Application ☑️

## ABOUT THE REPOSITORY

#### This Task Management Application allows users to add, view, edit, and delete tasks. The application consists of a front-end interface for user interactions and a back-end server to handle API requests.####


![image](https://github.com/Vinodkumar8318/Task-Manager-Application/assets/142583979/b6fc5dec-c4f4-4b95-aaae-2a11afd67cef)


## File structure ###
  - **index.html**: The main HTML file that serves the front-end interface.
  - **styles.css**: The CSS file for styling the application.
  - **script.js**: The JavaScript file containing the logic for fetching, adding, editing, and deleting tasks.
  - **server.js**: The Node.js server file that handles API requests.
  - **package.json**: The npm package file that lists the dependencies required for the server.


## 1. Adding a Task
![image](https://github.com/Vinodkumar8318/Task-Manager-Application/assets/142583979/f6c6d525-6c8a-4c6d-b566-3b9163020a47)

## 2. Editing and Deleting a Task
![image](https://github.com/Vinodkumar8318/Task-Manager-Application/assets/142583979/04d1af57-eccb-40b8-a6cb-30bb2cf8fa4f)

## 3. Adding Muiltplt Tasks
![image](https://github.com/Vinodkumar8318/Task-Manager-Application/assets/142583979/5f54e93e-9648-4024-94cb-3e077472141b)



 # CODES
<details>
  <summary> 1. index.html </summary>
<br>

                <!DOCTYPE html>
             <html lang="en">
                <head>
                  <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>Task Management App</title>
                 <link rel="stylesheet" href="styles.css">
               </head>
               <body>
                 <div class="container">
                   <h1>Task Management Application</h1>
                   <div class="task-form">
                     <input type="text" id="title" placeholder="Task Title">
                     <textarea id="description" placeholder="Task Description"></textarea>
                     <input type="date" id="dueDate">
                    <button onclick="addTask()">Add Task</button>
                   </div>
                   <div class="task-list" id="taskList">
                     <!-- Tasks will be dynamically added here -->
                   </div>
                 </div>
                 <script src="script.js"></script>
                </body>
               </html>

</details>


<details>
  <summary> 2. script.js </summary>
<br>


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

</details>


<details>
  <summary> 3. server.js </summary>
<br>

          const express = require('express');
        const bodyParser = require('body-parser');
        const cors = require('cors');
        
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        
        let tasks = [];
        let currentId = 1;
        
        app.get('/tasks', (req, res) => {
          res.json(tasks);
        });
        
        app.post('/tasks', (req, res) => {
          const { title, description, dueDate } = req.body;
          const newTask = { id: currentId++, title, description, dueDate };
          tasks.push(newTask);
          res.json(newTask);
        });
        
        app.get('/tasks/:id', (req, res) => {
          const task = tasks.find(t => t.id === parseInt(req.params.id));
          if (!task) {
            return res.status(404).send('Task not found');
          }
          res.json(task);
        });
        
        app.put('/tasks/:id', (req, res) => {
          const { title, description, dueDate } = req.body;
          const task = tasks.find(t => t.id === parseInt(req.params.id));
          if (!task) {
            return res.status(404).send('Task not found');
          }
          task.title = title;
          task.description = description;
          task.dueDate = dueDate;
          res.json(task);
        });
        
        app.delete('/tasks/:id', (req, res) => {
          tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
          res.status(204).send();
        });
        
        const PORT = 3000;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });

</details>


<details>
  <summary> 4. styles.css </summary>
<br>

            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
          }
          
          .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            width: 90%;
            max-width: 600px;
          }
          
          h1 {
            text-align: center;
          }
          
          .task-form {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          }
          
          .task-form input, .task-form textarea, .task-form button {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          
          .task-form button {
            background-color: #007bff;
            color: white;
            cursor: pointer;
          }
          
          .task-form button:hover {
            background-color: #0056b3;
          }
          
          .task-list {
            list-style: none;
            padding: 0;
          }
          
          .task-item {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 10px;
            background-color: #fff;
          }
          
          .task-item h3 {
            margin: 0 0 10px 0;
          }
          
          .task-item p {
            margin: 0;
          }

</details>


<details>
  <summary> 5. package.json </summary>
<br>

        
          {
          "dependencies": {
            "body-parser": "^1.20.2",
            "cors": "^2.8.5",
            "express": "^4.19.2"
          }
        }

</details>
