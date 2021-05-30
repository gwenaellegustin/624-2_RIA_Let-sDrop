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
        this.imgReady = false;

        // Object
        this.droppy = null;

        // Lives
        this.health1 = null;
        this.health2 = null;

        this.chargeMusic();
        this.chargeBackgrounds();
        this.chargeObjects();        
        
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

        // Loop over all game objects to update
        for(let i=0; i <  this.gameObjects.length; i++){
            if(this.gameObjects[i] != null){
                this.gameObjects[i].update(this.secondsPassed);
            } 
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
            if(this.gameObjects[i] != null){
                this.gameObjects[i].draw();
            } 
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
                //TODO:
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
                Level2.retrieveLives(this);
                break;
            case 3: 
                Level3.detectCollisionsMonsters(this);
                break;
            case 4:
                //TODO:
                break;
            case 5:
                Level5.detectCollisionsMonsters(this);
                Level5.retrieveLives(this);
                break;
            case 6: 
                Level6.detectCollisionsMonsters(this);
                Level6.detectDefence(this);
                break;
            }
    }

    detectChangeLevel(){
        // To change from level 0 to level 1
        if (this.level === 0 && this.ready === true){ //TODO: Change when drag and drop (do we need this.ready?)
            Level1.createLevel(this);
        }

        // Zone which define end of the level
        switch(this.level){
            case 1:
                if(940 < (this.droppy.x + this.droppy.width/2) && (this.droppy.x + this.droppy.width/2) < 970){
                    if(350 < (this.droppy.y + this.droppy.height/2) && (this.droppy.y + this.droppy.height/2) < 380){
                        Level2.createLevel(this);
                    }
                }
                break;
            case 2:
                if(1000 == (this.droppy.x + this.droppy.width)){
                    Level3.createLevel(this);
                }
                break;
            case 3: 
                if(993 < (this.droppy.x + this.droppy.width)){
                    Level5.createLevel(this); //TODO:
                }
                break;
            case 4:
                //TODO:
                //Level5.createLevel(this);
                break;
            case 5:
                if(1000 == (this.droppy.x + this.droppy.width)){
                    if(490 < (this.droppy.y + this.droppy.height/2) && (this.droppy.y + this.droppy.height/2) < 550){
                        Level6.createLevel(this); //TODO:
                    }
                }
                break;
            case 6: 
                if(1000 == (this.droppy.x + this.droppy.width)){ 
                    this.isWin = true;
                }
                break;
            }
    }

    setTitle(){
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillText(this.levelName, this.canvas.width/2, 10);
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

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearImages(){
        let images = document.querySelectorAll("img");
        images.forEach(image => {
            image.remove();
        });
    }

    chargeMusic() {
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
    }

    chargeBackgrounds() {
        // Backgrounds
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
        // Droppy
        let colors = ['green', 'blue', 'white'];
        let sizes = [0,1,2,3,4];
        let count = 0;
        
        colors.forEach(color => {
            sizes.forEach(size => {
                let image = new Image();
                image.src = "/ressources/images/game/Drop/DropSize" + size + color + ".png";
                image.addEventListener('load', () => {
                    count++;
                });
            })
        });

        if(count === (colors.length * sizes.length)){
            this.imgReady = true;
        }

        // Monsters
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
        let palmImg = new Image();
        palmImg.setAttribute("src", "/ressources/images/game/Level6/Palm.png");

        // Life & health
        let lifeImg = new Image();
        lifeImg.setAttribute("src", "/ressources/images/game/Life.png");
        let lifeSmallImg = new Image();
        lifeSmallImg.setAttribute("src", "/ressources/images/game/LifeSmall.png");
        let healthImg = new Image();
        healthImg.setAttribute("src", "/ressources/images/game/Health17x20.png");
    }
}