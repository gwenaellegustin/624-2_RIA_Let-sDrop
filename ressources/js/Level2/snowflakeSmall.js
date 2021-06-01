class SnowflakeSmall {
    constructor (context, x, y, directionX, directionY, speed) {
        this.context = context;
        this.monsterReady = false;
        this.monsterImage = new Image();
        this.x = x;
        this.y = y;
        this.width = null;
        this.height = null;
        this.speed = speed;
        this.directionX = directionX;
        this.directionY = directionY;

        this.monsterImage.addEventListener("load", (event) => {
            if (event.defaultPrevented) {
                return; //Do nothing if event already handled
            }

            this.width = this.monsterImage.width;
            this.height = this.monsterImage.height;
            this.monsterReady = true;

            //Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        this.monsterImage.src = "/ressources/images/game/Level2/Snowflake25x25.png";
    }

    draw(){
        if(this.monsterReady){
            this.context.drawImage(this.monsterImage, this.x, this.y);
        }
    }

    update(secondsPassed){
        this.x += this.speed * this.directionX * secondsPassed;
        this.y += this.speed * this.directionY * secondsPassed;
 
        //Touching bottom
        if (this.y > this.context.canvas.height - this.height) { 
           this.y = 50;
        } 
    }
}