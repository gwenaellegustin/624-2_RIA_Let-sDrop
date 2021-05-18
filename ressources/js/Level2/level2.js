class Level2{
    static createLevel(thisGame){
        thisGame.level = 2;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level2/Level2.png')";

        //Create health Lives
        thisGame.health1 = new Life(thisGame.context, 330, 180);
        thisGame.health2 = new Life(thisGame.context, 670, 480);

        //Place Droppy
        thisGame.droppy.x = 0;
        thisGame.droppy.y = 500; // to match exit from Sink

        //Title
        thisGame.levelName = 'Freeze the drop';

        thisGame.gameObjects = [
            
            thisGame.droppy,  
            thisGame.timer,

            thisGame.health1,
            thisGame.health2,

            //Monsters
            //First pipe
            new SnowflakeBig(thisGame.context, 40, 50, 0, 1, 30),
            new SnowflakeBig(thisGame.context, 50, 250, 0, 1, 35),
            new SnowflakeSmall(thisGame.context, 75, 125, 0, 1, 45),
            new SnowflakeSmall(thisGame.context, 110, 75, 0, 1, 50),
            new SnowflakeBig(thisGame.context, 120, 50, 0, 1, 55),
            new SnowflakeBig(thisGame.context, 130, 200, 0, 1, 40),
            new SnowflakeSmall(thisGame.context, 145, 100, 0, 1, 35),
            new SnowflakeSmall(thisGame.context, 180, 75, 0, 1, 45),
            new SnowflakeBig(thisGame.context, 190, 50, 0, 1, 65),
            new SnowflakeBig(thisGame.context, 200, 225, 0, 1, 40),
            new SnowflakeSmall(thisGame.context, 215, 150, 0, 1, 35),
            new SnowflakeSmall(thisGame.context, 250, 75, 0, 1, 50),

            //Second pipe
            new SnowflakeSmall(thisGame.context, 380, 150, 0, 1, 30),
            new SnowflakeBig(thisGame.context, 390, 350, 0, 1, 35),
            new SnowflakeBig(thisGame.context, 415, 225, 0, 1, 45),
            new SnowflakeSmall(thisGame.context, 450, 175, 0, 1, 50),
            new SnowflakeSmall(thisGame.context, 460, 150, 0, 1, 55),
            new SnowflakeBig(thisGame.context, 470, 300, 0, 1, 40),
            new SnowflakeBig(thisGame.context, 485, 200, 0, 1, 35),
            new SnowflakeSmall(thisGame.context, 520, 175, 0, 1, 45),
            new SnowflakeSmall(thisGame.context, 530, 150, 0, 1, 65),
            new SnowflakeBig(thisGame.context, 540, 325, 0, 1, 40),
            new SnowflakeBig(thisGame.context, 555, 250, 0, 1, 35),
            new SnowflakeSmall(thisGame.context, 590, 175, 0, 1, 50),

            //Third pipe
            new SnowflakeBig(thisGame.context, 730, 100, 0, 1, 30),
            new SnowflakeSmall(thisGame.context, 740, 300, 0, 1, 35),
            new SnowflakeBig(thisGame.context, 765, 175, 0, 1, 45),
            new SnowflakeSmall(thisGame.context, 800, 125, 0, 1, 50),
            new SnowflakeBig(thisGame.context, 810, 100, 0, 1, 55),
            new SnowflakeSmall(thisGame.context, 820, 250, 0, 1, 40),
            new SnowflakeBig(thisGame.context, 835, 150, 0, 1, 35),
            new SnowflakeSmall(thisGame.context, 870, 125, 0, 1, 45),
            new SnowflakeBig(thisGame.context, 880, 100, 0, 1, 65),
            new SnowflakeSmall(thisGame.context, 890, 275, 0, 1, 40),
            new SnowflakeBig(thisGame.context, 905, 200, 0, 1, 35),
            new SnowflakeSmall(thisGame.context, 940, 125, 0, 1, 50)
        ];
    }

    static detectCollisionsMonsters(thisGame){
        //MONSTERS COLLISIONS
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof SnowflakeBig){
                let snowBig = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(snowBig.x, snowBig.y, snowBig.width, snowBig.height, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;
                    
                    if(thisGame.droppy.size<4){
                        thisGame.droppy.droppyLosesALife();
                    }
                    else{
                        thisGame.isGameOver = true;
                    }
                }
            }

            if(thisGame.gameObjects[i] instanceof SnowflakeSmall){
                let snowSmall = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(snowSmall.x, snowSmall.y, snowSmall.width, snowSmall.height, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;            
                    this.droppySlowsDown(thisGame);
                }
            }
        }
    }

    static droppySlowsDown(thisGame){
        thisGame.droppy.changeColorAndBlink(thisGame);
        thisGame.droppy.slowDownSpeed(thisGame);    
    }

    static retrieveLives(thisGame) {
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof Life) {
                let life = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(life.x, life.y, life.width, life.height, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;

                    if(thisGame.droppy.size>1){
                        thisGame.droppy.droppyRetrieveALife();
                        thisGame.gameObjects.splice(i,1);
                    }
                    else{
                        thisGame.gameObjects.splice(i,1);
                        thisGame.droppy.isColliding = false;
                    }
                }
            }
        }
    }
}