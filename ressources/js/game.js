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
        this.canvas.bord
        this.context = this.canvas.getContext('2d');
        
    
        //TODO Create objects to display
        this.createLevel();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    createLevel(){
        this.gameObjects = [
            new Drop(this.context, 2, 148, 4), //TODO why 40 ? + drop too big

            //Monsters
            new Soap(this.context, 100, Math.random() * (this.canvas.height - 96 - 148)), //Random between space usable
            new Soap(this.context, 200, Math.random() * (this.canvas.height - 96 - 148)),
            new Soap(this.context, 300, Math.random() * (this.canvas.height - 96 - 148)),
            new Soap(this.context, 400, Math.random() * (this.canvas.height - 96 - 148)),
            new Soap(this.context, 500, Math.random() * (this.canvas.height - 96 - 148)),
            new Soap(this.context, 600, Math.random() * (this.canvas.height - 96 - 148)),
            new Soap(this.context, 700, Math.random() * (this.canvas.height - 96 - 148)),
            new Soap(this.context, 800, Math.random() * (this.canvas.height - 96 - 148)),
            new Soap(this.context, 900, Math.random() * (this.canvas.height - 96 - 148)),
            new MonsterHand(this.context, 100, Math.random() * (this.canvas.height - 128 - 148), -1, 1),
            new MonsterHand(this.context, 300, Math.random() * (this.canvas.height - 128 - 148), 1, -1),
            new MonsterHand(this.context, 500, Math.random() * (this.canvas.height - 128 - 148), -1, -1),
            new MonsterHand(this.context, 700, Math.random() * (this.canvas.height - 128 - 148), 1, 1),
            new MonsterHand(this.context, 800, Math.random() * (this.canvas.height - 128 - 148), -1, 1),
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
        
        // TODO detecter collisions with monsters and edges
    
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

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}