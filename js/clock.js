const clock = document.querySelector("#clock");

function liveTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

liveTime();
setInterval(liveTime, 1000);