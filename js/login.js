const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const savedUsername = localStorage.getItem("username");
const logoutBtn = document.createElement("button");
const btnTxt = document.createTextNode("logout");

function submitUsername(event) {
    event.preventDefault();
    loginForm.classList.add("hidden");
    localStorage.setItem("username", loginInput.value);
    greetUser(loginInput.value);
}

function greetUser(username) {
    greeting.innerText = `환영합니다! ${username}님!`;
    logoutBtn.appendChild(btnTxt);
    greeting.appendChild(logoutBtn);
}

function logout() {
    localStorage.removeItem("username");
    greeting.classList.add("hidden");
    login();
}

function login() {
    if(savedUsername === null) {
        loginForm.classList.remove("hidden");
        loginForm.addEventListener("submit", submitUsername);
    }else {
        loginForm.classList.add("hidden");
        greetUser(savedUsername);
    }
}

logoutBtn.addEventListener("click", logout);
login();