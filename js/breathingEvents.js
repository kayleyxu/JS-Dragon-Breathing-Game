var breathCounter = 0;
var inhaleOrExhale = 0;

function returnTime() {
    return inhaleTime
}

var startTime = new Date().getTime();
console.log("initial startTime: ", startTime)
var endTime = new Date().getTime();

var breathingEvents = {
    fireOffEvent: function () {

    },

    fireOnEvent: function () {
        inhaleOrExhale = breathCounter % 2;

        if (inhaleOrExhale == 0) {  //inhale
            startTime = new Date().getTime();
            //console.log("startTime: ", startTime);
            //console.log("fireOnEvent: inhale");
            currentGame.inhaleReset();
        }
        if (inhaleOrExhale == 1) {  //exhale
            endTime = new Date().getTime();
            //console.log("endTime: ", endTime);
            console.log("fireOnEvent: exhale");
            var inhaleTime = 0;
            inhaleTime = endTime - startTime;
            console.log("inhale time: ", inhaleTime);
            currentGame.exhaleReset(inhaleTime);
        }


        breathCounter += 1;
    },

    offRunning: function () {
        // console.log("offRunning");

        if (inhaleOrExhale == 0) {
            //console.log("offRunning: inhaleOrExhale = 1");

        }

        if (inhaleOrExhale == 1) {
            //console.log("offRunning: inhaleOrExhale = 1");

        }


    },

    onRunning: function () {
        // console.log("onRunning");
    }

}


var inhaleTime = endTime - startTime;
console.log("global inhale time: ", inhaleTime);