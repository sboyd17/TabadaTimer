
// Setup
var button = document.getElementById("my-button");
var title = document.getElementById("title");
var timeleft = 5;
var myInterval = -1;

button.addEventListener("click", function(event){

  // Start Timer
  if(myInterval == -1){
    button.innerHTML = "Pause";
    myInterval = setInterval(countdownTimer, 1000);
  }

  else{
    button.innerHTML = "Start";
    clearInterval(myInterval);
    myInterval = -1
  }
});

function countdownTimer(){
  // Stop timer at zero
  if (timeleft==0){
    title.innerHTML = "Done!";
    clearInterval(myInterval);
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




