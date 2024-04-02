// Botões de controle do Pomodoro Timer:
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const stopBtn = document.getElementById('stop');

// Tempo do Pomodoro Timer:
const workMinutes = document.getElementById('work-minutes');
const workSeconds = document.getElementById('work-seconds');

// Contador de ciclos realizados:
const cycles = document.getElementById('cycles');

// Tempo do descanso:
const breakMinutes = document.getElementById('break-minutes');
const breakSeconds = document.getElementById('break-seconds');

// Controle de exibição do cartão de alongamentos:
const showStretches = document.getElementById('show-stretches');

// Botões de controle do cartão de alongamentos:
const continueStretchesBtn = document.getElementById('stretches-start');
const stopStretchesBtn = document.getElementById('stretches-pause');
const finishStretchesBtn = document.getElementById('stretches-finish');

// Variaveis de controle:
var startTimer;
let stretchesList = [];
let currentStretche = 0;
let offset = 0;

// Evento para iniciar o Pomodoro Timer:
startBtn.addEventListener('click', () => {
  if(startTimer === undefined) {
    getStretches();
    startTimer = setInterval(timer, 1000);
  } else {
    alert('The timer is already running!');
  }
});

// Evento para resetar o Pomodoro Timer:
resetBtn.addEventListener('click', () => {
  workMinutes.innerText = 25;
  workSeconds.innerText = '00';
  breakMinutes.innerText = 5;
  breakSeconds.innerText = '00';
  cycles.innerText = 0;

  stopTimer();

  startTimer = undefined;
});

// Evento para parar o Pomodoro Timer:
stopBtn.addEventListener('click', () => {
  if (startTimer !== undefined) {
    stopTimer();
    startTimer = undefined;
  } else {
    alert('The timer is already paused!');
  }
});

// Evento para iniciar o Pomodoro Timer usando os botões de controle dos alongamentos:
continueStretchesBtn.addEventListener('click', () => {
  if(startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert('The timer is already running!');
  }
});

// Evento para parar o Pomodoro Timer usando os botões de controle dos alongamentos:
stopStretchesBtn.addEventListener('click', () => {
  if (startTimer !== undefined) {
    stopTimer();
    startTimer = undefined;
  } else {
    alert('The timer is already paused!');
  }
});

// Evento para concluir o alongamento e iniciar um novo ciclo:
finishStretchesBtn.addEventListener('click', () => {
  recycle();

  if(startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  }

  showStretches.style.display = 'none';

});

// Função para controlar o Pomodoro Timer:
function timer() {
  if (workSeconds.innerText != 0) {
    workSeconds.innerText--;
  } else if (workMinutes.innerText != 0 && workSeconds.innerText == 0) {
    workSeconds.innerText = 59;
    workMinutes.innerText--;
  }

  if (workMinutes.innerText == 0 && workSeconds.innerText == 0) {
    setStretches();
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

// Função para resetar o Pomodoro Timer e iniciar um novo ciclo:
function recycle() {
  workMinutes.innerText = 25;
  workSeconds.innerText = '00';
  breakMinutes.innerText = 5;
  breakSeconds.innerText = '00';
  cycles.innerText++;

  if (currentStretche === 9) {
    offset += 10;
    currentStretche = 0;
    getStretches()
    return
  } else {
    currentStretche++;
  }
}

// Função para parar o Pomodoro Timer:
function stopTimer() {
  clearInterval(startTimer);
}

// Função para buscar os dados da API dos alongamentos via 'fetch':
function getStretches() {
  fetch('https://api.api-ninjas.com/v1/exercises?type=stretching&offset=' + offset, {
    method: 'GET',
    headers: { 'X-Api-Key': 'MY_API_KEY' },
    contentType: 'application/json',
  })
  .then(response => response.json())
  .then(data => {
    stretchesList = data;
    console.log(data);
  })
  .catch(error => console.log(error));
}

// Função para atualizar o cartão dos alongamentos com as informações dos alongamentos:
function setStretches() {
  const exerciceName = document.getElementById('exercice-name');
  const exerciceType = document.getElementById('exercice-type');
  const exerciceMuscle = document.getElementById('exercice-muscle');
  const exerciceDifficult = document.getElementById('exercice-difficult');
  const exerciceInstruction = document.getElementById('exercice-instruction');

  exerciceName.innerText = stretchesList[currentStretche].name;
  exerciceType.innerText = `Type: ${stretchesList[currentStretche].type}`;
  exerciceMuscle.innerText = `Muscle: ${stretchesList[currentStretche].muscle}`;
  exerciceDifficult.innerText = `Difficult: ${stretchesList[currentStretche].difficulty}`;
  exerciceInstruction.innerText = `INSTRUCTIONS:\n\n${stretchesList[currentStretche].instructions}`;

}
