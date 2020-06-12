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
var sectionTimerDisplay = document.getElementById("sectionTimer-display");

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
    // collectInputs();     // Comment this line for testing without inputs
    calculateTotalTime();
    createTabadaArray();
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
  setDisplay.innerHTML = 1;
  labelDisplay.innerHTML = 'Workout';
  sectionTimerDisplay.innerHTML = convertSeconds(workout);
  totalTime=-1;

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


function createTabadaArray() {
  tabadaIndex = 0;

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
      else{break;}
    }
  }
}

function addTimeBlock(set, label, time) {
  for (let i=time; i>0; i--) {
    tabadaArray.push({
      "set" : set,
      "label" : label,
      "timeRemaing" : i,
      "totalTimeRemaining" : totalTime--,
    });
  }
}


function countdownTimer(){
  
  if (tabadaIndex < tabadaArray.length){
    let displayInfo = tabadaArray[tabadaIndex];
    timerDisplay.innerHTML = convertSeconds(displayInfo.totalTimeRemaining);
    setDisplay.innerHTML = displayInfo.set;
    labelDisplay.innerHTML = displayInfo.label;
    sectionTimerDisplay.innerHTML = convertSeconds(displayInfo.timeRemaing);
    tabadaIndex++;
  }

  else{
    timerDisplay.innerHTML = convertSeconds(0);
    labelDisplay.innerHTML = 'Rest';
    sectionTimerDisplay.innerHTML = convertSeconds(0);

    clearInterval(myInterval);        // stop timer 
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









