// Global Variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let bestLap = Infinity;
// calling elements from Dom 
const timerScreen = document.getElementById("runner");
const lapList = document.getElementById("lapsPortion");
const bestLapDisplay = document.getElementById("bestLap").querySelector("span");
const startBtn = document.querySelector("#timerBtnContainer button:nth-child(1)");
const stopBtn = document.querySelector("#timerBtnContainer button:nth-child(2)");
// Function to start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    timerScreen.textContent = formatTime(elapsedTime);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}
// Function to stop the timer and record laps
function stopTimer() {
    clearInterval(timerInterval);
    laps.push(elapsedTime);
    if (elapsedTime < bestLap) {
        bestLap = elapsedTime;
        bestLapDisplay.textContent = `Lap ${laps.length} ${formatTime(bestLap)}`;
    }
    lapList.innerHTML = "";

    laps.forEach((lapTime, index) => {
        const lap = document.createElement('div');
        lap.id = `lap`;
        lap.innerHTML = `<p>Lap ${index + 1} ${formatTime(lapTime)}</p>`;
        lapList.appendChild(lap);
    });

    startBtn.disabled = false;
    stopBtn.disabled = true;
}
// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    laps = [];
    bestLap = Infinity;
    timerScreen.textContent = "00:00";
    lapList.innerHTML = `<p>Lap 00:00</p>`;
    bestLapDisplay.textContent = "lap 00:00";
    startBtn.disabled = false;
    stopBtn.disabled = true;
}
// Function to update the timer display
function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerScreen.textContent = formatTime(elapsedTime);
}
// Function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
// Event listener for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
    startBtn.addEventListener("click", startTimer);
    stopBtn.addEventListener("click", stopTimer);
    document.querySelector("#timerBtnContainer button:nth-child(3)").addEventListener("click", resetTimer);
});
