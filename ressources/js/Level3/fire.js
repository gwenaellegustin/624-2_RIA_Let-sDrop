class Fire{
    constructor (context, x, y, thisGame, canMoveX, canMoveY) {
        this.context = context;
        this.fireReady = false;
        this.fireImage = new Image();
        this.x = x;
        this.y = y;
        this.directionY = 1;
        this.directionX = 1;
        this.angle = 0;
        this.speed = 40;
        this.width = null;
        this.height = null;
        this.droppy = thisGame.gameObjects[0];
        this.thisGame = thisGame;
        this.canMoveX = canMoveX;
        this.canMoveY = canMoveY;

        this.fireImage.addEventListener('load', (event) => {
            if (event.defaultPrevented) {
                return; //Do nothing if event already handled
            }

            this.width = this.fireImage.width;
            this.height = this.fireImage.height;
            this.fireReady = true; //The image has been load, we can draw it

            //Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        this.fireImage.src = "/ressources/images/game/Level3/Fire30x35.png";

        this.interval = 0; //Time between each little fire
    }

    draw(){
        //Reapear here after a restore
        this.context.save();

        //Move the origin to the fire center
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);
        
        //Just to see for impact TODO: delete at the end
        this.context.fillStyle = this.isColliding ? '#ff8080': '#ADFF2F';
        this.context.fillRect(-this.width/2 + 5, -this.height/2 + 3, this.width - 5, this.height - 6);
        
        if(this.fireReady){
            this.context.drawImage(this.fireImage, -this.width/2, -this.height/2); //If wanna rotate on middle right (middle bottom of fire), -this.width, -this.height/2
        }
        
        this.context.restore();
    }

    update(secondsPassed) {
        Level3.drawPipeOnCanvas();

        this.interval += secondsPassed;

        //Check when droppy is around a big fire to shoot little ones
        if(this.thisGame.collisionCircleRect(this.x, this.y, 550, this.droppy.x, this.droppy.y, this.droppy.width, this.droppy.height)){
            if(this.interval > 2.5){
                let littleFire = new LittleFire(this.context, this.x, this.y, this.droppy);
                this.thisGame.gameObjects.push(littleFire);
                this.interval = 0;
            }
        }

        //Construct angle
        let dx = this.x - this.droppy.x;
        let dy = this.y - this.droppy.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;

        if(this.canMoveX){
            let x;
            let y, y1, y2;
    
            //LEFT
            x = this.x - 17;
            y = this.y; //LEFT/RIGHT - TOP
            y1 = this.y + this.height / 2; //LEFT/RIGHT - MIDDLE
            y2 = this.y + this.height; //LEFT/RIGHT - BOTTOM
            if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x, y1) || Level3.isPixelBlack(x, y2)){
                this.directionX *= -1;
            }
    
            //RIGHT
            x = this.x + this.width - 10;
            if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x, y1) || Level3.isPixelBlack(x, y2)){
                this.directionX *= -1;
            }

            this.x += this.speed * this.directionX * secondsPassed;
        }
        else if(this.canMoveY){
            let x, x1, x2;
            let y;
            x = this.x; //TOP/BOTTOM - LEFT
            x1 = this.x + this.width / 2; //TOP/BOTTOM - MIDDLE
            x2 = this.x + this.width; //TOP/BOTTOM - RIGHT
            y = this.y - 20;
            if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x1, y) || Level3.isPixelBlack(x2, y)){ //I don't want y to be updated more than one time
                this.directionY *= -1;
            }
    
            //BOTTOM
            y = this.y + this.height; //SAME FOR ALL RIGHT
            if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x1, y) || Level3.isPixelBlack(x2, y)){
                this.directionY *= -1;
            }

            this.y += this.speed * this.directionY * secondsPassed;
        }
    }
}