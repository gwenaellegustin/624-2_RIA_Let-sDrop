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
        this.level1Music = new Audio("/ressources/sounds/frightNight.wav"); // will continue through all levels
        this.level1Music.loop = true; 
        this.winnerMusic = new Audio("/ressources/sounds/Happy_Home.wav");
        this.winnerSound = new Audio("/ressources/sounds/woodenShipOnTheSea.wav");
        this.gameOverMusic = new Audio("/ressources/sounds/twilightRain.wav");
        this.gameOverSound = new Audio("/ressources/sounds/glassBreakExplosion.wav");
        this.endSound = new Audio("/ressources/sounds/ocean.wav");
        this.endSound.loop = true;
        
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
                //TODO:
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
                break;
            }
    }

    detectChangeLevel(){
        // To change from level 0 to level 1
        if (this.level === 0 && this.ready === true){ //TODO: Change when drag and drop (do we need this.ready?)
            Level1.createLevel(this);
            Level3.createLevel(this);
        }

        // Zone which define end of the level
        switch(this.level){
            case 1:
                if(940 < (this.droppy.x + this.droppy.width/2) && (this.droppy.x + this.droppy.width/2) < 970){
                    if(350 < (this.droppy.y + this.droppy.height/2) && (this.droppy.y + this.droppy.height/2) < 380){
                        Level3.createLevel(this); //TODO:CHANGE
                    }
                }
                break;
            case 2:
                //TODO:
                //Level3.createLevel(this);
                break;
            case 3: 
                if(993 < (this.droppy.x + this.droppy.width)){
                    Level5.createLevel(this); //TODO:
                }
                //Level4.createLevel(this);
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
        let images = document.querySelectorAll('img');
        images.forEach(image => {
            image.remove();
        });
    }
}