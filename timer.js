let displayedTimer = document.getElementById("timer-display");
// default values to start with, if set to null and zeros, gotta click on Pomodoro button so that the timer can be activated
let timer = 60 * 25;
let duration = 60 * 25;
let remainingTime = 60 * 25;

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
  clearInterval(timer); // clear the existing timer - stop
  duration = seconds;
  remainingTime = seconds;
  updateDisplay();
}

// display in mm:ss
function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  // convert nums to string so that they can be padded
  displayedTimer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
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
  clearInterval(timer);
  setTimer(duration);
}
function pause() {
  clearInterval(timer); // stop with the current displayed time, not clear things out completely
}
