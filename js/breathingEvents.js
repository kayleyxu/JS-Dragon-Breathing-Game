var breathCounter = 0;
var inhaleOrExhale = 0;
var currentDragon = new dragon(0, 0, 0, "currentDragon");

function returnTime(){
    return inhaleTime
}

let fireID = null;

function setFireID(fID)
{
    fireID = fID;
}

var startTime = new Date().getTime();
console.log("initial startTime: ", startTime)
var endTime = new Date().getTime();

var breathingEvents = {
    fireOffEvent : function(){
        
    },
    
    fireOnEvent : function(){
        inhaleOrExhale = breathCounter % 2;

        if (inhaleOrExhale == 0){  //inhale
            startTime = new Date().getTime();
            //console.log("startTime: ", startTime);
            //console.log("fireOnEvent: inhale");
            currentDragon.inhaleReset();
        }
        if (inhaleOrExhale == 1){  //exhale
            var fireImage = document.getElementById("fire");
            fireImage.style.display = "block";
            endTime = new Date().getTime();
            //console.log("endTime: ", endTime);
            console.log("fireOnEvent: exhale");
            var inhaleTime = 0;
            inhaleTime = endTime - startTime;
            console.log("inhale time: ", inhaleTime);
            currentDragon.exhaleReset();
            var fireID = setInterval(incrementIntervalFire, 0.5);
            setFireID(fireID);
            setTimeout(resetFire, inhaleTime);
        }
        
        
        breathCounter += 1;
    },
                
    offRunning : function(){   
        console.log("offRunning");

        if (inhaleOrExhale == 0){
            //console.log("offRunning: inhaleOrExhale = 1");
            
        }
        
        if (inhaleOrExhale == 1){
            //console.log("offRunning: inhaleOrExhale = 1");
            
        }
    
        
    },
     
    onRunning : function(){
        
    console.log("onRunning");

    }
    
}

function clicked(){

console.log("clicked")
//Create audioContext
window.AudioContext = window.AudioContext ||
                    window.webkitAudioContext ||
                    window.mozAudioContext ||
                    window.oAudioContext ||	
                    window.msAudioContext;

audioContext = new AudioContext();
//console.log("audioCotext state", audioContext.state);
audioContext.resume();
//console.log("audioCotext state", audioContext.state);
    breathingAlgorithm.run({'runjQuery' : true});
    //breathingAlgorithm.run();
}

var inhaleTime = endTime - startTime;
console.log("global inhale time: ", inhaleTime);