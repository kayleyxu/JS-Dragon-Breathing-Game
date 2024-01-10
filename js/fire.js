let fireWidth = 0;
let fireHeight = 0;
const maxNum = 1500;  //stop the intervals when this number is reached
//let intFire = null;

/*for demonstration purposes, we'll just create two nearly identical functions
that iterate an integer by 1. In practice, you could put in whatever code you
need (such as moving a shape) into these functions .*/

const intervalFire = document.getElementById("fire");

function incrementIntervalFire(){
      intervalFire.style.width = fireWidth.toString() + "px";
      intervalFire.style.height = fireHeight.toString() + "px";
      intervalFire.style.top = parseFloat(currentDragon.imageElement.style.top) - parseFloat(intervalFire.style.height) * 190/233 + 165 + "px"; 
      fireWidth+=4;     
      fireHeight+=1;
      if (fireWidth > maxNum){
            clearInterval(fireID);
            //console.log("Interval1 maxNum reached. num1=" + fireWidth.toString());
      }
}
/* Running the two functions simultaneously at different intervals.

The setInterval is one of the few JavaScript functions that can run asynchronously.
This means that it can run at the same time as other code, and it can run
at different intervals than other code. This makes it a very handy function.

Run the code and you'll see that the two intervals run at different speeds simultaneously
by displaying the counters and changing the width of the p elements to match the counters.      
*/

function resetFire(){
      var fireImage = document.getElementById("fire");
      fireImage.style.display = "none";
      fireWidth = 0;
      fireHeight = 0;
}
