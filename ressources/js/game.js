class Game {
    constructor(canvasId){
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.level = null;
        this.isGameOver = false;
        this.isWin = false;
        this.levelName = null;
        this.timer = null;
        this.canReload = true;

        // Object
        this.droppy = null;

        // Music and sounds
        this.level1Music = new Audio("/ressources/sounds/frightNight.wav"); // will continue through all levels
        //level1Music.loop = true; // TODO: to uncomment and try when enough levels
        this.winnerMusic = new Audio("/ressources/sounds/Happy_Home.wav");
        this.winnerSound = new Audio("/ressources/sounds/woodenShipOnTheSea.wav");
        this.gameOverMusic = new Audio("/ressources/sounds/twilightRain.wav");
        this.gameOverSound = new Audio("/ressources/sounds/glassBreakExplosion.wav");
        

        this.init(canvasId);
    }

    init(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1000;
        this.canvas.height = 550;
        this.context = this.canvas.getContext('2d');
        
        //General text style of the game
        this.context.font = "40px Delius";
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
        let secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        // Loop over all game objects to update
        for(let i=0; i <  this.gameObjects.length; i++){
            this.gameObjects[i].update(secondsPassed);
        }
        
        // Detect collisions with edges and monsters
        this.detectCollisionsEdges();
        this.detectCollisionsMonsters();
        
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
        switch(this.level){
            case 3:
                //TODO:
                break;
            case 4:
                //TODO:
                break;
            case 6:
                //TODO:
                break;
            default:
                // EDGES COLLISIONS : Checking collisions for droppy 
                if (this.droppy.x < 0) { //LEFT EDGE
                    this.droppy.x = 0;
                } else if (this.droppy.x > this.canvas.width - this.droppy.width) { //RIGHT EDGE
                    this.droppy.x = this.canvas.width - this.droppy.width;
                }

                if(this.droppy.y < 148){ //TOP EDGE
                    this.droppy.y = 148;
                } else if(this.droppy.y > this.canvas.height - this.droppy.height){ //BOTTOM EDGE
                    this.droppy.y = this.canvas.height - this.droppy.height;
                }
                break;
        }
    }

    detectCollisionsMonsters(){        
        if(this.level === 1){
            Level1.detectCollisionsMonsters(this);
        }
    }

    detectChangeLevel(){
        // To change from level 0 to level 1
        if (this.level === 0 && this.ready === true){ //TODO: Change when drag and drop (do we need this.ready?)
            Level1.createLevel(this);
        }

        // To change from level 1 to 2
        if (this.level === 1){
            if(940 < (this.droppy.x + this.droppy.width/2) && (this.droppy.x + this.droppy.width/2) < 970){
                if(350 < (this.droppy.y + this.droppy.height/2) && (this.droppy.y + this.droppy.height/2) < 380){
                    this.isWin = true; // TODO: change in next level
                }
            }
        }
    }

    setTitle(){
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillText(this.levelName, this.canvas.width/2, 15);
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