const toDoList = [];

function createItem(item, index) {
  const elementDiv = document.querySelector(".list");
  const elementList = `
        
            <li data-index=${index}>
                <div class="list" >
                    <input class="checkbox" type="checkbox" id="checkbox"  >
                </div>
                <label for="checkbox" >
                ${item}
               </label>
                <button class="delete" type="button" onclick="deleteItem(event)">
                    X
                </button>
            </li>
          `;
  elementDiv.innerHTML += elementList;
}

function updateScreen() {
  document.querySelector(".list").innerHTML = "";
  toDoList.forEach((item, index) => createItem(item, index));

  if (toDoList.length > 0) {
    console.log("if");
    document.querySelector(".warning").classList.add("disabled");
  } else {
    document.querySelector(".warning").classList.remove("disabled");
  }
}

function insertItem() {
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
  const index = itemToBeDelete.dataset.index;

  toDoList.splice(index, 1);
  itemToBeDelete.remove();

  updateScreen();
}
