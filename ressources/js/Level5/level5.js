/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Level5{
    static createLevel(thisGame){
        thisGame.level = 5;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById("bg").style.backgroundImage = thisGame.bgLevel5Url;

        //Create health Lives
        thisGame.health1 = new Life(thisGame.context, 350, 180);
        thisGame.health2 = new Life(thisGame.context, 650, 480);

        //Reset size of all Droppies
        thisGame.droppy.factorWidth = 1;
        thisGame.droppy.factorHeight = 1;

        //Place Droppy depending on his height
        thisGame.droppy.x = 0;
        switch(thisGame.droppy.size) {
            case 1:
                thisGame.droppy.y = 155;
                break;
            case 2:
                thisGame.droppy.y = 162;
                break;
            case 3:
                thisGame.droppy.y = 176;
                break;
            case 4:
                thisGame.droppy.y = 180;
                break;
        }

        //2 keys can be held
        thisGame.droppy.canPress2Keys = true;

        //Title
        thisGame.levelName = "Slurp the drop";

        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,

            thisGame.health1,
            thisGame.health2,

            //Monsters
            new Snail(thisGame.context, (Math.random() * 380)+600, 150, -1, 0, 20),
            new Snail(thisGame.context, (Math.random() * 380)+600, 280, -1, 0, 10),
            new Snail(thisGame.context, (Math.random() * 380)+600, 410, -1, 0, 15),
            new Snail(thisGame.context, Math.random() * 450, 215, 1, 0, 15),
            new Snail(thisGame.context, Math.random() * 450, 345, 1, 0, 10),
            new Snail(thisGame.context, Math.random() * 450, 475, 1, 0, 25),
            new Flower(thisGame.context, 50, (Math.random() * 300) + 200, 2),
            new Flower(thisGame.context, 220, (Math.random() * 300) + 200, 2),
            new Flower(thisGame.context, 390, (Math.random() * 300) + 200, 2),
            new Flower(thisGame.context, 560, (Math.random() * 300) + 200, 2),
            new Flower(thisGame.context, 730, (Math.random() * 300) + 200, 2),
            new Flower(thisGame.context, 900, (Math.random() * 300) + 200, 2)         
        ];
    }

    static detectCollisionsMonsters(thisGame){
        //MONSTERS COLLISIONS
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof Snail){
                let snail = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(snail.x+5, snail.y+15, snail.width-5, snail.height-15, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
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

            if(thisGame.gameObjects[i] instanceof Flower){
                let flower = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(flower.x+5, flower.y+5, flower.width-10, flower.height-10, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;
                    let flowerNb = i;
                    let flowerX = flower.x;
                    let flowerY = flower.y;
                    let flowerImg = Math.floor((Math.random() * 3) + 3);

                    thisGame.gameObjects.splice(flowerNb, 1, new Flower(thisGame.context, flowerX, flowerY, flowerImg));
                                        
                    if(thisGame.droppy.size<4){
                        thisGame.droppy.droppyLosesALife(0);
                    }
                    else{
                        thisGame.isGameOver = true;
                    }
                }
            }
        }
    }
}