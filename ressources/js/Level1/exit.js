class Exit {
    constructor (context) {
        this.context = context;
        this.x = 954;
        this.y = 370;
        this.radius = 25;
    }

    draw(){
		this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    }

    update(secondsPassed){
    
    }
}