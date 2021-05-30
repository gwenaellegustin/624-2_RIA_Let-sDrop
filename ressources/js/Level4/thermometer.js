class Thermometer{
    constructor (context, x, y){
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = 7;
        this.height = -1;
        this.speed = 3;

        this.isColliding = false;
    }

    draw(){
        this.context.fillStyle = '#f2574e'; //#39b4b2
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        this.height -= this.speed * secondsPassed;
    }
}