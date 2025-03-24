const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const spanMessage = document.querySelector(".message span");
const searchForm = document.querySelector(".search");
const tasksList =
    localStorage.getItem("tasksList") !== null
        ? JSON.parse(localStorage.getItem("tasksList"))
        : [];

function generateTemplate(value, datePosted) {
    return `<li>
                <p>
                    <span>${value} </span> 
                    <span id="time">${datePosted}</span>
                </p>
                                    
                <i class="bi bi-trash-fill delete"></i>
            </li>`;
}

function updateMessage() {
    taskLength = tasks.children.length;
    spanMessage.textContent = `You have ${taskLength} pending tasks.`;
}

function getTasks() {
    tasksList.forEach((task) => {
        tasks.innerHTML += generateTemplate(task.value, task.datePosted);
    });
    updateMessage();
}

function addTasksDOM(value, datePosted) {
    if (value.length) {
        tasks.innerHTML += generateTemplate(value, datePosted);
    }
}

function addTasks(value) {
    const datePosted = new Date();
    const taskItem = {
        value: value,
        datePosted: `${datePosted.toLocaleTimeString()} ${datePosted.toLocaleDateString()}`,
    };

    tasksList.push(taskItem);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    addTasksDOM(value, taskItem.datePosted);
}

updateMessage();

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = addForm.task.value.trim();
    // const datePosted = new Date().toDateString();
    addTasks(value);
    addForm.reset();
    updateMessage();
});

tasks.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        updateMessage();
    }
});

clearAll.addEventListener("click", (event) => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach((item) => {
        item.remove();
        updateMessage();
    });
});

function searchTask(term) {
    Array.from(tasks.children)
        .filter((task) => {
            return !task.textContent.toLowerCase().includes(term);
        })
        .forEach((task) => {
            task.classList.add("hide");
        });

    Array.from(tasks.children)
        .filter((task) => {
            return task.textContent.toLowerCase().includes(term);
        })
        .forEach((task) => {
            task.classList.remove("hide");
        });
}

searchForm.addEventListener("keyup", (event) => {
    const term = searchForm.task.value.trim().toLowerCase();
    searchTask(term);
});

searchForm.addEventListener("click", (event) => {
    if (event.target.classList.contains("reset")) {
        searchForm.reset();
        const term = searchForm.task.value.trim().toLowerCase();
        searchTask(term);
    }
});

getTasks();
