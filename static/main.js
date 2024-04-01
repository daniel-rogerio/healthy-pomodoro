const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const stopBtn = document.getElementById('stop');

const workMinutes = document.getElementById('work-minutes');
const workSeconds = document.getElementById('work-seconds');

const cycles = document.getElementById('cycles');

const breakMinutes = document.getElementById('break-minutes');
const breakSeconds = document.getElementById('break-seconds');

const showStretches = document.getElementById('show-stretches');
const continueStretchesBtn = document.getElementById('stretches-start');
const stopStretchesBtn = document.getElementById('stretches-pause');
const finishStretchesBtn = document.getElementById('stretches-finish');

var startTimer;

showStretches.style.display = 'none';

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

continueStretchesBtn.addEventListener('click', () => {
  if(startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert('O timer já está executando!');
  }
});

stopStretchesBtn.addEventListener('click', () => {
  if (startTimer !== undefined) {
    stopTimer();
    startTimer = undefined;
  } else {
    alert('O timer já está pausado!');
  }
});

finishStretchesBtn.addEventListener('click', () => {
  recycle();

  if(startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert('O timer já está executando!');
  }

  showStretches.style.display = 'none';

});

function timer() {
  if (workSeconds.innerText != 0) {
    workSeconds.innerText--;
  } else if (workMinutes.innerText != 0 && workSeconds.innerText == 0) {
    workSeconds.innerText = 59;
    workMinutes.innerText--;
  }

  if (workMinutes.innerText == 0 && workSeconds.innerText == 0) {
    showStretches.style.display = 'flex';
    if (breakSeconds.innerText != 0) {
      breakSeconds.innerText--;
    } else if (breakMinutes.innerText != 0 && breakSeconds == 0) {
      breakSeconds.innerText = 59;
      breakMinutes.innerText--;
    }
  }

  if (workMinutes.innerText == 0 && workSeconds.innerText == 0 && breakSeconds.innerText == 0) {
    stopTimer();
    startTimer = undefined;
  }
}

function recycle() {
  workMinutes.innerText = 25;
  workSeconds.innerText = '00';
  breakMinutes.innerText = 5;
  breakSeconds.innerText = '00';
  cycles.innerText++;
}

function stopTimer() {
  clearInterval(startTimer);
}

function getStretches() {
  fetch('https://api.api-ninjas.com/v1/exercises?type=stretching', {
    method: 'GET',
    headers: { 'X-Api-Key': 'MY-API-KEY' },
    contentType: 'application/json',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));
}

getStretches();
