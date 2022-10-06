// const toDoList = [];

function createItem(item, index, done = false) {
  const elementDiv = document.querySelector(".list");

  const elementList = `
            <li data-index=${index} class="item" >
                <div class="list" >
                    <input class="checkbox" type="checkbox" id="checkbox" class="checked" >
                </div>
                <label for="checkbox" >
                ${item}
               </label>
                <button class="delete" type="button" >
                  <svg class="del xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path d="M294.6 166.6L317.3 144 272 98.7l-22.6 22.6L160 210.7 70.6 121.4 48 98.7 2.7 144l22.6 22.6L114.7 256 25.4 345.4 2.7 368 48 413.3l22.6-22.6L160 301.3l89.4 89.4L272 413.3 317.3 368l-22.6-22.6L205.3 256l89.4-89.4z"/>
                  </svg>
                </button>
            </li>
          `;
  elementDiv.innerHTML += elementList;
  const elementLi = document.querySelector(".item");
  console.log(done);

 
}

function updateScreen() {
  const toDoList = getTodosLocalStorage();
  document.querySelector(".list").innerHTML = "";
  toDoList.forEach((item, index) => createItem(item.text, index, item.done));

  if (toDoList.length > 0) {
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
    toDoList.push({ text: dataInput, done: true });

    saveLocalStorage(toDoList);
    updateScreen();

    document.getElementById("tasks").value = "";
  }
}

document.addEventListener("click", (event) => {
  const targetEl = event.target;
  const parentEl = targetEl.closest("li");
  let todoTitle = targetEl.closest("li").innerText;

  if (targetEl.type === "checkbox") {
    parentEl.classList.toggle("done");
    updateTodoStatusLocalStorage(todoTitle);
  }
  if (targetEl.classList.contains("del") || targetEl.classList.contains("delete")) {
    console.log("oi");
    parentEl.remove();

    removeTodoLocalStorage(todoTitle);
  }
});

function getSearchedTodos(search) {
  const todos = document.querySelectorAll(".item");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("label").innerText.toLowerCase();
    console.log(todoTitle);
    todo.style.display = "flex";
    if (!todoTitle.includes(search)) {
      console.log("oi");
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
  console.log(todos);
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

function getTodosLocalStorage() {
  return JSON.parse(localStorage.getItem("todo")) ?? [];
}

function saveLocalStorage(toDoList) {
  console.log(toDoList);
  localStorage.setItem("todo", JSON.stringify(toDoList));
}

function removeTodoLocalStorage(todoTitle) {
  const todos = getTodosLocalStorage();
  const filteredTodos = todos.filter(function (todo) {
    // console.log(todo.text);
    todo.text != todoTitle;
    console.log("todoText:", todoTitle, "doArray:", todo.text);
  });
  console.log(filteredTodos);

  localStorage.setItem("todo", JSON.stringify(filteredTodos));
}
function updateTodoStatusLocalStorage(todoTitle) {
  const todos = getTodosLocalStorage();

  todos.map((todo) => (todo.text === todoTitle ? (todo.done = !todo.done) : null));

  localStorage.setItem("todo", JSON.stringify(todos));
}
