class Drop {
    constructor (context, x, y, size){
        this.context = context;
        this.dropReady = false;
        this.dropImage = new Image();
        this.x = x;
        this.y = y;
        this.width;
        this.height;
        this.size = size;
        this.speed = this.size * 15;

        //this.isColliding = false;
    }

    draw(){
        this.dropImage.addEventListener('load', (event) => {
            this.width = this.dropImage.width; //Reduce width of the drop
            this.height = (this.dropImage.height / this.dropImage.width) * this.width; //Reduce height of the drop by keeping same ratio
            this.dropReady = true; //The image has been load, we can draw it
        });

        this.dropImage.src = "/ressources/images/game/DropSize" + this.size + ".png";

        //Just to see for impact
        this.context.beginPath();
        this.context.moveTo(this.x - 8, this.y + this.height);
        this.context.lineTo(this.x + this.width + 8, this.y + this.height);
        this.context.lineTo(this.x + this.width / 2, this.y - 10);
        this.context.fill();

        if(this.dropReady){
            this.context.drawImage(this.dropImage, this.x, this.y, this.width, this.height);
        }
    }

    update(secondsPassed){
        // TODO keyboard reaction
        // documentation: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
        window.addEventListener('keydown', (event) => {
            if (event.defaultPrevented) {
              return; // Do nothing if event already handled
            }
          
            switch(event.code) {
              case "KeyS":
              case "ArrowDown":
                // Handle "down"
                this.y += this.speed * secondsPassed;
                break;
              case "KeyW":
              case "ArrowUp":
                // Handle "up"
                this.y -= this.speed * secondsPassed;
                break;
              case "KeyA":
              case "ArrowLeft":
                // Handle "left"
                this.x -= this.speed * secondsPassed;
                break;
              case "KeyD":
              case "ArrowRight":
                // Handle "right"
                this.x += this.speed * secondsPassed;
                break;
            }

           // Consume the event so it doesn't get handled twice
            event.preventDefault();
        }, 'true');
    }

    
}