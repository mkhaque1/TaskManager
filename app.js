const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const count = document.getElementById('count');
const searchInput = document.getElementById('searchInput');

// task array

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// add task button event listener

addBtn.addEventListener('click', addTask);

// addTask function

function addTask() {
  const title = taskInput.value.trim();

  // condition
  if (title === '') {
    alert('pleas enter a task first');
    return;
  }
  // modern
  //   if (!title) {
  //     return;
  //   }

  // task object

  const newTask = {
    id: Date.now(),
    title,
    status: 'pending',
  };
  tasks.push(newTask);

  taskInput.value = '';

  renderTask();
}

// render in UI

function renderTask(taskArray = tasks) {
  taskList.innerHTML = '';

  // loop for array items
  taskArray.forEach((task) => {
    // dynamic HTML
    const div = document.createElement('div');

    div.className =
      'flex mb-2 justify-between items-center bg-gray-100 p-4 rounded-xl';

    div.innerHTML = `<div>
        <h3 class='${task.status === 'completed' ? 'line-through text-green-600' : 'text-purple-600'}'>${task.title}</h3> 
        <p class="text-sm text-gray-500">
          ${task.status}
        </p>
        </div>
        <div>
        <button
          onclick="toggleStatus(${task.id})"
          class="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          Done
        </button>
        <button
          onclick="deleteTask(${task.id})"
          class="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
        </div>
        
        `;

    taskList.appendChild(div);

    console.log(div);
  });

  count.textContent = tasks.length;

  saveTasks();
}

// toogleStatus

function toggleStatus(id) {
  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.status = task.status === 'pending' ? 'completed' : 'pending';

    renderTask();
  }
}

// delete items

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  console.log(tasks);

  renderTask();
}

// search function

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(value),
  );

  renderTask(filteredTasks);
});

// local storage save function

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTask();
