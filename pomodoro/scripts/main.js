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
var clockTimer = document.getElementById("clock")
var buttons = document.getElementsByClassName("changeButton")
var newTime

//sets audio and volume
var tick = new Audio("sounds/tick.mp3");
tick.volume = "0.1"
var alarm = new Audio("sounds/alarm.mp3");
alarm.volume = "0.5"

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
	//adds 0 when time unit is less than 10
	for(var i=0; i<timeUnit.length; i++){
	
		if(timeUnit[i]<10)
			timeString += "0" + timeUnit[i]
		else
			timeString += timeUnit[i]
	//adds colon while its not last unit
		if(i !== timeUnit.length-1	)
			timeString += ":"
	}


	clockTimer.innerHTML = timeString;
	return timeString;
	}
	
	var clockInterval;

function clock(){
	
	if((started == false)&&(pause==false)){	
		statusText.innerHTML = "Started"
		started = true;
		clockInterval = setInterval(function(){
			
			if(time == 0){
				clearInterval(clockInterval);
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
	if(pause){
		statusText.innerHTML = "Unpaused"
		pauseButton.innerHTML = "Pause"
	}
	
	else{
		statusText.innerHTML = "Paused"
		pauseButton.innerHTML = "Unpause"
	}
	pause = !pause
	
}

function resetAll(){
	statusText.innerHTML = "Reseted"
	clearInterval(clockInterval);
	started = false;
	time = defaultTime;
}

function setTime(){
	newTime = Number(document.getElementById("timeInput").value);
	if(typeof newTime == "number"){
			time = newTime;
			document.getElementById("secondsSetted").innerHTML = convert(time);
	}
	else
		alert("Time has to be a number");
}

function changeTime(){
	buttonValue = Number(this.innerHTML)
		if((buttonValue + time)>0)
			time += buttonValue;
	clockTimer.innerHTML = convert(time)
}


for(var i=0; i<buttons.length; i++){
buttons[i].addEventListener("click", changeTime)
}


document.getElementById("reset").addEventListener("click", resetAll)

document.getElementById("pause").addEventListener("click", pauseThis);

