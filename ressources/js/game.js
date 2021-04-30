class Game {
    constructor(canvasId){
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.gameObjects = [];

        this.init(canvasId)
    }

    init(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1000;
        this.canvas.height = 550;
        this.context = this.canvas.getContext('2d');
        
    
        //TODO Create objects to display
        this.createLevel();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    createLevel(){
        this.gameObjects = [
            new Drop(this.context, 0, 148, 1),

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
            new MonsterHand(this.context, 800, Math.random() * (this.canvas.height - 128 - 148), -1, 1, 55),
            new Timer(this.context, 0)
        ];
    }

    gameLoop(timeStamp) {
        // Calculate the number of seconds passed since the last frame
        let secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        
        // Loop over all game objects to update
        for(let i=0; i <  this.gameObjects.length; i++){
            this.gameObjects[i].update(secondsPassed);
        }
        
        // Detect collisions with monsters and edges
        this.detectCollisions();
    
        // Clear canvas
        this.clearCanvas();
    
        // Loop over all game objects to draw
        for(let i=0; i < this.gameObjects.length; i++){
            this.gameObjects[i].draw();
        }
        
        
        // The loop function has reached it's end
        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }

    detectCollisions(){        
        // EDGES COLLISIONS : Checking collisions for droppy 
        let droppy = this.gameObjects[0];

        if (droppy.x < 0) { //RIGHT EDGE
            droppy.x = 0;
        } else if (droppy.x > this.canvas.width - droppy.width) { //LEFT EDGE
            droppy.x = this.canvas.width - droppy.width;
        }

        if(droppy.y < 148){ //TOP EDGE
            droppy.y = 148;
        } else if(droppy.y > this.canvas.height - droppy.height - 10){ //BOTTOM EDGE
            droppy.y = this.canvas.height - droppy.height - 10;
        }
    }

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}