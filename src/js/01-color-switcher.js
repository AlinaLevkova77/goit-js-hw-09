const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;
const INTERVAL_DELAY = 1000;

startBtn.addEventListener('click',onChangeColor);
stopBtn.addEventListener('click',onStopBtn);

function onChangeColor() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, INTERVAL_DELAY);
    startBtn.disabled = true;
}
function onStopBtn() {
    clearInterval(timerId);
    startBtn.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}



