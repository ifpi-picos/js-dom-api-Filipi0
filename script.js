let tasks = [];

document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }

    gapi.load('client', initGoogleCalendarAPI);
});

async function initGoogleCalendarAPI() {
    try {
        await gapi.client.init({
            apiKey: 'AIzaSyBwInZpKqJK-ma6CpIZi5quNFr9JkaEmMI',
            clientId: '310399738445-pg8kdpkiqui89vsq43g7ak6uq3n1hdf0.apps.googleusercontent.com',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.events"
        });
        console.log('API do Google Calendar inicializada com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar a API do Google Calendar:', error);
    }
}

async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const task = { title, description, status: 'pendente' };
    tasks.push(task);
    updateTaskList();
    document.getElementById('addTaskForm').reset();

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Criar evento no Google Calendar
    try {
        const event = {
            'summary': title,
            'description': description,
            'start': {
                'dateTime': new Date().toISOString(),
                'timeZone': 'America/Sao_Paulo'
            },
            'end': {
                'dateTime': new Date().toISOString(),
                'timeZone': 'America/Sao_Paulo'
            }
        };

        const response = await gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
        console.log('Evento criado no Google Calendar:', response.result);
    } catch (error) {
        console.error('Erro ao criar evento no Google Calendar:', error);
    }
}

function markAsDone() {
    const index = document.getElementById('task-index').value;
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
