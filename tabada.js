//-----------------------------------------------------------------------------------------------
// GLOBAL VARIABLES
//-----------------------------------------------------------------------------------------------

// HTML
var setsInput = document.getElementById("sets-input");
var exersisesInput = document.getElementById("exercises-input");
var workoutInput = document.getElementById("workout-input");
var exersiseRestInput = document.getElementById("exersiseRest-input");
var setRestInput = document.getElementById("setRest-input");

var timerDisplay = document.getElementById("timer-display");

var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");

// JavaScript
var sets = 2;
var exersises = 3;
var workout = 5;
var exersiseRest = 2;
var setRest = 3;

var totalTime = -1;
var myInterval = -1;
var tabadaArray = [];


//-----------------------------------------------------------------------------------------------
// BUTTON FUNCTIONS
//-----------------------------------------------------------------------------------------------

// Start / Pause Button
startButton.addEventListener("click", function(event){

  // Set up Tabada Timer
  if (totalTime == -1){
    // collectInputs();     // Comment this line for testing without inputs
    calculateTotalTime();
  }

  // Start timer
  if (myInterval == -1){
    startButton.innerHTML = "Pause";
    myInterval = setInterval(countdownTimer, 1000);
  }

  // Pause timer
  else{
    startButton.innerHTML = "Start";
    clearInterval(myInterval);
    myInterval = -1
  }
});


// Reset Button
resetButton.addEventListener("click", function(event){
  
  // Stop Timer
  clearInterval(myInterval);   
 
  // Refresh Timer Display
  calculateTotalTime();                
  timerDisplay.innerHTML = convertSeconds(totalTime);

  // Reset start / pause button
  myInterval = -1;                  
  startButton.innerHTML = "Start"; 
});


//-----------------------------------------------------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------------------------------------------------

function collectInputs(){
  sets = parseFloat(setsInput.value);
  exersises = parseFloat(exersisesInput.value);
  workout = parseFloat(workoutInput.value);
  exersiseRest = parseFloat(exersiseRestInput.value);
  setRest = parseFloat(setRestInput.value);
}

function calculateTotalTime(){
  let totalWorkoutTime = workout * exersises * sets;
  let totalExersiseRest = exersiseRest * (exersises - 1) * sets;
  let totalSetsRest = setRest * (sets - 1);

  totalTime = totalWorkoutTime + totalExersiseRest + totalSetsRest;
}

function countdownTimer(){
  // Stop timer at zero
  if (totalTime==0){
    timerDisplay.innerHTML = "Done!";  
    clearInterval(myInterval);        // stop timer 
  }

  else{
    timerDisplay.innerHTML = convertSeconds(totalTime);
    totalTime--;
  }
}

function convertSeconds(s){
  // Calculate
  let minutes = Math.floor(s/60);
  let seconds = s%60;

  // Format
  let formattedminutes = ("0" + minutes).slice(-2);
  let formattedseconds = ("0" + seconds).slice(-2);
  return formattedminutes + ':' + formattedseconds;
}









