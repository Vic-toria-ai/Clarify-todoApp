const initialTodos = [
  {
    id: "1",
    name: "Hello world",
    createdAt: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    isComplete: false,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? initialTodos;

  // todos is supposed to be an object, so json.parse converts the string representation that the getitem method returns
  const todoInput = document.querySelector("#inputField");
  const todoForm = document.querySelector("#itemForm");
  const todoContainer = document.querySelector("#todoContainer");
  const todoList = document.createElement("ul");

  todoList.classList.add("todoList2");

  todoContainer.classList.add("todoContainer2");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = todoInput.value;
    if (inputValue.length === 0) return;
    const newTodo = {
      id: crypto.randomUUID(),
      name: inputValue,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      isComplete: false,
    };

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
    addTodoItem(newTodo);
    todoContainer.appendChild(todoList);
    todoContainer.hidden = false;
    // Clear the form
    todoInput.value = "";
  });

  function addTodoItem(newTodo) {
    let item = document.createElement("li");
    item.classList.add("d-flex", "gap-3");

    item.classList.add("bg-white", "text-dark", "rounded", "m-2", "p-1");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bi", "bi-trash", "text-primary", "hover-danger");
    deleteIcon.style.cursor = "pointer";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = newTodo.isComplete;
    checkbox.classList.add("me-2");

    const text = document.createElement("div");
    text.classList.add(
      "flex-grow-1",
      "d-flex",
      "align-items-center",
      "gap-1",
      "todoDiv",
    );
    text.dataset.id = newTodo.id;
    text.innerHTML = `<span>${newTodo.name} </span> <span>-</span> <small class="text-muted">${newTodo.createdAt}</small>`;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        text.style.textDecoration = "line-through";
        text.style.opacity = "0.6";
      } else {
        text.style.textDecoration = "none";
        text.style.opacity = "1";
      }
    });

    deleteIcon.addEventListener("click", (e) => {
      const deletedTodo = e.target.previousElementSibling;
      const deletedTodoId = deletedTodo.dataset.id;
      const filteredTodos = todos.filter((todo) => todo.id !== deletedTodoId);
      todos = filteredTodos;
      localStorage.setItem("todos", JSON.stringify(todos));
      item.remove();
      if (todos.length === 0) {
        todoContainer.hidden = true;
      }
    });

    // item.innerText = `${name} - ${createdAt}`;
    todoList.appendChild(item);
    checkbox.addEventListener("change", () => {
      item.classList.toggle("completed");
    });

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteIcon);
    todoList.appendChild(item);
  }

  function generateTodoList() {
    if (todos.length > 0) {
      todos.forEach((t) => addTodoItem(t));
      todoContainer.appendChild(todoList);
      todoContainer.hidden = false;
    }
  }

  generateTodoList();
});
