var button = document.getElementById("my-button");
var title = document.getElementById("title");
var time = 0;
var myInterval = -1;

button.addEventListener("click", function(event){

  // Start Timer
  if(myInterval == -1){
    button.innerHTML = "Pause";

    myInterval = setInterval(function(){
      time++;
      title.innerHTML = time;
    }, 1000);
  }

  else{
    button.innerHTML = "Start";
    clearInterval(myInterval);
    myInterval = -1
  }
});



