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
var setDisplay = document.getElementById("set-display");
var labelDisplay = document.getElementById("label-display");
var labelTimerDisplay = document.getElementById("labelTimer-display");

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
var tabadaIndex = 0;


//-----------------------------------------------------------------------------------------------
// BUTTON FUNCTIONS
//-----------------------------------------------------------------------------------------------

// Start / Pause Button
startButton.addEventListener("click", function(event){

  // Set up Tabada Timer
  if (totalTime == -1){
    collectInputs();        // Comment this line for testing without inputs
    calculateTotalTime();
    createTabadaArray();
  }

  // Start timer
  if (myInterval == -1){
    startButton.innerHTML = "Pause";
    myInterval = setInterval(tabadaTimer, 1000);
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
  updateOutputs(totalTime, 1, 'Workout', workout);               
  totalTime=-1;  // Alows user to change input values before clicking start button.

  // Reset start / pause button
  myInterval = -1;                  
  startButton.innerHTML = "Start"; 
});


//-----------------------------------------------------------------------------------------------
// SETUP FOR TABADA TIMER
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

function createTabadaArray() {
  tabadaIndex = 0;    // Global variable used for tabada timer
  tabadaArray = [];
  
  for( let set=1; set<=sets; set++ ){
    for( let exersise=1; exersise<=exersises; exersise++){

      // Workout
      addTimeBlock(set, 'Workout', workout);

      // Exersise Rest
      if ( exersise < exersises){
        addTimeBlock(set, 'Rest', exersiseRest);
      }

      // Set Rest
      else if( set < sets){
        addTimeBlock(set, 'Rest', setRest);
      }
      
      // Done
      else{break;}   // Very end exersize has no rest, so we must break the loop.
    }
  }
}

function addTimeBlock(set, label, labelTime) {

  // Add a sub timer to the array (workout, exersice rest, or set rest)
  for (let i=labelTime; i>0; i--) {
    tabadaArray.push({
      "totalTimeRemaining" : totalTime--,
      "set" : set,
      "label" : label,
      "labelTimeRemaining" : i,
    });
  }
}

//-----------------------------------------------------------------------------------------------
// TABADA TIMER
//-----------------------------------------------------------------------------------------------

function tabadaTimer(){
  // Still time left
  if (tabadaIndex < tabadaArray.length){
    let displayInfo = tabadaArray[tabadaIndex];
    updateOutputs(  displayInfo.totalTimeRemaining, 
                    displayInfo.set,
                    displayInfo.label,
                    displayInfo.labelTimeRemaining );
    tabadaIndex++;
  }

  // End of tabada timer
  else{
    clearInterval(myInterval);        // stop timer 
    updateOutputs(0, 1, 'Rest', 0);
    totalTime = -1
  }
}

function updateOutputs(totalTimeRemaining, setNumber, label, labelTimeRemaining){
  timerDisplay.innerHTML = convertSeconds(totalTimeRemaining);
  setDisplay.innerHTML = setNumber;
  labelDisplay.innerHTML = label;
  labelTimerDisplay.innerHTML = convertSeconds(labelTimeRemaining);
}

function convertSeconds(s){
  // Seconds -> mm:ss format 

  // Calculate
  let minutes = Math.floor(s/60);
  let seconds = s%60;

  // Format
  let formattedminutes = ("0" + minutes).slice(-2);
  let formattedseconds = ("0" + seconds).slice(-2);
  return formattedminutes + ':' + formattedseconds;
}

