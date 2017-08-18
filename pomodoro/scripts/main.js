var defaultTime = 1500;
var time = defaultTime;
var hours = 0;
var minutes = 0;
var seconds = 0;
var timeString = "";
var timeUnit = [];
var pause = false;
var started = false;
var statusText = document.getElementById("status");
var pauseButton = document.getElementById("pause");
var timeInput = document.getElementById("timeInput")
var clockTimer = document.getElementById("clock")
var tick = new Audio("sounds/tick.mp3");
tick.volume = "0.1"
var alarm = new Audio("sounds/alarm.mp3");
alarm.volume = "0.5"
var intervalIndex = 0;

//converts second time to XX:YY:ZZ
function convert(time){
	//clears array
		timeUnit=[];
	//clears string
		timeString = ""
		
//		console.log(time)
	//hours
		hours = Math.floor(time/3600);
		time -= (hours*3600);
		timeUnit.push(hours)

	//minutes	
	minutes = Math.floor(time/60)
	time -= (minutes*60);
	timeUnit.push(minutes)
	
	//seconds
	seconds = time;

	timeUnit.push(seconds)
	
	//adds 0 when unit is less than 10
	for(var i=0; i<timeUnit.length; i++){
	
		if(timeUnit[i]<10)
			timeString += "0" + timeUnit[i]
		else
			timeString += timeUnit[i]
	//adds colon when while its not last unit
		if(i !== timeUnit.length-1	)
			timeString += ":"
	}
//	console.log(timeString)
//	*/


	clockTimer.innerHTML = timeString;
	return timeString;
	}
	
	

function clock(){
	
			
	if((started == false)&&(pause==false)){	
		statusText.innerHTML = "Started"
		started = true;
		intervalIndex++;
		setInterval(function(){
			
			if(time==0){
				clearInterval(intervalIndex);
				alarm.play();
			}
			
			if((pause !== true) && (time>0)){
				time--;
				tick.play();
				convert(time)
				
			}
		}, 1000);
	
	}
}


function pauseThis(){
	if(pause == true){
	pause=false;
	statusText.innerHTML = "Unpaused"
	pauseButton.innerHTML = "Pause"
	}
	
else{
	pause = true;
	statusText.innerHTML = "Paused"
		pauseButton.innerHTML = "Unpause"
}
	
}


function resetAll(){
	statusText.innerHTML = "Reseted"
	clearInterval(intervalIndex);
	started = false;
	time = defaultTime;
	
	
}

var secondsSetted = document.getElementById("secondsSetted")
var timeInput = document.getElementById("timeInput");
var changed
function setTime(){
	changed = Number(timeInput.value);
	if(typeof changed == "number"){
			time = changed;
			secondsSetted.innerHTML = convert(time);
	}
	else
		alert("Only seconds accepted")
}

function changeTime(){
buttonValue = Number(this.innerHTML)
if((buttonValue + time)>0)
time += buttonValue;
clockTimer.innerHTML = convert(time)
}

var buttonArray = document.getElementsByClassName("changeButton")


for(var i=0; i<buttonArray.length; i++){
buttonArray[i].addEventListener("click", changeTime)
}


var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetAll)

var pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", pauseThis);

