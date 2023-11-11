let timerInterval;
let horaElement = document.querySelector(".hora");
let minutosElement = document.querySelector(".minutos");
let segundosElement = document.querySelector(".segundos");
let milisegundosElement = document.querySelector(".milisegundos");

//seta os valores para 0
let hora = 0;
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let isRunning = false;

//inicia o cronômetro no botão de start e seta as funções do mouse em cada botão
function startTimer() {
    if(!isRunning) {
        isRunning = true;
        timerInterval = setInterval(updateTimer,10);
        document.getElementById("start").style.pointerEvents = "none";
        document.getElementById("stop").style.pointerEvents = "auto";
        document.getElementById("reset").style.pointerEvents = "none"; // Desabilitar o botão "Reset"
    }
}

//funcionamento do botão stop e seta as funções do mouse em cada botão
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("start").style.pointerEvents = "auto";
    document.getElementById("stop").style.pointerEvents = "none";
    document.getElementById("reset").style.pointerEvents = "auto"; // Restaurar a habilitação do botão "Reset"
}

//funcionamento do botão reset, reseta todos os valores e seta a função dos botões
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    hora = 0;
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    updateTimerDisplay();
    document.getElementById("start").style.pointerEvents = "auto";
    document.getElementById("stop").style.pointerEvents = "none";
}

//nessa função exerce o funcionamento de cada tipo de contagem do relógio
function updateTimer() {
    milisegundos++;
    if (milisegundos === 100) {
        milisegundos = 0;
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
            if (minutos === 60) {
                minutos = 0;
                hora++;
            }
        }
    }
    updateTimerDisplay();
}

//formata os elementos das horas com dois digitos e atualiza a exibição na tela
function updateTimerDisplay() {
    horaElement.textContent = formatTime(hora);
    minutosElement.textContent = formatTime(minutos);
    segundosElement.textContent = formatTime(segundos);
    milisegundosElement.textContent = formatMilliseconds(milisegundos);
}

//formata números até o 10 e acrescenta um 0 a esquerda
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

//formata a exibição em milisegundos, com um 0s de < 100 e dois 0s se < 10
function formatMilliseconds(milliseconds) {
    if (milliseconds < 10) {
        return `00${milliseconds}`;
    } else if (milliseconds < 100) {
        return `0${milliseconds}`;
    } else {
        return milliseconds;
    }
}

//chama as funções de cada botão após o clique do mouse
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);