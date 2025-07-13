let displayedTimer = document.getElementById("timer-display");

let pomodoro = 25;
let shortBreak = 5;
let longBreak = 10;

// default values to start with, if set to null and zeros, gotta click on Pomodoro button so that the timer can be activated
let timer = 60 * pomodoro;
let duration = 60 * pomodoro;
let remainingTime = 60 * pomodoro;

let endSound = document.querySelector("#audio");

// for keypress Enter
let isRunning = false;

window.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    if (isRunning) {
      pause();
    } else {
      start();
    }
    isRunning = !isRunning;
  }
});

function setPomodoro() {
  setTimer(60 * pomodoro);
}
function setShortBreak() {
  setTimer(60 * shortBreak);
}
function setLongBreak() {
  setTimer(60 * longBreak);
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
      endSound.play();
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

// modal
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("customTimer");
const closeModalBtn = document.getElementById("close-modal");

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
const saveButton = document.getElementById("save-time");
function saveCustomTime() {
  event.preventDefault();
  pomodoro = document.getElementById("customPomodoro").value;
  shortBreak = document.getElementById("customShortBreak").value;
  longBreak = document.getElementById("customLongBreak").value;
  updateDisplay();
  //   setPomodoro(pomodoro);
  //   setShortBreak(shortBreak);
  //   setLongBreak(longBreak);
  closeModal();
}
saveButton.addEventListener("click", saveCustomTime);
// add custom timer
// add dark mode
// add to-do list
// add the sound
// save the to-do for later
// add full mode
// Close modal if clicking outside the modal content (backdrop)
