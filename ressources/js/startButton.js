class StartButton
{
    constructor (context){
        this.context = context;
        this.x = 300;
        this.y = 450;
        this.width = 100;
        this.height = 50;
    }

    draw(){
        //Draw button
        this.context.fillStyle = 'black';
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.clearRect(20, 20, 20, 20);
        this.context.strokeRect(50, 50, 50, 50);

        //Text in button
        this.context.fillStyle = 'white';
        this.context.font = '30px Serif';
        this.context.fillText('Start', this.x +20, this.y + (this.height/2) + 10)
    }

    update(secondsPassed){
       
    }
}