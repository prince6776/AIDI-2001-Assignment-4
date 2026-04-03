function getTasks() {
  return JSON.parse(localStorage.getItem("assignments")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("assignments", JSON.stringify(tasks));
}

function addAssignment() {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDateInput");
  const priorityInput = document.getElementById("priorityInput");
  const notesInput = document.getElementById("notesInput");

  const title = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;
  const notes = notesInput.value.trim();

  if (title === "") {
    alert("Please enter an assignment title.");
    return;
  }

  const tasks = getTasks();

  const newTask = {
    id: Date.now(),
    title: title,
    dueDate: dueDate,
    priority: priority,
    notes: notes,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(tasks);

  taskInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "low";
  notesInput.value = "";

  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const priorityFilter = document.getElementById("priorityFilter");
  const tasks = getTasks();
  const selectedPriority = priorityFilter.value;

  let filteredTasks = tasks;

  if (selectedPriority !== "all") {
    filteredTasks = tasks.filter(task => task.priority === selectedPriority);
  }

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<p>No assignments yet.</p>";
    return;
  }

  filteredTasks.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.style.border = "1px solid #ccc";
    taskCard.style.padding = "12px";
    taskCard.style.marginTop = "12px";
    taskCard.style.borderRadius = "8px";
    taskCard.style.backgroundColor = "#f9f9f9";

    taskCard.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Due Date:</strong> ${task.dueDate || "No due date"}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Notes:</strong> ${task.notes || "None"}</p>
      <p><strong>Status:</strong> ${task.completed ? "Completed" : "Pending"}</p>
      <button type="button" onclick="toggleTask(${task.id})">Toggle Complete</button>
      <button type="button" onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(taskCard);
  });
}

function toggleTask(id) {
  const tasks = getTasks().map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(id) {
  const tasks = getTasks().filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

document.getElementById("priorityFilter").addEventListener("change", renderTasks);

renderTasks();
