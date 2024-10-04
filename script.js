let timer;
let isRunning = false;
let seconds = 0;
const lapList = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapListElement = document.getElementById('lapList');

function updateDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

function pad(num) {
    return String(num).padStart(2, '0');
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    lapList.length = 0;
    updateDisplay();
    lapListElement.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = seconds;
        lapList.push(lapTime);
        displayLap(lapTime);
    }
});

function displayLap(lapTime) {
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.textContent = `Lap: ${pad(Math.floor(lapTime / 3600))}:${pad(Math.floor((lapTime % 3600) / 60))}:${pad(lapTime % 60)}`;
    lapListElement.appendChild(lapItem);
}

// Initialize display
updateDisplay();
