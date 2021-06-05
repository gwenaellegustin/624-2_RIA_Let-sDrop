/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
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
        this.speed = 60;
        this.angle = 0;

        this.touchedEdges = 0;

        this.dx = (droppy.x - x);
        this.dy = (droppy.y - y);
        this.mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.velocityX = (this.dx / this.mag) * this.speed;
        this.velocityY = (this.dy / this.mag) * this.speed;

        this.littleFireImage.addEventListener("load", (event) => {
            if (event.defaultPrevented) {
                return; //Do nothing if event already handled
            }

            this.width = this.littleFireImage.width;
            this.height = this.littleFireImage.height;
            this.littleFireReady = true; //The image has been loaded, we can draw it

            //Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        this.littleFireImage.src = "/ressources/images/game/Level3/LittleFire14x18.png";
    }

    draw(){
        //Reappear here after a restore
        this.context.save();

        //Move the origin to the fire center
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);

        if(this.littleFireReady){
            this.context.drawImage(this.littleFireImage, -this.width/2, -this.height/2); //Fire rotate from middle right (bottom of the yellow part)
        }

        this.context.restore();
    }

    update(secondsPassed) {
        this.collisionsWithBlackPixel();

        this.x += this.velocityX * secondsPassed * this.directionX;
        this.y += this.velocityY * secondsPassed * this.directionY;

        this.angle = Math.atan2(this.velocityY * this.directionY, this.velocityX * this.directionX);  
    }

    collisionsWithBlackPixel(){
        let x, x1, x2;
        let y, y1, y2;

        let touched = false;

        //VERSION 1///////////////////////////////////////////////////////////////////////////////////////////////

        //TOP
        ///* JUST UN.COMMENT THE FIRST 2 //
        x = this.x; //TOP/BOTTOM - LEFT
        x1 = this.x + this.width / 2; //TOP/BOTTOM - MIDDLE
        x2 = this.x + this.width; //TOP/BOTTOM - RIGHT
        y = this.y - 5;
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x1, y) || Level3.isPixelBlack(x2, y)){ //I don't want y to be updated more than once
            this.directionY *= -1;
            this.velocityY *= 0.9;
            touched = true;
        }

        //BOTTOM
        y = this.y + this.height + 1; //SAME FOR ALL RIGHT
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x1, y) || Level3.isPixelBlack(x2, y)){
            this.directionY *= -1;
            this.velocityY *= 0.9;
            touched = true;
        }

        //LEFT
        x = this.x - 5;
        y = this.y; //LEFT/RIGHT - TOP
        y1 = this.y + this.height / 2; //LEFT/RIGHT - MIDDLE
        y2 = this.y + this.height; //LEFT/RIGHT - BOTTOM
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x, y1) || Level3.isPixelBlack(x, y2)){
            this.directionX *= -1;
            this.velocityX *= 0.9;
            touched = true;
        }

        //RIGHT
        x = this.x + this.width + 1;
        if(Level3.isPixelBlack(x, y) || Level3.isPixelBlack(x, y1) || Level3.isPixelBlack(x, y2)){
            this.directionX *= -1;
            this.velocityX *= 0.9;
            touched = true;
        }

        if(touched){
            this.touchedEdges ++; //If a black pixel is touched, adding it to remove little fire after number of touches
        }
    }
}