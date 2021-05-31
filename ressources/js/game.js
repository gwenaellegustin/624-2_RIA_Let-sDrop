class Game {
    constructor(canvasId){
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.secondsPassed;
        this.gameObjects = [];
        this.level = null;
        this.isGameOver = false;
        this.isWin = false;
        this.levelName = null;
        this.timer = null;
        this.canReload = true;
        this.ready = false ;

        // Object
        this.droppy = null;

        // Lives
        this.health1 = null;
        this.health2 = null;

        // Music and sounds
        this.level1Music = new Audio("/ressources/sounds/frightNight.mp3"); // will continue through all levels
        this.level1Music.loop = true; 
        this.level1Music.setAttribute("preload", "auto");
        this.winnerMusic = new Audio("/ressources/sounds/Happy_Home.mp3");
        this.winnerMusic.setAttribute("preload", "auto");
        this.winnerSound = new Audio("/ressources/sounds/woodenShipOnTheSea.mp3");
        this.winnerSound.setAttribute("preload", "auto");
        this.gameOverMusic = new Audio("/ressources/sounds/twilightRain.mp3");
        this.gameOverMusic.setAttribute("preload", "auto");
        this.gameOverSound = new Audio("/ressources/sounds/glassBreakExplosion.mp3");
        this.gameOverSound.setAttribute("preload", "auto");
        this.endSound = new Audio("/ressources/sounds/ocean.mp3");
        this.endSound.loop = true;
        this.endSound.setAttribute("preload", "auto");

        // Backgrounds
        this.bglevel0img = new Image();
        this.bglevel0img.setAttribute("src", "/ressources/images/game/Level0/Level0.png");
        this.bglevel0url = "url('/ressources/images/game/Level0/Level0.png')";
        
        this.bglevel1img = new Image();
        this.bglevel1img.setAttribute("src", "/ressources/images/game/Level1/Level1.png");
        this.bglevel1url = "url('/ressources/images/game/Level1/Level1.png')";

        this.bglevel2img = new Image();
        this.bglevel2img.setAttribute("src", "/ressources/images/game/Level2/Level2.png");
        this.bglevel2url = "url('/ressources/images/game/Level2/Level2.png')";

        this.bglevel3img = new Image();
        this.bglevel3img.setAttribute("src", "/ressources/images/game/Level3/Level3.png");
        this.bglevel3url = "url('/ressources/images/game/Level3/Level3.png')";

        this.bglevel5img = new Image();
        this.bglevel5img.setAttribute("src", "/ressources/images/game/Level5/Level5.png");
        this.bglevel5url = "url('/ressources/images/game/Level5/Level5.png')";

        this.bglevel6img = new Image();
        this.bglevel6img.setAttribute("src", "/ressources/images/game/Level6/Level6Fight.png");
        this.bglevel6url = "url('/ressources/images/game/Level6/Level6.png')";

        this.bgwinimg = new Image();
        this.bgwinimg.setAttribute("src", "/ressources/images/game/Win/Win.png");
        this.bgwinurl = "url('/ressources/images/game/Win/Win.png')";

        this.bggameOverimg = new Image();
        this.bggameOverimg.setAttribute("src", "/ressources/images/game/GameOver/GameOver.png");
        this.bggameOverurl = "url('/ressources/images/game/GameOver/GameOver.png')";

        this.hallOfFameimg = new Image();
        this.hallOfFameimg.setAttribute("src", "/ressources/images/game/HallOfFame/hallOfFame.png");
        this.hallOfFameurl = "url('/ressources/images/game/HallOfFame/hallOfFame.png')";
        
        this.init(canvasId);
    }

    init(canvasId){

        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1000;
        this.canvas.height = 550;
        this.context = this.canvas.getContext('2d');
        
        //General text style of the game
        this.context.font = "30px Delius";
        this.context.fillStyle = "white";
    
        Level0.createLevel(this);

        // press enter to reload the page
        window.addEventListener('keydown', event => { 
            if(event.code === 'Space' && this.canReload){
                document.location.reload();
            }
         }, false);

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    gameLoop(timeStamp) {
        // Calculate the number of seconds passed since the last frame
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        if(this.level === 4){
            Level4.drawRadiatorOnCanvas();
        }

        // Loop over all game objects to update
        for(let i=0; i <  this.gameObjects.length; i++){
            this.gameObjects[i].update(this.secondsPassed);
        }
        
        // Detect collisions with edges and monsters
        this.detectCollisionsEdges();
        this.detectCollisions();
        
        // Detecter end of level
        this.detectChangeLevel();
    
        // Clear canvas
        this.clearCanvas();
    
        // Loop over all game objects to draw
        for(let i=0; i < this.gameObjects.length; i++){
            this.gameObjects[i].draw();
        }

        //Draw level name
        if(this.levelName != null){
            this.setTitle();
        }
        
        if(this.isGameOver){
            GameOver.createLevel(this);
        }
        else if(this.isWin){
            Winner.createLevel(this);
        }
        else{
            // The loop function has reached it's end - Keep requesting new frames
            window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
        }
    }

    detectCollisionsEdges(){
        // EDGES COLLISIONS : Checking collisions for droppy 
        switch(this.level){
            case 1:
            case 2:
            case 5:
                // EDGES COLLISIONS : Checking collisions for droppy 
                if (this.droppy.x < 0) { //LEFT EDGE
                    this.droppy.x = 0;
                } else if (this.droppy.x > this.canvas.width - this.droppy.width) { //RIGHT EDGE
                    this.droppy.x = this.canvas.width - this.droppy.width;
                }

                if(this.droppy.y < 148){ //TOP EDGE TODO: change 150 when no border
                    this.droppy.y = 148; // TODO: change 150 when no border
                } else if(this.droppy.y > this.canvas.height - this.droppy.height){ //BOTTOM EDGE
                    this.droppy.y = this.canvas.height - this.droppy.height;
                }
                break;
            case 3:
                Level3.detectCollisionsEdge(this);
                break;
            case 4:
                Level4.detectCollisionsEdge(this);
                break;
            case 6:
                if (this.droppy.x < 0) { //LEFT EDGE
                    this.droppy.x = 0;
                } else if (this.droppy.x > this.canvas.width - this.droppy.width) { //RIGHT EDGE
                    this.droppy.x = this.canvas.width - this.droppy.width;
                }

                if(this.droppy.y < 50){ //TOP EDGE
                    this.droppy.y = 50;
                } else if(this.droppy.y > this.canvas.height - this.droppy.height){ //BOTTOM EDGE
                    this.droppy.y = this.canvas.height - this.droppy.height;
                }
                break;
        }
    }

    detectCollisions(){       
        switch(this.level){
            case 1:
                Level1.detectCollisionsMonsters(this);
                break;
            case 2:
                Level2.detectCollisionsMonsters(this);
                this.retrieveLives(0);
                break;
            case 3: 
                Level3.detectCollisionsMonsters(this);
                break;
            case 4:
                Level4.detectCollisionsMonsters(this);
                this.retrieveLives(this.droppy.size-1);
                break;
            case 5:
                Level5.detectCollisionsMonsters(this);
                this.retrieveLives(0);
                break;
            case 6: 
                Level6.detectCollisionsMonsters(this);
                Level6.detectDefence(this);
                break;
            }
    }

    detectChangeLevel(){
        // To change from level 0 to level 1
        if (this.level === 0 && this.ready === true){
            Level1.createLevel(this);
        }

        // Zone which define end of the level
        switch(this.level){
            case 1:
                let exit = this.gameObjects[2];
                let hit = this.collisionPointCircle(this.droppy.x + this.droppy.width/2, this.droppy.y + this.droppy.height/2, 954, 370, 25);
                if(this.timer.time != null && hit === true){ //if Droppy's center is on pipe's enter
                    Level4.createLevel(this);
                }
                break;
            case 2:
                if(1000 == (this.droppy.x + this.droppy.width)){
                    Level3.createLevel(this);
                }
                break;
            case 3: 
                if(993 < (this.droppy.x + this.droppy.width)){
                    Level4.createLevel(this);
                }
                break;
            case 4:
                if(915 < (this.droppy.x + this.droppy.width)){
                    if((370 < (this.droppy.y + this.droppy.height/2) && (this.droppy.y + this.droppy.height/2) < 426)){
                        this.droppy.color = 'blue';
                        Level5.createLevel(this); //Prevent to leave bottom right et top right 
                    }
                }
                break;
            case 5:
                if(1000 == (this.droppy.x + this.droppy.width)){
                    if(490 < (this.droppy.y + this.droppy.height/2) && (this.droppy.y + this.droppy.height/2) < 550){
                        Level6.createLevel(this);
                    }
                }
                break;
            case 6: 
                if(1000 == (this.droppy.x + this.droppy.width) && this.droppy.isColliding==false){ 
                    this.isWin = true;
                }
                break;
            }
    }

    setTitle(){
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillStyle = "white";
        this.context.fillText(this.levelName, this.canvas.width/2, 10);
    }

    collisionPointCircle(px, py, cerclex, cercley, radius) {
        // temporary variables to set edges for testing
        let distX = px - cerclex;
        let distY = py - cercley;
        // distance between the point and circle's center
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
      
        // if the distance is less than the radius, collision!
        if (distance <= radius) {
          return true;
        }
        return false;
      }

    collisionRectRect(rect1x, rect1y, rect1width, rect1height, rect2x, rect2y, rect2width, rect2height){
        // are the sides of one rectangle touching the other?
        if (rect1x + rect1width >= rect2x &&    // r1 right edge past r2 left
            rect1x <= rect2x + rect2width &&    // r1 left edge past r2 right
            rect1y + rect1height >= rect2y &&    // r1 top edge past r2 bottom
            rect1y <= rect2y + rect2height) {    // r1 bottom edge past r2 top
            return true;
        }
        return false;
    }

    collisionCircleRect(circlex, circley, radius, rectx, recty, rectwidth, rectheight){
        // temporary variables to set edges for testing
        let testX = circlex;
        let testY = circley;

        // which edge is closest?
        if (circlex < rectx) {// test left edge
            testX = rectx;
        }
        else if (circlex > rectx+rectwidth) {// right edge
            testX = rectx+rectwidth;
        }   

        if (circley < recty) {// top edge
            testY = recty;
        }
        else if (circley > recty+rectheight) {// bottom edge
            testY = recty+rectheight;   
        }

        // get distance from closest edges
        let distX = circlex-testX;
        let distY = circley-testY;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );

        // if the distance is less than the radius, collision!
        if (distance <= radius) {
            return true;
        }
        return false;
    }

    retrieveLives(blinkingSize) {
        for (let i = 0; i < this.gameObjects.length; i++)
        {
            if(this.gameObjects[i] instanceof Life) {
                let life = this.gameObjects[i];

                let hit = this.collisionRectRect(life.x, life.y, life.width, life.height, this.droppy.x, this.droppy.y, this.droppy.width*this.droppy.factorWidth, this.droppy.height*this.droppy.factorHeight);
                
                if(hit){
                    this.droppy.isColliding = true;

                    if(this.droppy.size>1){
                        this.droppy.droppyRetrieveALife(blinkingSize);
                        this.gameObjects.splice(i,1);
                    }
                    else{
                        this.gameObjects.splice(i,1);
                        this.droppy.isColliding = false;
                    }
                }
            }
        }
    }

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearImages(){
        let images = document.querySelectorAll('img');
        images.forEach(image => {
            image.remove();
        });
    }
}