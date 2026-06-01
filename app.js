const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const count = document.getElementById('count');
const searchInput = document.getElementById('searchInput');

// task array

let tasks = [];

// add task button event listener

addBtn.addEventListener('click', addTask);

// addTask function

function addTask() {
  const title = taskInput.value;

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

  renderTask();
}

// render in UI

function renderTask(taskArray = tasks) {
  taskArray.forEach((task) => {
    taskList.innerHTML = '';
    // dynamic HTML

    const div = document.createElement('div');

    div.className =
      'flex justify-between items-center bg-gray-100 p-4 rounded-xl';

    div.innerHTML = `<div>
        <h3 class='${task.status === 'completed' ? 'line-through text-green-600' : 'text-purple-600'}'>${task.title}</h3> 
        <p class="text-sm text-gray-500">
          ${task.status}
        </p>
        </div>
        <div>
        <button
          onclick="toggleStatus(${task.id})"
          class="bg-green-500 text-white px-3 py-1 rounded"
        >
          Done
        </button>
        <button
          onclick="deleteTask(${task.id})"
          class="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
        </div>
        
        `;

    count.textContent = tasks.length;

    taskList.appendChild(div);

    console.log(div);
  });
}

// toogleStatus

function toggleStatus(id) {
  const task = tasks.find((task) => {
    task.id === id;

    if (task) {
      task.status = task.status === 'pending' ? 'completed' : 'pending';

      renderTask();
    }
  });
}

// delete items

function deleteTask(id) {
  tasks = tasks.filter((task) => {
    task.id !== id;
  });

  console.log(tasks);

  renderTask();
}

// search function

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();

  const filteredTask = tasks.filter((task) => {
    task.title.toLowerCase().includes(value);
  });
  console.log(filteredTask);
});
