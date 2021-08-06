const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");
const dltAllBtn = document.querySelector("#dltAllBtn");
const doneList = document.querySelector("#done-list");

let todosArr = [];
let doneArr = [];

function deleteAll() { // todo-list 모두 삭제 기능 추가
    localStorage.removeItem("to-do");
    location.reload();
}

function deleteDone(event) { // done-list 삭제 기능
    const li = event.target.parentElement;
    li.remove();
    doneArr = doneArr.filter((todo) => todo.id !== parseInt(li.id));
    saveDone();
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    todosArr = todosArr.filter((todo) => todo.id !== parseInt(li.id));
    saveTodo();
}

function saveDone() {
    localStorage.setItem("done-todo", JSON.stringify(doneArr));
}

function saveTodo() {
    localStorage.setItem("to-do", JSON.stringify(todosArr));
}

function paintDone(done) {
    const li = document.createElement("li");
    li.id = done.id;
    const span = document.createElement("span");
    span.innerText = done.text;
    const dltBtn = document.createElement("button");
    dltBtn.innerText = `❌`;
    doneList.appendChild(li);
    li.appendChild(span);
    li.appendChild(dltBtn);
    dltBtn.addEventListener("click", deleteDone);
}

function doneTodo(event) { // done-todo 기능 추가
    const li = event.target.parentElement;
    doneList.append(li);
    const button = li.querySelector("button"); // 여러개의 같은 태그 중 첫번째요소만 반환
    button.remove(); // 첫번째 button만 삭제
    let filteredDone = todosArr.filter((todo) => todo.id === parseInt(li.id));
    doneArr = doneArr.concat(filteredDone); // concat메서드로 배열 병합
    saveDone();
    todosArr = todosArr.filter((todo) => todo.id !== parseInt(li.id));
    saveTodo();
}

function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const doneBtn = document.createElement("button");
    const dltBtn = document.createElement("button");
    doneBtn.innerText = `✔️`;
    dltBtn.innerText = `❌`;
    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(dltBtn);
    doneBtn.addEventListener("click", doneTodo);
    dltBtn.addEventListener("click", deleteTodo);
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
    saveTodo(); // 문자열로 전환한 배열을 로컬스토리지에 저장
}

todoForm.addEventListener("submit", submitTodo);
dltAllBtn.addEventListener("click", deleteAll);

const todos = localStorage.getItem("to-do");
const done = localStorage.getItem("done-todo");

if(todos !== null) {
    const parsedTodos = JSON.parse(todos);
    todosArr = parsedTodos;
    parsedTodos.forEach(paintTodo);
}

if(done !== null) {
    const parsedDone = JSON.parse(done);
    doneArr = parsedDone;
    parsedDone.forEach(paintDone);
}
