// This code was modified with help from a ChatGPT conversation to meet missing project requirements,
// Source: ChatGPT conversation with OpenAI, "Goal Dash game help – animated background and effects"
// URL: https://chatgpt.com/share/6835ba67-0a38-8001-9395-f0ee48fb4d2e
// Accessed: 27 May 2025


// Get reference to the input field where the user types their task
const inputText = document.getElementById("input-text");

// Get reference to the container where the task list will be shown
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage if available, otherwise start with an empty list
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function that runs when user clicks the "Add" button
function addTask() {
    // Get the text from the input field and remove extra spaces
    const text = inputText.value.trim();
    
    // Show an alert if the input is empty
    if (text === '') {
        alert("Please write anything!");
        return;
    }

    // Create a new task object with the text and mark it as not completed
    const newTask = { text: text, completed: false };
    // Add the new task to the tasks array
    tasks.push(newTask);
    
    // Clear the input field
    inputText.value = '';

    // Save the updated tasks to localStorage
    saveTasks();

    // Re-render the task list on the screen
    renderTasks();
}

// Function to display all tasks in the list container
function renderTasks() {
    // Clear the current task list from the screen
    listContainer.innerHTML = '';
    
    // Loop through each task and create list elements
    tasks.forEach((task, index) => {
        
        // Create a <li> element for the task
        let li = document.createElement("li");
        
        // If the task is marked as completed, add the "check" class for styling
        if (task.completed) li.classList.add("check");

        // Set the task text as the content of the <li>
        li.textContent = task.text;

        // Toggle task status (complete/incomplete) when the task is clicked
        li.addEventListener("click", () => toggleTask(index));

        // Create a <span> for the "delete" button (× symbol)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for multiplication sign (×)

        // Prevent the parent click event and delete the task when the span is clicked
        span.addEventListener("click", (e) => {
            e.stopPropagation(); // Stops the click from also toggling the task
            deleteTask(index); // Delete the task
        });

        // Add the delete button (span) to the task (li)
        li.appendChild(span);

        // Add the task (li) to the task list container
        listContainer.appendChild(li);
    });
}

// Function to toggle whether a task is completed or not
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle true/false
    saveTasks();  // Save updated task status to localStorage
    renderTasks(); // Update the displayed list
}

// Function to delete a task by its index
function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    saveTasks();            // Save updated task list to localStorage
    renderTasks();          // Update the displayed list
}

// Function to save all tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// When the page loads, display all saved tasks
renderTasks();