var context = this.canvas.getContext('2d');
class Game{
    constructor(canvasId){
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.gameObjects = [];


        this.init(canvasId)
    }

    init(canvasId){
        this.canvas = document.getElementById(canvasId);
        
    
        //TODO Create objects to display
        

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }



    gameLoop(timeStamp) {

        // Calculate the number of seconds passed since the last frame
        var secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
    
        // TODO Loop over all game objects to update
        // Timer
	    context.fillStyle = "rgb(250, 250, 250)";
	    context.font = "24px Helvetica";
	    context.textAlign = "left";
	    context.textBaseline = "top";
	    context.fillStyle = "white";
	    context.fillText("Timer: " + Date.now(), 32, 32);
        
        // TODO detecter collisions with monsters and edges
    
        // Clear canvas
        this.clearCanvas();
    
        // TODO Loop over all game objects to draw
    
        // The loop function has reached it's end
        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}