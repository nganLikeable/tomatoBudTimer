let displayedTimer = document.getElementById("timer-display");

let pomodoro = 25;
let shortBreak = 5;
let longBreak = 10;

// default values to start with, if set to null and zeros, gotta click on Pomodoro button so that the timer can be activated
let timer = 60 * pomodoro;
let duration = 60 * pomodoro;
let remainingTime = 60 * pomodoro;

// future timestamp when session ends
let endTime;

let endSound = document.querySelector("#audio");

// for keypress Enter
let isRunning = false;
function setTimer(seconds) {
  clearInterval(timer); // clear the existing timer - stop
  duration = seconds;
  remainingTime = seconds;
  updateDisplay();
}

function setPomodoro() {
  setTimer(60 * pomodoro);
}
function setShortBreak() {
  setTimer(60 * shortBreak);
}
function setLongBreak() {
  setTimer(60 * longBreak);
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

// modal window
const customTimerModal = document.getElementById("modal-custom-timer");
const customTimerBtn = document.getElementById("custom-timer-btn");
const closeModalBtn = document.getElementById("close-modal");

function openModal(modalEl) {
  modalEl.style.display = "block";
}
function closeModal(modalEl) {
  modalEl.style.display = "none";
}
customTimerBtn.addEventListener("click", () => {
  openModal(customTimerModal);
});

document.querySelectorAll(".close-modal").forEach((span) => {
  span.addEventListener("click", () => {
    const modal = span.closest(".modal");
    closeModal(modal);
  });
});
const doneModal = document.getElementById("modal-done");

function start() {
  clearInterval(timer);

  // lock in when this session should end
  endTime = Date.now() + remainingTime * 1000;
  timer = setInterval(() => {
    remainingTime = Math.max(0, Math.round((endTime - Date.now()) / 1000));
    updateDisplay();
    if (remainingTime == 0) {
      clearInterval(timer);
      openModal(doneModal);
      endSound.play();
    }
  }, 300);
}
function reset() {
  clearInterval(timer);
  setTimer(duration);
}
function pause() {
  clearInterval(timer); // stop with the current displayed time, not clear things out completely
}

document.getElementById("start-btn").addEventListener("click", start);
document.getElementById("pause-btn").addEventListener("click", pause);
document.getElementById("reset-btn").addEventListener("click", reset);

// Save custom time
const saveButton = document.getElementById("save-btn");

function saveCustomTime() {
  event.preventDefault();
  pomodoro = document.getElementById("customPomodoro").value;
  shortBreak = document.getElementById("customShortBreak").value;
  longBreak = document.getElementById("customLongBreak").value;
  updateDisplay();

  if (lastMode === "pomodoro") {
    setPomodoro();
  } else if (lastMode === "shortBreak") {
    setShortBreak();
  } else if (lastMode === "longBreak") {
    setLongBreak();
  }

  closeModal(customTimerModal);
}
// Track the last clicked button to show the according displayed custom time
let lastMode = "pomodoro"; // by default
document.getElementById("pomodoro-btn").addEventListener("click", () => {
  setPomodoro();
  lastMode = "pomodoro";
});

document.getElementById("short-break-btn").addEventListener("click", () => {
  setShortBreak();
  lastMode = "shortBreak";
});

document.getElementById("long-break-btn").addEventListener("click", () => {
  setLongBreak();
  lastMode = "longBreak";
});

document
  .getElementById("custom-timer-btn")
  .addEventListener("click", openModal);

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
saveButton.addEventListener("click", saveCustomTime);

// Keep active after click on button
const optionBtnList = document.querySelectorAll(".option-button button");
optionBtnList.forEach((btnEl) => {
  btnEl.addEventListener("click", () => {
    // remove current active button's special class in CSS
    // classList returns css classNames
    document.querySelectorAll(".option-button button").forEach((btn) => {
      btn.classList.remove("special");
    });
    btnEl.classList.add("special");
  });
});

// Fullscreen mode
const fullscreenBtn = document.getElementById("fullscreen-btn");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      // scale the screen
      document.body.classList.add("fullscreen-mode");
    });
  } else {
    document.exitFullscreen().then(() => {
      document.body.classList.remove("fullscreen-mode");
    });
  }
});
// add dark mode
// add to-do list
// save the to-do for later
// Close modal if clicking outside the modal content (backdrop)
// show the countdown time on the tab
// add upload background options or offer a library of backgrounds/images to choose from
