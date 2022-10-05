const toDoList = [];

function createItem(item, index) {
  const elementDiv = document.querySelector(".list");
  const elementList = `
            <li data-index=${index} class="item" >
                <div class="list" >
                    <input class="checkbox" type="checkbox" id="checkbox" class="checked" >
                </div>
                <label for="checkbox" >
                ${item}
               </label>
                <button class="delete" type="button" onclick="deleteItem(event)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M294.6 166.6L317.3 144 272 98.7l-22.6 22.6L160 210.7 70.6 121.4 48 98.7 2.7 144l22.6 22.6L114.7 256 25.4 345.4 2.7 368 48 413.3l22.6-22.6L160 301.3l89.4 89.4L272 413.3 317.3 368l-22.6-22.6L205.3 256l89.4-89.4z"/></svg>
                </button>
            </li>
          `;
  elementDiv.innerHTML += elementList;
}

function updateScreen() {
  document.querySelector(".list").innerHTML = "";
  toDoList.forEach((item, index) => createItem(item, index));

  if (toDoList.length > 0) {
    document.querySelector(".warning").classList.add("disabled");
  } else {
    document.querySelector(".warning").classList.remove("disabled");
  }
}

function insertItem(event) {
  event.preventDefault();
  const dataInput = document.getElementById("tasks").value;
  if (dataInput != "") {
    toDoList.push(dataInput);
    updateScreen();
    clearForm();
  }
}

function clearForm() {
  document.getElementById("tasks").value = "";
}

function deleteItem(event) {
  const itemToBeDelete = event.currentTarget.parentNode;
  console.log(event.target);
  const index = itemToBeDelete.dataset.index;

  toDoList.splice(index, 1);
  itemToBeDelete.remove();

  updateScreen();
}

function taskDone(e) {
  const targetEl = e.target;
  const parentEl = targetEl.closest("li");
  if (targetEl.type === "checkbox") {
    parentEl.classList.toggle("done");
  }
}

document.addEventListener("click", taskDone);

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
  const toDoList = JSON.stringify(localStorage.getItem("todo")) ?? [];
  console.log(toDoList);
}

function saveLocalStorage(toDoList) {
  localStorage.setItem("todo", toDoList);
}
