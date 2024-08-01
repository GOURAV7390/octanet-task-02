// Getting references to HTML elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// Variable to track the task being edited
let editingTaskItem = null;

// Event listener for form submission
taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Checking if an existing task is being edited or a new task is being added
  if (!editingTaskItem) {
    addTask();
  } else {
    editTask();
  }
});

// Function to add a new task
function addTask() {
  // Getting the task input value and trimming whitespace
  const task = taskInput.value.trim();

  // Validating if a task is entered or not
  if (!task) {
    alert('Please enter a task.');
    return;
  }

  // Creating HTML elements for the new task
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';

  const taskContent = document.createElement('span');
  taskContent.className = 'task-content';
  taskContent.textContent = task;

  const editButton = document.createElement('button');
  editButton.id = 'edit';
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.id = 'delete';
  deleteButton.textContent = 'Delete';

  // Appending elements to the task item
  taskItem.appendChild(taskContent);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  // Inserting the new task at the beginning of the task list
  taskList.insertAdjacentElement('afterbegin', taskItem);

  // Clearing the task input field
  taskInput.value = '';

  // Event listener for editing the task
  editButton.addEventListener('click', function () {
    taskInput.value = taskContent.textContent;
    addButton.textContent = 'Edit';
    editingTaskItem = taskItem;
  });

  // Event listener for deleting the task
  deleteButton.addEventListener('click', function () {
    taskList.removeChild(taskItem);
    taskInput.value = '';
    editingTaskItem = null;
    addButton.textContent = 'Add';
  });
}

// Function to edit an existing task
function editTask() {
  // Getting the edited task value and trimming whitespace
  const editedTask = taskInput.value.trim();

  // Validating if an edited task is entered or not
  if (!editedTask) {
    alert('Please enter a task.');
    return;
  }

  // Finding the content span of the task being edited
  const editedTaskContent = editingTaskItem.querySelector('.task-content');

  // Updating the content of the task
  editedTaskContent.textContent = editedTask;

  // Resetting the Add button text and editingTaskItem variable
  addButton.textContent = 'Add';
  editingTaskItem = null;

  // Clearing the task input field
  taskInput.value = '';
}