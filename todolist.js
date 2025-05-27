// input field for the tasks
const inputText = document.getElementById("input-text");

// container where the tasklist displays
const listContainer = document.getElementById("list-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// add task when click on button, creates new li and span elements 
function addTask() {
    const text = inputText.value.trim();
    if (text === '') {
        alert("Please write anything!");
        return;
    }

    const newTask = { text: text, completed: false };
    tasks.push(newTask);
    inputText.value = '';
    saveTasks();
    renderTasks();
}

function renderTasks() {
    listContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        if (task.completed) li.classList.add("check");
        li.textContent = task.text;

        li.addEventListener("click", () => toggleTask(index));

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
renderTasks();