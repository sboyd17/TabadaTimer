
// Setup
var title = document.getElementById("title");
var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");
var timeInput = document.getElementById("time-input");

var timeleft = -1;
var myInterval = -1;


startButton.addEventListener("click", function(event){

  // Get time value
  if (timeleft == -1){
    timeleft = timeInput.value;
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

function countdownTimer(){
  // Stop timer at zero
  if (timeleft==0){
    title.innerHTML = "Done!";  
    clearInterval(myInterval);        // stop timer 
  }

  else{
    title.innerHTML = convertSeconds(timeleft);
    timeleft--;
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


function resetTimer(label){
  // Stop timer
  clearInterval(myInterval);   
  
  // Reset time and display
  timeleft = timeInput.value;                     
  title.innerHTML = convertSeconds(timeleft);

  // Reset start / pause button
  myInterval = -1;                  
  startButton.innerHTML = "Start"; 
}



