let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = task;
    input.disabled = true;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      if (editBtn.textContent === "Edit") {
        input.disabled = false;
        input.focus();
        editBtn.textContent = "Save";
      } else {
        tasks[index] = input.value;
        input.disabled = true;
        editBtn.textContent = "Edit";
        saveTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(input);
    li.appendChild(buttonGroup);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const task = input.value.trim();
  if (task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = "";
  }
}

renderTasks();
