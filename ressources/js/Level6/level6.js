class Level6{
    static createLevel(thisGame){
        thisGame.level = 6;
        thisGame.canReload = false;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById('bg').style.backgroundImage = thisGame.bglevel6url;
                
        //Calcul placement according to ininital width of window
        let marginCanvas = document.getElementById("canvas").offsetLeft;
        let marginPalm = 0;
        if (marginCanvas <  250){
            marginPalm = marginCanvas;
        } else {
            marginPalm = 250;
        }

        //Crabs wall under plams
        let crabs = document.createElement('img');
        crabs.src = "/ressources/images/game/Level6/CrabsWall.png";
        crabs.style.position = 'absolute';
        crabs.style.top = 0;
        crabs.style.marginLeft = `${marginPalm+940}px`;
        crabs.id = 'crabs'
        document.getElementById('bg').appendChild(crabs);

        //Palms over hero and monsters 
        let palms = document.createElement('img');
        palms.src = "/ressources/images/game/Level6/Palm.png";
        palms.style.position = 'absolute';
        palms.style.top = 0;
        palms.style.marginLeft = `${marginPalm}px`;
        document.getElementById('bg').appendChild(palms);

        //Place Droppy
        thisGame.droppy.x = 0;
        thisGame.droppy.y = 500; // to match exit from Garden

        //Title
        thisGame.levelName = 'Pinch the drop';
        
        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,
            //Monster
            new Crab(thisGame.context, 800, 500, thisGame.droppy)
        ];
    }

    static detectCollisionsMonsters(thisGame){
        let crab = thisGame.gameObjects[2];

        let hit = thisGame.collisionRectRect(crab.x + 5, crab.y + 10, crab.width - 10, crab.height - 20, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
        if(hit && thisGame.droppy.isColliding === false){
            thisGame.droppy.isColliding = true;

            //Crab is colliding during 1000ms
            crab.isColliding = true;
            setTimeout(()=>{
                crab.isColliding = false;
            }, 1000);
            
            if(thisGame.droppy.size<4){
                thisGame.droppy.droppyLosesALife(0);
            }
            else{
                thisGame.isGameOver = true;
            }
        }
    }

    static detectDefence(thisGame){
        window.addEventListener("keyup", function(event) {
            if (event.defaultPrevented) {
              return; //Do nothing if event already handled
            }

            if(event.code === 'Space' && thisGame.droppy.interval > 0.5){
                let crab = thisGame.gameObjects[2];
                let defence;
                if (thisGame.droppy.x < crab.x){
                    defence = new Defence(thisGame.context, thisGame.droppy.x + thisGame.droppy.width, thisGame.droppy.y + thisGame.droppy.height/2, 1);
                } else {
                    defence = new Defence(thisGame.context, thisGame.droppy.x, thisGame.droppy.y + thisGame.droppy.height/2, -1);
                }
                
                thisGame.gameObjects.push(defence);
                let position = thisGame.gameObjects.length;
                setTimeout(()=>{
                    thisGame.gameObjects.splice(position,1);
                }, 5000)
                thisGame.droppy.interval = 0;
            }
            
           //Consume the event so it doesn't get handled twice
            event.preventDefault();
        }, true);
    }

    static detectCollisionsMonsters(thisGame){
        let crab = thisGame.gameObjects[2];

        //Crab and Droppy collisions
        let hit = thisGame.collisionRectRect(crab.x + 5, crab.y + 10, crab.width - 10, crab.height - 20, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
        if(hit && thisGame.droppy.isColliding === false && crab.life > 0){
            thisGame.droppy.isColliding = true;

            //Crab is colliding during 1000ms
            crab.isColliding = true;
            setTimeout(()=>{
                crab.isColliding = false;
            }, 1000);
            
            if(thisGame.droppy.size<4){
                thisGame.droppy.droppyLosesALife(0);
            }
            else{
                thisGame.isGameOver = true;
            }
        }

        //Crabs wall and Droppy collisions
        if (thisGame.droppy.x + thisGame.droppy.width > 940 && crab.life > 0 && thisGame.droppy.isColliding === false){
            thisGame.droppy.isColliding = true;
            if(thisGame.droppy.size<4){
                thisGame.droppy.droppyLosesALife(0);
            }
            else{
                thisGame.isGameOver = true;
            }
        }

        //DEFENCE COLLISIONS : Checking collisions between Crab and defence projectile
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof Defence) {
                let defence = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(defence.x - defence.width/2 +5, defence.y - defence.height/2 +10, defence.width-10, defence.height-20, crab.x, crab.y, crab.width, crab.height);
                if (hit && crab.isColliding === false){
                    crab.isColliding = true;
                    thisGame.gameObjects.splice(i,1);
                    crab.life = crab.life -1;
                    setTimeout(()=>{
                        crab.isColliding = false;
                    }, 1000);

                    //Remove crabs wall
                    if (crab.life == 0){ 
                        document.getElementById('crabs').remove();
                        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level6/Level6.png')";
                    }
                }
            }
        } 
    }
}