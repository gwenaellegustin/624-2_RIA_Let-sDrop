class Level3 {
    static createLevel(thisGame){
        thisGame.level = 3;
        this.thisGame = thisGame;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level3/Level3.png')";

        //Place Droppy
        thisGame.droppy.x = 3;
        thisGame.droppy.y = 100;

        //Title
        thisGame.levelName = 'Burn the drop';

        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,

            //Monster
            new Fire(thisGame.context, 140, 90, thisGame),
            new LittleFire(thisGame.context, 129, 87, thisGame.droppy),
            new Fire(thisGame.context, 105, 358, thisGame),
            new Fire(thisGame.context, 465, 204, thisGame),
            new Fire(thisGame.context, 540, 450, thisGame),
            new Fire(thisGame.context, 650, 70, thisGame),
            new Fire(thisGame.context, 750, 284, thisGame),
            new Fire(thisGame.context, 833, 487, thisGame)
        ]

        this.pipeImage = new Image();
        this.pipeImage.src = '/ressources/images/game/Level3/Level3_canvas.png';

        this.pipeImage.addEventListener('load', (event) => {
            this.pipeImageReady = true; //The image has been load, we can draw it
        });

        thisGame.canvas.addEventListener('mousedown', (event) => { //click on mouse
            console.log(event.x-thisGame.canvas.offsetLeft + ' ' + event.y)
        })
    }

    static detectCollisionsMonsters(thisGame){
    }

    static detectCollisionsEdge(thisGame){
        this.drawPipeOnCanvas();

        this.collisionsWithBlackPixel(thisGame.droppy);

        //LITTLE FIRE STOCKS IN A EDGE SHOULD BE REMOVE
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof LittleFire){
                let littleFire = thisGame.gameObjects[i];

                littleFire.secondsAlive += thisGame.secondsPassed;

                if(littleFire.secondsAlive > 6){
                    let littleFireNb = i;

                    thisGame.gameObjects.splice(littleFireNb,1);
                }
            }
        }
    }

    static drawPipeOnCanvas(){
        if(this.pipeImageReady){
            this.thisGame.context.drawImage(this.pipeImage, 0, 0);
        }
    }

    static collisionsWithBlackPixel(object){
        let x, x1, x2;
        let y, y1, y2;

        //VERSION 1///////////////////////////////////////////////////////////////////////////////////////////////

        //TOP
        ///* JUST UN.COMMENT THE FIRST 2 //
        x = object.x; //TOP/BOTTOM - LEFT
        x1 = object.x + object.width / 2; //TOP/BOTTOM - MIDDLE
        x2 = object.x + object.width; //TOP/BOTTOM - RIGHT
        y = object.y - 1;
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x1, y) || this.isPixelBlack(x2, y)){ //I don't want y to be updated more than one time
            console.log("TOP")
            object.y += object.speed * this.thisGame.secondsPassed;
        }

        //BOTTOM
        y = object.y + object.height + 1; //SAME FOR ALL RIGHT
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x1, y) || this.isPixelBlack(x2, y)){
            console.log("BOTTOM")
            object.y -= object.speed * this.thisGame.secondsPassed;
        }
        //*/

        //VERSION 2///////////////////////////////////////////////////////////////////////////////////////////////
        

        //TOP
        /* JUST UN.COMMENT THE FIRST 2 //
        x1 = object.x + object.width / 2; //TOP/BOTTOM - MIDDLE
        y = object.y - 1;
        if(this.isPixelBlack(x1, y, 1,)){ //I don't want y to be updated more than one time
            console.log("TOP")
            object.y += object.speed * this.thisGame.secondsPassed;
        }

        //BOTTOM
        y = object.y + object.height + 1; //SAME FOR ALL RIGHT
        if(this.isPixelBlack(x1, y, 1, 1)){
            console.log("BOTTOM")
            object.y -= object.speed * this.thisGame.secondsPassed;
        }
        //*/
        

        //LEFT
        x = object.x - 1;
        y = object.y; //LEFT/RIGHT - TOP
        y1 = object.y + object.height / 2; //LEFT/RIGHT - MIDDLE
        y2 = object.y + object.height; //LEFT/RIGHT - BOTTOM
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x, y1) || this.isPixelBlack(x, y2)){
            console.log("LEFT")
            object.x += object.speed * this.thisGame.secondsPassed;
        }

        //RIGHT
        x = object.x + object.width + 1;
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x, y1) || this.isPixelBlack(x, y2)){
            console.log("RIGHT")
            object.x -= object.speed * this.thisGame.secondsPassed;
        }
    }

    static isPixelBlack(x, y){
        let pixelData = this.thisGame.context.getImageData(x, y, 1, 1).data;
        return pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0;
    }
}