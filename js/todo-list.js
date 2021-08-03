const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

let todosArr = [];

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    todosArr = todosArr.filter((todo) => todo.id !== parseInt(li.id));
    localStorage.setItem("to-do", JSON.stringify(todosArr));
}

function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = `❌`;
    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);
    button.addEventListener("click", deleteTodo);
}

function submitTodo(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = ""; // submit 할때마다 입력창 비움
    const newTodoObj = {
        id : Date.now(), // event가 발생한 정확한 target을 찾기위해
        text : newTodo
    }
    todosArr.push(newTodoObj); // 배열에 input value값 저장하고
    paintTodo(newTodoObj);
    localStorage.setItem("to-do", JSON.stringify(todosArr)); // 문자열로 전환한 배열을 로컬스토리지에 저장
}

todoForm.addEventListener("submit", submitTodo);

const todos = localStorage.getItem("to-do");

if(todos !== null) {
    const parsedTodos = JSON.parse(todos);
    todosArr = parsedTodos;
    parsedTodos.forEach(paintTodo);
}