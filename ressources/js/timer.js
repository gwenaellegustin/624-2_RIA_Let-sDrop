class Timer
{
    constructor(context){
        this.context = context;
        this.start = new Date();
        this.end = 0;

        this.time = null;
    }

    draw(){
        this.context.textAlign = "left";
        this.context.textBaseline = "top";
        this.context.fillStyle = "white";
        
        this.context.fillText(this.time, 10, 10);
    }

    update(secondsPassed){
        this.end = new Date();
        let diff = this.end - this.start;
        diff = new Date(diff);
        let msec = diff.getMilliseconds();
        let sec = diff.getSeconds();
        let min = diff.getMinutes();
        if (min < 10){
            min = "0" + min
        }
        if (sec < 10){
            sec = "0" + sec
        }
        if(msec < 10){
            msec = "00" +msec
        }
        else if(msec < 100){
            msec = "0" + msec
        }

        this.time = min + ":" + sec + ":" + msec;
    }
    
}