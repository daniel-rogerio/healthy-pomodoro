const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const stopBtn = document.getElementById('stop');

const workMinutes = document.getElementById('work-minutes');
const workSeconds = document.getElementById('work-seconds');

const cycles = document.getElementById('cycles');

const breakMinutes = document.getElementById('break-minutes');
const breakSeconds = document.getElementById('break-seconds');

var startTimer;

startBtn.addEventListener('click', () => {
  if(startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert('O timer já está executando!');
  }
});

resetBtn.addEventListener('click', () => {
  workMinutes.innerText = 25;
  workSeconds.innerText = '00';
  breakMinutes.innerText = 5;
  breakSeconds.innerText = '00';
  cycles.innerText = 0;

  stopTimer();

  startTimer = undefined;
});

stopBtn.addEventListener('click', () => {
  if (startTimer !== undefined) {
    stopTimer();
    startTimer = undefined;
  } else {
    alert('O timer já está pausado!');
  }
});

function timer() {
  if (workSeconds.innerText != 0) {
    workSeconds.innerText--;
  } else if (workMinutes.innerText != 0 && workSeconds.innerText == 0) {
    workSeconds.innerText = 59;
    workMinutes.innerText--;
  }

  if (workMinutes.innerText == 0 && workSeconds.innerText == 0) {
    if (breakSeconds.innerText != 0) {
      breakSeconds.innerText--;
    } else if (breakMinutes.innerText != 0 && breakSeconds == 0) {
      breakSeconds.innerText = 59;
      breakMinutes.innerText--;
    }
  }

  if (workMinutes.innerText == 0 && workSeconds.innerText == 0 && breakSeconds.innerText == 0) {
    workMinutes.innerText = 25;
    workSeconds.innerText = '00';
    breakMinutes.innerText = 5;
    breakSeconds.innerText = '00';
    cycles.innerText++;
  }
}

function stopTimer() {
  clearInterval(startTimer);
}