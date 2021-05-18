class LittleFire{
    constructor (context, x, y, droppy) {
        this.context = context;
        this.littleFireReady = false;
        this.littleFireImage = new Image();
        this.x = x;
        this.y = y;
        this.width = null;
        this.height = null;
        this.speed = 20;
        this.droppy = droppy;

        let dx = (droppy.x - x);
        let dy = (droppy.y - y);
        let mag = Math.sqrt(dx * dx + dy * dy);
        this.velocityX = (dx / mag) * this.speed;
        this.velocityY = (dy / mag) * this.speed;

        this.littleFireImage.addEventListener('load', () => {
            this.width = this.littleFireImage.width;
            this.height = this.littleFireImage.height;
            this.littleFireReady = true; //The image has been load, we can draw it
        });

        this.littleFireImage.src = "/ressources/images/game/Level3/LittleFire14x18.png";
    }

    draw(){
        if(this.littleFireReady){
            this.context.drawImage(this.littleFireImage, this.x, this.y);
        }
    }

    update(secondsPassed) {
        this.x += this.velocityX * secondsPassed;
        this.y += this.velocityY * secondsPassed;
    }
}