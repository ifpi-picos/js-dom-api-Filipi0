const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
let tasks = [];

// Carregar tarefas salvas ao iniciar
document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => addTaskToDOM(task));
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {

        const maxText = taskText.substring(0, 35);

        const newTask = {
            text: maxText
        };

        addTaskToDOM(newTask);
        tasks.push(newTask);
        updateLocalStorage();

        taskInput.value = "";
        console.log('Tarefa adicionada com sucesso!');
    }
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        const index = Array.from(taskList.children).indexOf(li);
        tasks[index].text = newText.trim();
        span.textContent = newText.trim();
        updateLocalStorage();
    }
}

function deleteTask(button) {
    alert("Tem certeza que deseja remover esta tarefa?");
    const li = button.parentElement;
    const index = Array.from(taskList.children).indexOf(li);
    taskList.removeChild(li);
    tasks.splice(index, 1);
    updateLocalStorage();
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="editButton" onClick="editTask(this)">Editar</button>
        <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
    `;
    taskList.appendChild(li);
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
