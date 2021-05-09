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
        
        //this.droppy.context = this.context;
        
        //General text style of the game
        this.context.font = "40px Delius";
        this.context.fillStyle = "white";
    
        this.createLevel0();

                // press enter to reload the page
        window.addEventListener('keydown', event => { 
            if(event.code === 'Enter'){
                document.location.reload();
            }
         }, false);

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    createLevel0(){
        this.level = 0;
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level0/Level0.png')";
        this.gameObjects = [
            new StartButton(this.context) // used to test level change TODO: delete after drag and drop implement
        ];

        // used to test level change
        this.canvas.addEventListener('click', (event) => {
            if (
                // size of margin left + postion x in canva of start button
                event.x > canvas.offsetLeft + 300 &&
                // size of margin left + with of start button + width of start button
                event.x < canvas.offsetLeft + 300 + 110 && 
                // position y in canva of start button
                event.y > 480 && 
                // position y in canva of start button + height
                event.y < 480 + 50
            ) {
                this.ready = true;
            }
        });

        this.droppy = new Drop(this.context, 0, 148, 1, "blue");

    }

    createLevel1(){
        this.level = 1;
        // Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level1/Level1.png')";
                
        // Tap over hero and monsters
        let tap = document.createElement('img');
        tap.src = "/ressources/images/game/Level1/Tap.png";
        tap.style.position = 'absolute';
        tap.style.top = 0;
        document.getElementById('bg').appendChild(tap);

        //Launch the timer
        this.timer = new Timer(this.context);

        //Music
        this.level1Music.play(); // TODO: uncomment when finishing issue

        //Title
        this.levelName = 'Clean the drop';
        
        this.gameObjects = [
            
            this.droppy,
            
            this.timer,

            //Monsters
            new Soap(this.context, 50, Math.random() * (this.canvas.height - 48 - 148)), //Random between space usable
            new Soap(this.context, 150, Math.random() * (this.canvas.height - 48 - 148)),
            new Soap(this.context, 250, Math.random() * (this.canvas.height - 48 - 148)),
            new Soap(this.context, 350, Math.random() * (this.canvas.height - 48 - 148)),
            new Soap(this.context, 450, Math.random() * (this.canvas.height - 48 - 148)),
            new Soap(this.context, 550, Math.random() * (this.canvas.height - 48 - 148)),
            new Soap(this.context, 650, Math.random() * (this.canvas.height - 48 - 148)),
            new Soap(this.context, 750, Math.random() * (this.canvas.height - 48 - 148)),
            new Soap(this.context, 850, Math.random() * (this.canvas.height - 48 - 148)),
            new MonsterHand(this.context, 100, Math.random() * (this.canvas.height - 128 - 148), -1, 1, 25),
            new MonsterHand(this.context, 300, Math.random() * (this.canvas.height - 128 - 148), 1, -1, 30),
            new MonsterHand(this.context, 500, Math.random() * (this.canvas.height - 128 - 148), -1, -1, 40),
            new MonsterHand(this.context, 700, Math.random() * (this.canvas.height - 128 - 148), 1, 1, 50),
            new MonsterHand(this.context, 800, Math.random() * (this.canvas.height - 128 - 148), -1, 1, 55)
        ];
    }

    createWinnerScreen(){
        let stoppedTimer = this.timer.time;

        //Remove all objects drawn
        this.clearCanvas();

        //Remove all images
        this.clearImages();

        //Display winner screen background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Win/Win.png')";

        //Music
        this.level1Music.muted = true;
        this.winnerMusic.play();
        this.winnerSound.play();

        //Text
        let firstLine = `You released Droppy in ${stoppedTimer} !`;
        let secondLine = `Press ENTER to try faster`;

        this.context.fillStyle = "black";
        this.context.fillText(firstLine, this.canvas.width/2, 20);
        this.context.fillText(secondLine, this.canvas.width/2, 20 + 70); // 70 = space between lines
    }

    createGameOver(){
        let stoppedTimer = this.timer.time;

        //Remove all objects drawn
        this.clearCanvas();

        //Remove all images
        this.clearImages();
    
        //Display game over background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/GameOver/GameOver.png')";

        //Music
        this.level1Music.muted = true;
        this.gameOverMusic.play();
        this.gameOverSound.play();
                
        //Result
        //Check if level with s or not
        let levelOrLevels;
        if(this.level == 1){
            levelOrLevels = 'level';
        }
        else{
            levelOrLevels = 'levels'
        }

        let firstLine = `${this.level} ${levelOrLevels} completed in ${stoppedTimer}`;
        let secondLine = `Press ENTER to restart`;

        this.context.fillText(firstLine, this.canvas.width/2, 400);
        this.context.fillText(secondLine, this.canvas.width/2, 400 + 70); // 70 = space between lines

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
            this.createGameOver();
        }
        else if(this.isWin){
            this.createWinnerScreen();
        }
        else{
            // The loop function has reached it's end - Keep requesting new frames
            window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
        }
    }

    detectCollisionsEdges(){
        // EDGES COLLISIONS : Checking collisions for droppy 
        //let droppy = this.gameObjects[0];

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
    }

    detectCollisionsMonsters(){        
        //let droppy = this.gameObjects[0];

        if(this.level === 1){
            // MONSTER HANDS COLLISIONS : Checking collisions between Droppy and Monster Hands
            for (let i = 0; i < this.gameObjects.length; i++)
            {
                if(this.gameObjects[i] instanceof MonsterHand){
                    let monsterHand = this.gameObjects[i];

                    // 10 --> only sponge (not hand)
                    let hit = this.collisionRectRect(monsterHand.x, monsterHand.y, monsterHand.width, monsterHand.height - 10, this.droppy.x, this.droppy.y, this.droppy.width, this.droppy.height);
                    if(hit && this.droppy.isColliding === false){
                        this.droppy.isColliding = true;

                        if(this.droppy.size<4){
                            this.droppyLosesALife();
                        }
                        else{
                            this.isGameOver = true;
                        }
                    }
                }

                // SOAP COLLISIONS : Checking collisions between Droppy and Soaps
                if(this.gameObjects[i] instanceof Soap) {
                    let soap = this.gameObjects[i];

                    let hit = this.collisionRectRect(soap.x, soap.y, soap.width, soap.height, this.droppy.x, this.droppy.y, this.droppy.width, this.droppy.height);
                    if (hit && this.droppy.isColliding === false){
                        this.droppy.isColliding = true;
                        let soapNb = i;
                        let soapX = soap.x;

                        // soap disappear and appear again somewhere else on the same x axe
                        this.gameObjects.splice(soapNb, 1, new Soap(this.context, soapX, Math.random() * (this.canvas.height - 48 - 148)));
                        this.droppyIsUpsideDown();
                    }
                }
            }
        }
    }

    detectChangeLevel(){
        // To change from level 0 to level 1
        if (this.level === 0 && this.ready === true){
            this.createLevel1();
        }

        // To change from level 1 to 2
        if (this.level === 1){
            this.context.fillStyle = 'red';
            this.context.fillRect(900, 300, 100, 100);
            if(940 < (this.droppy.x + this.droppy.width/2) && (this.droppy.x + this.droppy.width/2) < 970){
                if(350 < (this.droppy.y + this.droppy.height/2) && (this.droppy.y + this.droppy.height/2) < 380){
                    this.isWin = true; // TODO: change in next level
                }
            }   
        }
    }

    droppyIsUpsideDown(){

        let oldSize = this.droppy.size;

        this.droppy.upsideDownCommands();
        this.droppy.size = 0;

        //Waiting 100ms before reappering (blink effect)
        setTimeout(()=>{
            this.droppy.size = oldSize;
            this.droppy.color = "green";
        }, 100);

        setTimeout(()=>{
            this.droppy.isColliding = false;
        },1000);

        setTimeout(()=>{
            this.droppy.normalCommands();
            this.droppy.color = "blue";
        },5000);
    }

    droppyLosesALife(){
        //Store old size to blink
        let oldSize = this.droppy.size;
        console.log("oldsize : " + oldSize);
                                
        this.droppy.size = 0;

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.droppy.size = oldSize;
        }, 100);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.droppy.size = 0;
        }, 200);

        //Waiting 100ms more before blinking at new size
        setTimeout(()=>{
            this.droppy.size = oldSize+1;
        }, 300);

        //Waiting 1000ms before Droppy can be touched again
        setTimeout(()=>{
            this.droppy.isColliding = false;
        }, 1000);
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