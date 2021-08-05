const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");
const dltAllBtn = document.querySelector("#dltAllBtn");
const doneList = document.querySelector("#done-list");

let todosArr = [];
let doneArr = [];

function doneTodo(event) { // done-todo 기능 추가
    const li = event.target.parentElement;
    doneList.append(li);
    const button = li.querySelector("button"); // 여러개의 같은 태그 중 첫번째요소만 반환
    button.remove(); // 첫번째 button만 삭제
    donelist = todosArr.filter((todo) => todo.id === parseInt(li.id));
    doneArr.push(donelist); // 배열에 push해야 저장됨
    localStorage.setItem("done-todo", JSON.stringify(doneArr));
    todosArr = todosArr.filter((todo) => todo.id !== parseInt(li.id));
    localStorage.setItem("to-do", JSON.stringify(todosArr));
}


function deleteAll() { // todo-list 모두 삭제 기능 추가
    localStorage.removeItem("to-do");
    location.reload();
}

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
    const chckBtn = document.createElement("button");
    const dltBtn = document.createElement("button");
    chckBtn.innerText = `✔️`;
    dltBtn.innerText = `❌`;
    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(chckBtn);
    li.appendChild(dltBtn);
    chckBtn.addEventListener("click", doneTodo);
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
    localStorage.setItem("to-do", JSON.stringify(todosArr)); // 문자열로 전환한 배열을 로컬스토리지에 저장
}

todoForm.addEventListener("submit", submitTodo);
dltAllBtn.addEventListener("click", deleteAll);

const todos = localStorage.getItem("to-do");
const doneTodos = localStorage.getItem("done-todo");

if(todos !== null) {
    const parsedTodos = JSON.parse(todos);
    todosArr = parsedTodos;
    parsedTodos.forEach(paintTodo);
}

if(doneTodos !== null) {
    const parsedDone = JSON.parse(doneTodos);
    doneArr = parsedDone;
    localStorage.setItem("done-todo", JSON.stringify(doneArr));
    
}
