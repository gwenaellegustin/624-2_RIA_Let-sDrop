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
        this.angle = 0;

        this.image.addEventListener ('load', (event) => {
            if (event.defaultPrevented) {
                return; //Do nothing if event already handled
            }

            this.width = this.image.width;
            this.height = this.image.height;
            this.ready = true; //The image has been load, we can draw it

            //Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        this.image.src = "/ressources/images/game/Health17x20.png";
    }

    draw(){
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);
        
        if(this.ready){
            this.context.drawImage(this.image, -this.width/2, -this.height/2);
        }
        this.context.restore();
    }

    update(secondsPassed) {
        
        this.x += this.speed * this.directionX * secondsPassed;
        this.y += this.speed * this.directionY * secondsPassed;
        if (this.directionX == -1 ){
            this.angle = -Math.PI/2;
        } else {
            this.angle = Math.PI/2;
        }
    }
}