const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

const todos = [];

function paintTodo() {
    todoInput.value="";
    const todo = localStorage.getItem("to-do");
    const li = document.createElement("li");
    todoList.appendChild(li);
    li.innerText = `${todo}`;

}

function submitTodo(event) {
    event.preventDefault();
    localStorage.setItem("to-do", todoInput.value);
    paintTodo();
}

todoForm.addEventListener("submit", submitTodo);
