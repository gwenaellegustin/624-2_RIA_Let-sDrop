//TODO reorganize, how it works ?
class Timer
{
    constructor(context, secondsPassed){
        this.context = context;
        let d = new Date(secondsPassed)
        this.time = d.getSeconds();

    }

    draw(){
        this.context.beginPath();
        this.context.font = "10px Helvetica";
	    this.context.textAlign = "left";
	    this.context.textBaseline = "top";
	    this.context.fillStyle = "white";
	    this.context.fillText(this.time, 10, 5);
    }

    update(secondsPassed){
        let d = new Date(secondsPassed+Date.now());
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        var s = addZero(d.getSeconds());
        let timer = h + ":" + m + ":" + s;
        this.time = timer;
        this.context.fillText(secondsPassed, 32, 32 + "\nTitle")
    }
    
}

// source : https://www.w3schools.com/jsref/jsref_gethours.asp
function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }