let tasks = [];

document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
});

function addTask() {
    const title = document.getElementById('task-title3').value;
    const description = document.getElementById('task-description3').value;
    const task = { title, description, status: 'pendente' };
    tasks.push(task);
    updateTaskList();
    document.getElementById('addTaskForm').reset();

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function markAsDone() {
    const index = document.getElementById('task-index3').value;
    const adjustedIndex = index - 1;

    if (adjustedIndex >= 0 && adjustedIndex < tasks.length) {
        tasks[adjustedIndex].status = 'concluido';
        updateTaskList();
        document.getElementById('markAsDoneForm').reset();

        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        alert('Índice inválido. Informe um índice válido.');
    }
}

function deleteTask(index) {
    if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
        tasks.splice(index, 1);
        updateTaskList();

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function updateTaskList() {
    const taskListContainer = document.getElementById('taskListContainer');
    taskListContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item3');

        const status = task.status === 'concluido' ? '[Concluído]' : '[Pendente]';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function () { deleteTask(index); };
        deleteButton.classList.add('small-delete-button');

        taskItem.innerHTML = `<span>${status}</span> ${index + 1}. ${task.title}`;
        taskItem.appendChild(deleteButton);
        taskListContainer.appendChild(taskItem);
    });
}
