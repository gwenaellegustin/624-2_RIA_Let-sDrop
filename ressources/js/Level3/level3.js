/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Level3 {
    static createLevel(thisGame){
        thisGame.level = 3;
        this.thisGame = thisGame;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById("bg").style.backgroundImage = thisGame.bgLevel3Url;

        //Place Droppy
        thisGame.droppy.x = 3;
        thisGame.droppy.y = 100;

        //Title
        thisGame.levelName = "Burn the drop";

        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,

            //Monsters
            new Fire(thisGame.context, 140, 90, thisGame, false, false),
            new LittleFire(thisGame.context, 140, 90, thisGame.droppy),
            new Fire(thisGame.context, 105, 358, thisGame, false, false),
            new LittleFire(thisGame.context, 105, 358, thisGame.droppy),
            new Fire(thisGame.context, 350, 390, thisGame, false, true),
            new LittleFire(thisGame.context, 350, 390, thisGame.droppy),
            new Fire(thisGame.context, 465, 204, thisGame, false, false),
            new LittleFire(thisGame.context, 465, 204, thisGame.droppy),
            new Fire(thisGame.context, 540, 450, thisGame, false, false),
            new LittleFire(thisGame.context, 540, 450, thisGame.droppy),
            new Fire(thisGame.context, 650, 75, thisGame, false, true),
            new LittleFire(thisGame.context, 650, 75, thisGame.droppy),
            new Fire(thisGame.context, 750, 284, thisGame, true, false),
            new LittleFire(thisGame.context, 750, 284, thisGame.droppy),
            new Fire(thisGame.context, 833, 487, thisGame, false, false),
            new LittleFire(thisGame.context, 833, 487, thisGame.droppy)
        ]

        this.pipeImageReady = false;
        this.pipeImage = new Image();
        this.pipeImage.src = thisGame.bgLevel3CanvasUrl;

        this.pipeImage.addEventListener("load", (event) => {
            if (event.defaultPrevented) {
                return; //Do nothing if event already handled
            }

            this.pipeImageReady = true; //The image has been loaded, we can draw it

            //Consume the event so it doesn't get handled twice
            event.preventDefault();
        });
    }

    static detectCollisionsMonsters(thisGame){
        //LITTLE FIRE COLLISIONS : Checking collisions between Droppy and Little Fire
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof LittleFire){
                let littleFire = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(littleFire.x - littleFire.width/2, littleFire.y - littleFire.height/2, littleFire.width, littleFire.height, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);

                if(hit){
                    //Remove little fire
                    thisGame.gameObjects.splice(i,1);

                    //Add a steam that will be removed after 3 seconds
                    new Steam(thisGame.context, thisGame.droppy.x, thisGame.droppy.y);
                }
            }

            //Droppy touches a fire -> loses a life
            if(thisGame.gameObjects[i] instanceof Fire){
                let fire = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(fire.x - fire.width/2, fire.y - fire.height/2, fire.width, fire.height, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;

                    if(thisGame.droppy.size<4){
                        thisGame.droppy.droppyLosesALife(thisGame.droppy.size+1);
                    }
                    else{
                        thisGame.isGameOver = true;
                    }
                }
            }
        }
    }

    static detectCollisionsEdge(thisGame){
        this.collisionsDroppyWithBlackPixel(thisGame.droppy);

        //LITTLE FIRE REMOVED AFTER MORE THAN 3 EDGES TOUCHED
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof LittleFire){
                let littleFire = thisGame.gameObjects[i];

                if(littleFire.touchedEdges > 3){
                    thisGame.gameObjects.splice(i,1);
                }
            }
        }

        //HANDLE DROPPY LEAVING FROM LEFT SIDE
        if (thisGame.droppy.x < 0) {
            thisGame.droppy.x = 0;
        }

        //HANDLE DROPPY LEAVING FROM LEFT SIDE / BOTTOM
        if(thisGame.droppy.x < 3.2 && thisGame.droppy.y + thisGame.droppy.height > 225){
            thisGame.droppy.x = 3.2;
            thisGame.droppy.y = 225 - thisGame.droppy.height;
        }

        //HANDLE DROPPY LEAVING FROM LEFT SIDE / TOP
        if(thisGame.droppy.x < 3.2 && thisGame.droppy.y < 50){
            thisGame.droppy.x = 3.2;
            thisGame.droppy.y = 50;
        }
    }

    static drawPipeOnCanvas(){
        if(this.pipeImageReady){
            this.thisGame.context.drawImage(this.pipeImage, 0, 0);
        }
    }

    static collisionsDroppyWithBlackPixel(droppy){
        let x, x1, x2;
        let y, y1, y2;

        //TOP
        x = droppy.x; //TOP/BOTTOM - LEFT
        x1 = droppy.x + droppy.width / 2; //TOP/BOTTOM - MIDDLE
        x2 = droppy.x + droppy.width; //TOP/BOTTOM - RIGHT
        y = droppy.y - 1;
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x1, y) || this.isPixelBlack(x2, y)){ // I don't want y to be updated more than once
            droppy.y += droppy.speed * this.thisGame.secondsPassed;
        }

        //BOTTOM
        y = droppy.y + droppy.height + 1; //SAME FOR ALL RIGHT
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x1, y) || this.isPixelBlack(x2, y)){
            droppy.y -= droppy.speed * this.thisGame.secondsPassed;
        }

        //LEFT
        x = droppy.x - 1;
        y = droppy.y; //LEFT/RIGHT - TOP
        y1 = droppy.y + droppy.height / 2; //LEFT/RIGHT - MIDDLE
        y2 = droppy.y + droppy.height; //LEFT/RIGHT - BOTTOM
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x, y1) || this.isPixelBlack(x, y2)){
            droppy.x += droppy.speed * this.thisGame.secondsPassed;
        }

        //RIGHT
        x = droppy.x + droppy.width + 1;
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x, y1) || this.isPixelBlack(x, y2)){
            droppy.x -= droppy.speed * this.thisGame.secondsPassed;
        }
    }

    static isPixelBlack(x, y){
        let pixelData = this.thisGame.context.getImageData(x, y, 1, 1).data;
        return pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0;
    }
}