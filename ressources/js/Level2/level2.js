/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Level2{
    static createLevel(thisGame){
        thisGame.level = 2;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById("bg").style.backgroundImage = thisGame.bgLevel2Url;

        //Create health Lives
        thisGame.health1 = new Life(thisGame.context, 330, 180);
        thisGame.health2 = new Life(thisGame.context, 670, 480);

        //Place Droppy
        thisGame.droppy.x = 0;
        thisGame.droppy.y = 500; //to start at the bottom of the pipe

        //Title
        thisGame.levelName = "Freeze the drop";

        thisGame.gameObjects = [
            
            thisGame.droppy,  
            thisGame.timer,

            thisGame.health1,
            thisGame.health2,

            //Monsters
            //First pipe
            new SnowflakeBig(thisGame.context, 50, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeBig(thisGame.context, 60, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 85, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeSmall(thisGame.context, 120, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 130, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeBig(thisGame.context, 140, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 155, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeSmall(thisGame.context, 190, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 200, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeBig(thisGame.context, 210, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 225, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeSmall(thisGame.context, 260, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),

            //Second pipe
            new SnowflakeSmall(thisGame.context, 380, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 390, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeBig(thisGame.context, 415, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 450, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeSmall(thisGame.context, 460, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 470, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeBig(thisGame.context, 485, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 520, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeSmall(thisGame.context, 530, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 540, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeBig(thisGame.context, 555, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 590, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),

            //Third pipe
            new SnowflakeBig(thisGame.context, 720, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 740, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 765, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 800, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 810, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 820, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 835, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 870, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 880, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 890, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45),
            new SnowflakeBig(thisGame.context, 905, Math.random() * 400 + 50, 0, 1, Math.random() * 35 + 30),
            new SnowflakeSmall(thisGame.context, 940, Math.random() * 400 + 50, 0, 1, Math.random() * 25 + 45)
        ];
    }

    static detectCollisionsMonsters(thisGame){
        //MONSTERS COLLISIONS
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof SnowflakeBig){
                let snowBig = thisGame.gameObjects[i];

                let hit = thisGame.collisionCircleRect(snowBig.x + snowBig.width/2, snowBig.y + snowBig.height/2, snowBig.width/2, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;
                    
                    if(thisGame.droppy.size<4){
                        thisGame.droppy.droppyLosesALife(0);
                    }
                    else{
                        thisGame.isGameOver = true;
                    }
                }
            }

            if(thisGame.gameObjects[i] instanceof SnowflakeSmall){
                let snowSmall = thisGame.gameObjects[i];

                let hit = thisGame.collisionCircleRect(snowSmall.x + snowSmall.width/2, snowSmall.y + snowSmall.width/2, snowSmall.width/2, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;            
                    this.droppySlowsDown(thisGame);
                }
            }
        }
    }

    static droppySlowsDown(thisGame){
        thisGame.droppy.changeColorAndBlink(thisGame);
        thisGame.droppy.slowDownSpeed();    
    }
}