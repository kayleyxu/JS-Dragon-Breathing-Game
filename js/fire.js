const maxNum = 1000;  //stop the intervals when this number is reached

class Fire {
      constructor(dragon) {
            this.dragon = dragon;
            this.imageElement = document.getElementById("fire");
            console.log("create fire", this.imageElement)
            this.fireWidth = 0;
            this.fireHeight = 0;
            this.intervalId = null ; // IntervalId returned by setInterval
      }

      updateFireImage() {
            this.imageElement.style.width = this.fireWidth.toString() + "px";
            this.imageElement.style.height = this.fireHeight.toString() + "px";
            this.imageElement.style.top = parseFloat(this.dragon.imageElement.style.top) - parseFloat(this.imageElement.style.height) * 190 / 233 + 165 + "px";
      }

      incrementIntervalFire() {
            this.fireWidth += 4;
            this.fireHeight += 1;

            if (this.fireWidth > maxNum) {
                  // stop interval timer, stop animation
                  clearInterval(this.intervalId);
                  //console.log("Interval1 maxNum reached. num1=" + fireWidth.toString());
            }

            this.updateFireImage();
      }

      start() {
            // start showing fire
            this.fireWidth = 0;
            this.fireHeight = 0;
            this.updateFireImage();
            this.imageElement.style.display = "block";

            this.intervalId = setInterval(this.incrementIntervalFire.bind(this), 5);   // increase fire size to increase it
      }

      stop() {
            // stop interval
            clearInterval(this.intervalId);

            // hide fire
            this.fireWidth = 0;
            this.fireHeight = 0;
            this.updateFireImage();
            this.imageElement.style.display = "none";
      }

      isVisible() {
            return this.imageElement.style.display != "none";
      }

      moveUp() {
            this.imageElement.style.top = this.dragon.imageElement.style.top; 
      }

      moveDown() {
            this.imageElement.style.top = this.dragon.imageElement.style.top; 
      }
}
