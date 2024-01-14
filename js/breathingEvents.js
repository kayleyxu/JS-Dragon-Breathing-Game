var inhaleOrExhale = 0;     // current breath cycle, 0: inhale, 1: exhale

function returnTime() {
    return inhaleTime
}

var inhaleStartTime = new Date().getTime();
var exhaleStartTime = new Date().getTime();

var breathingEvents = {
    fireOffEvent: function () {
        console.log("Off event, breathing sound off!");
        if (inhaleOrExhale == 0) {  // currently detecting inhale cycle
            // detected end of inhale, find the inhale length
            let currentTime = new Date().getTime();
            let inhaleTime = currentTime - inhaleStartTime;

            // tell game inhale ended
            currentGame.inhaleEnd(inhaleTime);

            // inhale cycle ended, switch to exhale cycle
            inhaleOrExhale = 1;   // next cycle is exhale
        }
        else {
            // detected end of exhale, record the exhale length
            let currentTime = new Date().getTime();
            let exhaleTime = currentTime - exhaleStartTime;
            
            // tell game exhale ended
            currentGame.exhaleEnd(exhaleTime);

            // exhale cycle ended, switch to inhale cycle
            inhaleOrExhale = 0;   // next cycle is inhale
        }
    },

    fireOnEvent: function () {
        console.log("On event, breathing sound detected!");
        if (inhaleOrExhale == 0) {  // currently detecting inhale cycle
            // detected start of inhale, record the inhale start time
            inhaleStartTime = new Date().getTime();

            // tell game inhale started
            currentGame.inhaleStart();
        }
        else {
            // detected start of exhale, record the exhale start time
            exhaleStartTime = new Date().getTime();

            // tell game exhale started
            currentGame.exhaleStart();
        }
    },

    offRunning: function () {
        // console.log("offRunning");
    },

    onRunning: function () {
        // console.log("onRunning");
    }

}