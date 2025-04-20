/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Timer {
  constructor(context) {
    this.context = context;
    this.start = new Date();
    this.end = 0;
    this.diff = null;
    this.time = null;
    this.timeWithMilliSeconds = null;
  }

  draw() {
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
    this.context.fillStyle = "white";

    this.context.fillText(this.time, 10, 10);
  }

  update() {
    this.end = new Date();
    this.diff = this.end - this.start;
    this.diff = new Date(this.diff);

    let msec = this.diff.getMilliseconds();
    let sec = this.diff.getSeconds();
    let min = this.diff.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (msec < 10) {
      msec = "00" + msec;
    } else if (msec < 100) {
      msec = "0" + msec;
    }

    this.time = min + ":" + sec;
    this.timeWithMilliSeconds = min + ":" + sec + ":" + msec;
  }
}
