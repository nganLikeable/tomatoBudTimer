let displayedTimer = document.getElementById("timer-display");
let timer = null;
let duration = 0;
let remainingTime = 0;

function setPomodoro() {
  setTimer(60 * 25);
}
function setShortBreak() {
  setTimer(60 * 5);
}
function setLongBreak() {
  setTimer(60 * 10);
}
function setTimer(seconds) {
  clearInterval(timer); // clear the existing timer
  duration = seconds;
  remainingTime = seconds;
  updateDisplay();
}
function updateDisplay() {
  const minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  // convert nums to string so that they can be padded
  displayedTimer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  duration--;
}
function start() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("Time's up!!");
    }
  }, 1000);
}
function reset() {
    setPomodoro();
}
