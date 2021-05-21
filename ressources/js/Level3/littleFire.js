class LittleFire{
    constructor (context, x, y, droppy) {
        this.context = context;
        this.littleFireReady = false;
        this.littleFireImage = new Image();
        this.x = x;
        this.y = y;
        this.directionX = 1;
        this.directionY = 1;
        this.width = null;
        this.height = null;
        this.speed = 50;
        this.droppy = droppy;

        this.secondsAlive = 0;

        this.dx = (droppy.x - x);
        this.dy = (droppy.y - y);
        this.mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.velocityX = (this.dx / this.mag) * this.speed;
        this.velocityY = (this.dy / this.mag) * this.speed;

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
        
        /*

        this.context.fillStyle = '#ff8080';
        this.context.fillRect(this.x, this.y, 14, 18);
        */
    }

    update(secondsPassed) {
        Level3.drawPipeOnCanvas();

        this.collisionsWithBlackPixel(secondsPassed);

        this.x += this.velocityX * secondsPassed * this.directionX;
        this.y += this.velocityY * secondsPassed * this.directionY;
        
    }

    collisionsWithBlackPixel(secondsPassed){
        let x, x1, x2;
        let y, y1, y2;

        //VERSION 1///////////////////////////////////////////////////////////////////////////////////////////////

        //TOP
        ///* JUST UN.COMMENT THE FIRST 2 //
        x = this.x; //TOP/BOTTOM - LEFT
        x1 = this.x + this.width / 2; //TOP/BOTTOM - MIDDLE
        x2 = this.x + this.width; //TOP/BOTTOM - RIGHT
        y = this.y - 1;
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x1, y) || Level3.isPixelBlack(x2, y)){ //I don't want y to be updated more than one time
            this.directionY *= -1;
            this.velocityY *= 0.9;
        }

        //BOTTOM
        y = this.y + this.height + 1; //SAME FOR ALL RIGHT
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x1, y) || Level3.isPixelBlack(x2, y)){
            this.directionY *= -1;
        }
        

        //LEFT
        x = this.x - 1;
        y = this.y; //LEFT/RIGHT - TOP
        y1 = this.y + this.height / 2; //LEFT/RIGHT - MIDDLE
        y2 = this.y + this.height; //LEFT/RIGHT - BOTTOM
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x, y1) || Level3.isPixelBlack(x, y2)){
            this.directionX *= -1;
            this.velocityX *= 0.9;
        }

        //RIGHT
        x = this.x + this.width + 1;
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x, y1) || Level3.isPixelBlack(x, y2)){
            this.directionX *= -1;
            this.velocityX *= 0.9;
        }
    }
}