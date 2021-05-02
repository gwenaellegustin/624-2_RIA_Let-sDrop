class MonsterHand {
    constructor (context, x, y, directionX, directionY, speed){
        this.context = context;
        this.monsterReady = false;
        this.monsterImage = new Image();
        this.x = x;
        this.y = y + 148;  //The soap can't appear on a edge of the canvas
        this.weight = null;
        this.height = null;
        this.speed = speed;
        this.directionX = directionX;
        this.directionY = directionY;

        this.isColliding = false;
    }

    draw(){
        this.monsterImage.addEventListener('load', (event) => {
            this.width = this.monsterImage.width - 16;
            this.height = this.monsterImage.height - 16;
            this.monsterReady = true; //The image has been load, we can draw it
        });

        this.monsterImage.src = "/ressources/images/game/Level1/MonsterHand64x64.png";

        this.context.fillStyle = this.isColliding ? '#ff8080': '#ADFF2F';
        this.context.fillRect(this.x+8, this.y+8, this.width, this.height);

        if(this.monsterReady){
            this.context.drawImage(this.monsterImage, this.x, this.y);
        }
    }

    update(secondsPassed){
        this.x += this.speed * this.directionX * secondsPassed;
        this.y += this.speed * this.directionY * secondsPassed;


        //Touching edges
        let canvasWidth = 1000;
        let canvasHeight = 550;

        if (this.x < 0) { //Left side
           this.x = canvasWidth - 64;
        } else if (this.x > canvasWidth - 64) { //Right side
            this.x = 0;
        }

        if (this.y < 148) { //Top side
            this.y = canvasHeight - 64;
        } else if (this.y > canvasHeight - 64) { //Bottom side
            this.y = 148;
        }
    }
}