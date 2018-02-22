const statusText = document.getElementById("status");
const pauseButton = document.getElementById("pause");
const clockTimer = document.getElementById("clock");
const resetButton = document.querySelector('#reset');
const buttons = document.getElementsByClassName("changeButton");
let defaultTime = 1500;
let time = defaultTime;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timeString = "";
let timeUnit = [];
let pause = false;
let started = false;
let newTime;
let clockInterval;

//sets audio and volume
var tick = new Audio("sounds/tick.mp3");
tick.volume = "0.1";
var alarm = new Audio("sounds/alarm.mp3");
alarm.volume = "0.5";

//converts second time to XX:YY:ZZ
function convert(time){
	//clears array
	timeUnit=[];

	//clears string
	timeString = "";

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
		if(timeUnit[i]<10){
			timeString += "0" + timeUnit[i];
		}
		else{
			timeString += timeUnit[i];
		}
	//adds colon while its not last unit
		if(i !== timeUnit.length-1){
			timeString += ":";
		}
	}

	clockTimer.innerHTML = timeString;
	return timeString;
	}
	

function clock(){
	if(!started && !pause){	
		started = true;
		alarm.pause();
		statusText.innerHTML = "Started";
		clockInterval = setInterval(function(){
			if(time == 0){
				clearInterval(clockInterval);
				started = false;
				alarm.play();
			}
			
			if(!pause && time > 0){
				time--;
				tick.play();
				convert(time);	
			}
		}, 1000);
	}
}

function pauseToggle(){
	if(pause){
		statusText.innerHTML = "Unpaused";
		pauseButton.innerHTML = "Pause";
	}
	else{
		statusText.innerHTML = "Paused";
		pauseButton.innerHTML = "Unpause";
	}
	pause = !pause
}

function reset(){
	statusText.innerText = "Reseted";
	clockTimer.innerText = convert(1500);
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
	buttonValue = Number(this.innerText);
	if((buttonValue + time)>0){
		time += buttonValue;
	}
	clockTimer.innerHTML = convert(time);
}


for(var i=0; i<buttons.length; i++){
	buttons[i].addEventListener("click", changeTime);
}


resetButton.addEventListener("click", reset);

pauseButton.addEventListener("click", pauseToggle);

