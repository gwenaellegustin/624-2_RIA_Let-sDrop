class MonsterHand {
    constructor (context, x, y, directionX, directionY, speed){
        this.context = context;
        this.monsterReady = false;
        this.monsterImage = new Image();
        this.x = x;
        this.y = y + 148;  //The soap can't appear on a edge of the canvas TODO: change 150 when no border
        this.width = null;
        this.height = null;
        this.speed = speed;
        this.directionX = directionX;
        this.directionY = directionY;

        this.monsterImage.addEventListener('load', (event) => {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }

            this.width = this.monsterImage.width;
            this.height = this.monsterImage.height;
            this.monsterReady = true; //The image has been load, we can draw it

            // Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        this.monsterImage.src = "/ressources/images/game/Level1/MonsterHand48x48.png";
    }

    draw(){   
        if(this.monsterReady){
            this.context.drawImage(this.monsterImage, this.x, this.y);
        }
    }

    update(secondsPassed){
        this.x += this.speed * this.directionX * secondsPassed;
        this.y += this.speed * this.directionY * secondsPassed;
 
        //Touching edges
        if (this.x < 0) { //Left side
           this.x = this.context.canvas.width - this.width;
        } else if (this.x > this.context.canvas.width - this.width) { //Right side
            this.x = 0;
        }

        if (this.y < 148) { //Top side TODO: change 150 when no border
            this.y = this.context.canvas.height - this.height;
        } else if (this.y > this.context.canvas.height - this.height) { //Bottom side
            this.y = 148; // TODO: change 150 when no border
        }
    }
}