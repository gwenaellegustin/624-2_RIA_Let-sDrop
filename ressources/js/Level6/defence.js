class Defence{
    constructor (context, x, y, directionX) {
        this.context = context;
        this.ready = false;
        this.image = new Image();
        this.x = x;
        this.y = y;
        this.width = null;
        this.height = null;
        this.speed = 300;
        this.directionX = directionX;
        this.directionY = 0;

        this.image.addEventListener('load', () => {
            this.width = this.image.width;
            this.height = this.image.height;
            this.ready = true; //The image has been load, we can draw it
        });

        this.image.src = "/ressources/images/game/Health17x20.png";
    }

    draw(){
        if(this.ready){
            this.context.drawImage(this.image, this.x, this.y);
        }
    }

    update(secondsPassed) {
        this.x += this.speed * this.directionX * secondsPassed;
        this.y += this.speed * this.directionY * secondsPassed;
    }
}