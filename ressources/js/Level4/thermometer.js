class Thermometer{
    constructor (context, x, y){
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = 9;
        this.height = -1;
        this.speed = 3;
        this.isColliding = false;
    }

    draw(){
        this.context.fillStyle = "#f2574e";
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        this.height -= this.speed * secondsPassed;
    }
}