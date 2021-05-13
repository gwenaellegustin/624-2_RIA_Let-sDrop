class Crab {
    
    constructor (context, x, y, droppy){
        this.context = context;
        this.monsterReady = false;
        this.monsterImage = new Image();
        this.x = x;
        this.y = y;
        this.width = null;
        this.height = null;
        this.speed  = 300;
        this.directionX = 0;
        this.directionY = 0;
        this.isColliding = false;
        this.droppy = droppy;

        this.monsterImage.addEventListener('load', (event) => {
            this.width = this.monsterImage.width;
            this.height = this.monsterImage.height;
            this.monsterReady = true; //The image has been load, we can draw it
        });

        this.monsterImage.src = "/ressources/images/game/Level6/Crab110x130.png";
    }

    draw(){
        //Just to see for impact
        //this.context.fillStyle = this.isColliding ? '#ff8080': '#ADFF2F';
        //this.context.fillRect(this.x + 5, this.y + 10, this.width-10, this.height-20);

        if(this.monsterReady){
            this.context.drawImage(this.monsterImage, this.x, this.y);
        }
    }

    update(secondsPassed){
        this.x += this.speed/20 * (this.x - this.droppy.x) / -100 * secondsPassed;
        this.y += this.speed * (this.y - this.droppy.y) / -100 * secondsPassed;

        // Grab Droppy
        if (this.isColliding == true){
            this.monsterImage.src = "/ressources/images/game/Level6/CrabClosed110x130.png";
        } else {
            this.monsterImage.src = "/ressources/images/game/Level6/Crab110x130.png";
        }

        //Touching edges
        if (this.x < 0) { //Left side
            this.x = 0;
         } else if (this.x > this.context.canvas.width - this.width) { //Right side
            this.x = this.context.canvas.width - this.width;
         }
         if (this.y < 50) { 
            this.y = 50; 
         } else if (this.y > this.context.canvas.height - this.height) { //Bottom side
            this.y = this.context.canvas.height - this.height;
         }


    }
}