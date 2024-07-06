// Variables
const addTask = document.querySelector("#add-task");
const inputTask = document.querySelector("#input-task");
const taskContainer = document.querySelector("#task-container");

// Function to create a task element
function createTaskElement(taskText) {
    let task = document.createElement("div");
    task.classList.add("task");

    let li = document.createElement("li");
    li.innerText = taskText;
    task.appendChild(li);

    // Check button and delete button
    let checkbtn = document.createElement("button");
    checkbtn.innerHTML = '<i class="fas fa-check"></i>';
    checkbtn.classList.add("checktask");
    task.appendChild(checkbtn);

    let deletebtn = document.createElement("button");
    deletebtn.innerHTML = '<i class="fas fa-trash"></i>';
    deletebtn.classList.add("deletetask");
    task.appendChild(deletebtn);

    // Edit button
    let editbtn = document.createElement("button");
    editbtn.innerHTML = '<i class="far fa-edit"></i>';
    editbtn.classList.add("edittask");
    task.appendChild(editbtn);

    // Add event listeners to buttons
    checkbtn.addEventListener("click", function () {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
        } else {
            li.style.textDecoration = "line-through";
        }
    });

    deletebtn.addEventListener("click", function () {
         // or parentElement
        taskContainer.removeChild(task);
        saveTasks();
    });

   editbtn.onclick = function(){
    editbutton(li,task,editbtn);
   }
    return task;
}

//edit and save button

function editbutton(li,task,editbtn){

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = li.innerText;
    inputField.classList.add("inputtask")
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="far fa-save"></i>';
    saveButton.className = "savetask"

    saveButton.addEventListener("click", function () {
        if (inputField.value !== ""){
            // !!! if user click editbtn but leave it as empty this won't save the task
            li.innerText = inputField.value.trim();
            task.replaceChild(li, inputField);
            task.replaceChild(editbtn, saveButton);
            saveTasks();
        }
    });

    task.replaceChild(inputField, li);
    task.replaceChild(saveButton, editbtn);
};




// Function to save the Current tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task li").forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(taskText => {
            const task = createTaskElement(taskText);
            taskContainer.appendChild(task);
        });
    }
}

// Add event listener to add button
addTask.addEventListener("click", function () {
    if (inputTask.value === "") {
        alert("Please Enter a Task");
    } else {
        const task = createTaskElement(inputTask.value);
        taskContainer.appendChild(task);
        saveTasks();
        inputTask.value = "";
    }
});
