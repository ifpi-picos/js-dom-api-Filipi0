const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
let tasks = [];

// Load saved tasks on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => addTaskToDOM(task));
    }
});

async function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const maxText = taskText.substring(0, 35);
        const newTask = {
            text: maxText
        };

        addTaskToDOM(newTask);
        tasks.push(newTask);
        updateLocalStorage();

        // try {
        //     const owner = 'Filipi0';
        //     const repo = 'To-do-ist';
        //     const token = ''; // coloque aqui o token de acesso do GitHub, vou deixar no README.md como fazer

        //     const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             title: maxText,
        //             body: ''
        //         })
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to create issue on GitHub');
        //     }

        //     const newIssue = await response.json();
        //     console.log('New issue created on GitHub:', newIssue);
        //     newTask.githubIssueNumber = newIssue.number;
        //     updateLocalStorage();
        //     console.log('Task added successfully!');
        // } catch (error) {
        //     console.error('Error creating issue on GitHub:', error);
        //     alert('Failed to create issue on GitHub. Please try again later.');
        // }

        taskInput.value = "";
    }
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        const index = Array.from(taskList.children).indexOf(li);
        tasks[index].text = newText.trim();
        span.textContent = newText.trim();
        updateLocalStorage();
    }
}

function deleteTask(button) {
    if (confirm("Are you sure you want to remove this task?")) {
        const li = button.parentElement;
        const index = Array.from(taskList.children).indexOf(li);
        taskList.removeChild(li);
        tasks.splice(index, 1);
        updateLocalStorage();
    }
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="editButton" onclick="editTask(this)">Edit</button>
        <button class="deleteButton" onclick="deleteTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
