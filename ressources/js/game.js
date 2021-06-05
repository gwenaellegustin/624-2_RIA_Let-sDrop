/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
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
        this.ready = false;

        //Object
        this.droppy = null;

        //Lives
        this.health1 = null;
        this.health2 = null;

        //We charge everything before starting the game
        this.chargeMusic();
        this.chargeBackgrounds();
        this.chargeObjects();        
        
        this.init(canvasId);
    }

    init(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1000;
        this.canvas.height = 550;
        this.context = this.canvas.getContext("2d");
        
        //General text style of the game
        this.context.font = "30px Delius";
        this.context.fillStyle = "white";
    
        Level0.createLevel(this);

        //Press enter to reload the page
        window.addEventListener("keydown", event => { 
            if(event.code === "Space" && this.canReload){
                document.location.reload();
            }
         }, false);

        //Request an animation frame for the first time
        //The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    gameLoop(timeStamp) {
        //Calculate the number of seconds passed since the last frame
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        if(this.level === 3){
            Level3.drawPipeOnCanvas();
        }

        if(this.level === 4){ 
            Level4.drawRadiatorOnCanvas();
        }

        //Loop over all game objects to update
        for(let i=0; i <  this.gameObjects.length; i++){
            this.gameObjects[i].update(this.secondsPassed);
        }
        
        //Detect collisions with edges and monsters
        this.detectCollisionsEdges();
        this.detectCollisions();
        
        //Detecter end of level
        this.detectChangeLevel();
    
        //Clear canvas
        this.clearCanvas();
    
        //Loop over all game objects to draw
        for(let i=0; i < this.gameObjects.length; i++){
            this.gameObjects[i].draw();
        }

        //Draw level name
        if(this.levelName != null){
            this.setTitle();
        }

        //Handling if the game continues or ends
        if(this.isGameOver){
            GameOver.createLevel(this);
        }
        else if(this.isWin){
            Winner.createLevel(this);
        }
        else{
            //The loop function has reached its end - Keep requesting new frames
            window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
        }
    }

    detectCollisionsEdges(){
        //EDGES COLLISIONS : Checking collisions for droppy 
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

                if(this.droppy.y < 150){ //TOP EDGE
                    this.droppy.y = 150;
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
        //To change from level 0 to level 1
        if (this.level === 0 && this.ready === true){
            Level1.createLevel(this);
        }

        //Zone which define end of each level
        switch(this.level){
            case 1:
                let hit = this.collisionPointCircle(this.droppy.x + this.droppy.width/2, this.droppy.y + this.droppy.height/2, 954, 370, 25);
                if(hit){ //If Droppy enters the sink hole
                    Level2.createLevel(this);
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
                        this.droppy.color = "blue";
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
        //Temporary variables to set edges for testing
        let distX = px - cerclex;
        let distY = py - cercley;

        //Distance between the point and circle's center
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
      
        //If the distance is less than the radius, collision!
        if (distance <= radius) {
          return true;
        }
        return false;
      }

    collisionRectRect(rect1x, rect1y, rect1width, rect1height, rect2x, rect2y, rect2width, rect2height){
        //Are the sides of one rectangle touching the other?
        if (rect1x + rect1width >= rect2x &&    //r1 right edge past r2 left
            rect1x <= rect2x + rect2width &&    //r1 left edge past r2 right
            rect1y + rect1height >= rect2y &&    //r1 top edge past r2 bottom
            rect1y <= rect2y + rect2height) {    //r1 bottom edge past r2 top
            return true;
        }
        return false;
    }

    collisionCircleRect(circlex, circley, radius, rectx, recty, rectwidth, rectheight){
        //Temporary variables to set edges for testing
        let testX = circlex;
        let testY = circley;

        //Which edge is the closest?
        if (circlex < rectx) {//Left edge
            testX = rectx;
        }
        else if (circlex > rectx+rectwidth) {//Right edge
            testX = rectx+rectwidth;
        }   

        if (circley < recty) {//Top edge
            testY = recty;
        }
        else if (circley > recty+rectheight) {//Bottom edge
            testY = recty+rectheight;   
        }

        //Get distance from closest edges
        let distX = circlex-testX;
        let distY = circley-testY;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );

        //If the distance is less than the radius, collision!
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
                        this.droppy.droppyRetrievesALife(blinkingSize);
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
        //Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearImages(){
        let images = document.querySelectorAll("img");
        images.forEach(image => {
            image.remove();
        });
    }

    chargeMusic() {
        //Music and sounds
        this.level1Music = new Audio("/ressources/sounds/frightNight.mp3"); //Will continue through all levels
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
    }

    chargeBackgrounds() {
        //Backgrounds
        this.bgLevel0Img = new Image();
        this.bgLevel0Img.setAttribute("src", "/ressources/images/game/Level0/Level0.png");
        this.bgLevel0Url = "url('/ressources/images/game/Level0/Level0.png')";
        
        this.bgLevel1Img = new Image();
        this.bgLevel1Img.setAttribute("src", "/ressources/images/game/Level1/Level1.png");
        this.bglevel1url = "url('/ressources/images/game/Level1/Level1.png')";

        this.bgLevel2Img = new Image();
        this.bgLevel2Img.setAttribute("src", "/ressources/images/game/Level2/Level2.png");
        this.bgLevel2Url = "url('/ressources/images/game/Level2/Level2.png')";

        this.bgLevel3Img = new Image();
        this.bgLevel3Img.setAttribute("src", "/ressources/images/game/Level3/Level3.png");
        this.bgLevel3Url = "url('/ressources/images/game/Level3/Level3.png')";

        this.bgLevel3Canvas = new Image();
        this.bgLevel3Canvas.setAttribute("src", "/ressources/images/game/Level3/Level3_canvas.png");
        this.bgLevel3CanvasUrl = '/ressources/images/game/Level3/Level3_canvas.png';

        this.bgLevel4Img = new Image();
        this.bgLevel4Img.setAttribute("src", "/ressources/images/game/Level4/Level4.png");
        this.bgLevel4Url = "url('/ressources/images/game/Level4/Level4.png')";

        this.bgLevel4Canvas = new Image();
        this.bgLevel4Canvas.setAttribute("src", "/ressources/images/game/Level4/Level4_canvas.png");
        this.bgLevel4CanvasUrl = '/ressources/images/game/Level4/Level4_canvas.png';

        this.bgLevel5Img = new Image();
        this.bgLevel5Img.setAttribute("src", "/ressources/images/game/Level5/Level5.png");
        this.bgLevel5Url = "url('/ressources/images/game/Level5/Level5.png')";

        this.bgLevel6Img1 = new Image();
        this.bgLevel6Img1.setAttribute("src", "/ressources/images/game/Level6/Level6Fight.png");
        this.bgLevel6Url1 = "url('/ressources/images/game/Level6/Level6Fight.png')";
        
        this.bgLevel6Img2 = new Image();
        this.bgLevel6Img2.setAttribute("src", "/ressources/images/game/Level6/Level6.png");
        this.bgLevel6Url2 = "url('/ressources/images/game/Level6/Level6.png')";

        this.bgWinImg = new Image();
        this.bgWinImg.setAttribute("src", "/ressources/images/game/Win/Win.png");
        this.bgWinUrl = "url('/ressources/images/game/Win/Win.png')";

        this.bgGameOverImg = new Image();
        this.bgGameOverImg.setAttribute("src", "/ressources/images/game/GameOver/GameOver.png");
        this.bgGameOverUrl = "url('/ressources/images/game/GameOver/GameOver.png')";

        this.bgHallOfFameImg = new Image();
        this.bgHallOfFameImg.setAttribute("src", "/ressources/images/game/HallOfFame/hallOfFame.png");
        this.bgHallOfFameUrl = "url('/ressources/images/game/HallOfFame/hallOfFame.png')";
    }

    chargeObjects() {
        //Droppy
        let colors = ["green", "blue", "white", "red1", "red2", "red3"];
        let sizes = [1,2,3,4];
        
        colors.forEach(color => {
            sizes.forEach(size => {
                let image = new Image();
                image.src = "/ressources/images/game/Drop/DropSize" + size + color + ".png";
            })
        });

        //Monsters
        let monsterHandImg = new Image();
        monsterHandImg.setAttribute("src", "/ressources/images/game/Level1/MonsterHand48x48.png");
        let soapImg = new Image();
        soapImg.setAttribute("src", "/ressources/images/game/Level1/Soap34x34.png");
        let tapImg = new Image();
        tapImg.setAttribute("src", "/ressources/images/game/Level1/Tap.png");
        let snowflakeBigImg = new Image();
        snowflakeBigImg.setAttribute("src", "/ressources/images/game/Level2/Snowflake50x50.png");
        let snowflakeSmallImg = new Image();
        snowflakeSmallImg.setAttribute("src", "/ressources/images/game/Level2/Snowflake25x25.png");
        let fireImg = new Image();
        fireImg.setAttribute("src", "/ressources/images/game/Level3/Fire30x35.png");
        let littleFireImg = new Image();
        littleFireImg.setAttribute("src", "/ressources/images/game/Level3/LittleFire14x18.png");
        let steamImg = new Image();
        steamImg.setAttribute("src", "/ressources/images/game/Level3/Steam250x250.png");
        let daisyImg = new Image();
        daisyImg.setAttribute("src", "/ressources/images/game/Level5/Daisy.png");
        let leavesImg = new Image();
        leavesImg.setAttribute("src", "/ressources/images/game/Level5/Leaves.png");
        let orchidImg = new Image();
        orchidImg.setAttribute("src", "/ressources/images/game/Level5/Orchid.png");
        let tulipImg = new Image();
        tulipImg.setAttribute("src", "/ressources/images/game/Level5/Tulip.png");
        let snailRightImg = new Image();
        snailRightImg.setAttribute("src", "/ressources/images/game/Level5/SnailRight.png");
        let snailLeftImg = new Image();
        snailLeftImg.setAttribute("src", "/ressources/images/game/Level5/SnailLeft.png");
        let crabWallImg = new Image();
        crabWallImg.setAttribute("src", "/ressources/images/game/Level6/CrabsWall.png");
        let crabLifeImg = new Image();
        crabLifeImg.setAttribute("src", "/ressources/images/game/Level6/CrabLife.png");
        let palmImg = new Image();
        palmImg.setAttribute("src", "/ressources/images/game/Level6/Palm.png");
        let crabLeft110x130Img = new Image();
        crabLeft110x130Img.setAttribute("src", "/ressources/images/game/Level6/CrabLeft110x130.png");
        let crabRight110x130Img = new Image();
        crabRight110x130Img.setAttribute("src", "/ressources/images/game/Level6/CrabRight110x130.png");
        let crabLeftClosed110x130Img = new Image();
        crabLeftClosed110x130Img.setAttribute("src", "/ressources/images/game/Level6/CrabLeftClosed110x130.png");
        let crabRightClosed110x130Img = new Image();
        crabRightClosed110x130Img.setAttribute("src", "/ressources/images/game/Level6/CrabRightClosed110x130.png");
        let crabLeftDead110x130Img = new Image();
        crabLeftDead110x130Img.setAttribute("src", "/ressources/images/game/Level6/CrabLeftDead110x130.png");
        let crabRightDead110x130Img = new Image();
        crabRightDead110x130Img.setAttribute("src", "/ressources/images/game/Level6/CrabRightDead110x130.png");

        //Life & health
        let lifeImg = new Image();
        lifeImg.setAttribute("src", "/ressources/images/game/Life.png");
        let healthImg = new Image();
        healthImg.setAttribute("src", "/ressources/images/game/Health17x20.png");
    }
}