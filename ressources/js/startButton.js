class StartButton
{
    constructor (context){
        this.context = context;
        this.x = 300;
        this.y = 480;
        this.width = 110;
        this.height = 50;
    }

    draw(){
        //Draw button
        this.context.fillStyle = 'black';
        this.context.fillRect(this.x, this.y, this.width, this.height);

        //Text in button
        this.context.fillStyle = 'white';
        this.context.fillText('Start', this.x + 10, this.y + (this.height/2) + 10);
    }

    update(secondsPassed){
    }
}