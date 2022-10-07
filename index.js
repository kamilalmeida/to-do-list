function getTodosLocalStorage() {
  return JSON.parse(localStorage.getItem("todo")) ?? [];
}

function saveLocalStorage(toDoList) {
  localStorage.setItem("todo", JSON.stringify(toDoList));
}

function createItem(item, done, index) {
  const elementDiv = document.querySelector(".list");

  const elementList = `
            <li class="item ${done ? "done" : ""}">
                <div class="list" >
                    <input class="checkbox checked" type="checkbox" id=${index} ${
    done && "checked"
  }>
                </div>
                <label for="checkbox" >
                ${item}
               </label>
                <button class="delete" type="button">
                  <svg class="no-select" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path class="no-select" d="M294.6 166.6L317.3 144 272 98.7l-22.6 22.6L160 210.7 70.6 121.4 48 98.7 2.7 144l22.6 22.6L114.7 256 25.4 345.4 2.7 368 48 413.3l22.6-22.6L160 301.3l89.4 89.4L272 413.3 317.3 368l-22.6-22.6L205.3 256l89.4-89.4z"/>
                  </svg>
                </button>
            </li>
          `;
  elementDiv.innerHTML += elementList;
}

function updateScreen() {
  const toDoList = getTodosLocalStorage();

  document.querySelector(".list").innerHTML = "";

  if (toDoList.length > 0) {
    toDoList.forEach((item, index) => createItem(item.text, item.done, index));
    document.querySelector(".warning").classList.add("disabled");
  } else {
    document.querySelector(".warning").classList.remove("disabled");
  }
}

updateScreen();

function insertItem(event) {
  const dataInput = document.getElementById("tasks").value;
  event.preventDefault();

  const toDoList = getTodosLocalStorage();

  if (dataInput != "") {
    toDoList.push({ text: dataInput, done: false });

    saveLocalStorage(toDoList);
    updateScreen();

    document.getElementById("tasks").value = "";
  }
}

document.addEventListener("click", (event) => {
  const targetEl = event.target;
  const targetIndex = targetEl.getAttribute("id");

  if (targetEl.type === "checkbox") {
    updateTodoStatusLocalStorage(targetIndex);
  }
  if (targetEl.classList.contains("del") || targetEl.classList.contains("delete")) {
    removeTodoLocalStorage(targetIndex);
  }
});

function getSearchedTodos(search) {
  const todos = document.querySelectorAll(".item");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("label").innerText.toLowerCase();
    todo.style.display = "flex";
    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
}

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchedTodos(search);
});

function filterTodos(filterValue) {
  const todos = document.querySelectorAll(".item");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));

      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    default:
      break;
  }
}

const filterBtn = document.querySelector("#filter-select");

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

function removeTodoLocalStorage(index) {
  const todos = getTodosLocalStorage();

  todos.splice(index, 1);

  saveLocalStorage(todos);
  updateScreen();
}

function updateTodoStatusLocalStorage(index) {
  const todos = getTodosLocalStorage();

  todos[index].done = !todos[index].done;

  saveLocalStorage(todos);
  updateScreen();
}
