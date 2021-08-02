const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const savedUsername = localStorage.getItem("username");
// logout button
const logoutBtn = document.createElement("button");
const logoutBtnTxt = document.createTextNode("logout");

function login() {
    localStorage.setItem("username", loginInput.value);
    greetUser(loginInput.value);
}

function greetUser(username) {
    loginForm.classList.add("hidden");
    greeting.innerText = `환영합니다! ${username}님!`;
    logoutBtn.appendChild(logoutBtnTxt);
    greeting.appendChild(logoutBtn);
}

// username 편집 기능 추가
function logout() {
    localStorage.removeItem("username");
    greeting.classList.add("hidden");
    location.reload();
    loginProcess();
}

function loginProcess() {
    if(savedUsername === null) {
        loginForm.classList.remove("hidden");
        // form을 submit하고 input의 value값을 가져옴
        loginForm.addEventListener("submit", login);
    }else {
        loginForm.classList.add("hidden");
        greetUser(savedUsername);
    }
}

loginProcess();
logoutBtn.addEventListener("click", logout);