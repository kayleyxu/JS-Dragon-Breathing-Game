const maxNum = 500;  //stop the intervals when this number is reached

class Fire {
      constructor(dragon) {
            this.dragon = dragon;
            this.imageElement = document.getElementById("fire");
            console.log("create fire", this.imageElement)
            this.fireWidth = 0;
            this.fireHeight = 0;
            this.intervalId = null ; // IntervalId returned by setInterval
      }

      incrementIntervalFire() {
            this.fireWidth += 4;
            this.fireHeight += 1;

            this.imageElement.style.width = this.fireWidth.toString() + "px";
            this.imageElement.style.height = this.fireHeight.toString() + "px";
            this.imageElement.style.top = parseFloat(this.dragon.imageElement.style.top) - parseFloat(this.imageElement.style.height) * 190 / 233 + 165 + "px";

            if (this.fireWidth > maxNum) {
                  // stop interval timer, stop animation
                  clearInterval(this.intervalId);
                  //console.log("Interval1 maxNum reached. num1=" + fireWidth.toString());
            }
      }

      resetFire() {
            // stop interval
            clearInterval(this.intervalId);
            // hide fire
            this.fireWidth = 0;
            this.fireHeight = 0;
            this.imageElement.style.display = "none";
      }

      show(intervalTime) {
            this.imageElement.style.display = "block";
            this.intervalId = setInterval(this.incrementIntervalFire.bind(this), 5);   // increase fire size to increase it
            // start a timeout timer to reset fire
            setTimeout(this.resetFire.bind(this), intervalTime);
      }

      moveUp() {
            this.imageElement.style.top = this.dragon.imageElement.style.top; 
      }

      moveDown() {
            this.imageElement.style.top = this.dragon.imageElement.style.top; 
      }
}
