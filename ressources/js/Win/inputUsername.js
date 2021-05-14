class InputUsername{
    constructor(context, timer, thisGame){
        this.context = context;
        this.x = 200;
        this.y = 280;
        this.timer = timer;

        this.results;

        //Create input for username
        this.input = document.createElement('INPUT');
        this.input.id = 'usernameInput';
        this.input.style.position = 'absolute';
        this.input.style.top = `${this.y+40}px`;
        this.input.style.left = `${this.x+145}px`;
        this.input.style.height = "30px";
        this.input.style.width = "200px";
        this.input.style.paddingLeft = "10px";
        document.getElementById('bg').appendChild(this.input);

        window.addEventListener('keydown', event => {
            //If the input.value is empty, no need to save nothing
            if(event.code === 'Enter' && this.input.value!=""){
                this.storeUsernameLocalStorage();
                this.input.value = "";
                HallOfFame.createLevel(thisGame, this.results);
            }
        });

        //Recalculate each time the input is modified
        document.getElementById('usernameInput').addEventListener('input', () => {
            thisGame.clearCanvas();

            Winner.drawText(thisGame);
            this.draw();
        })
    }

    draw(){
        this.context.fillStyle = "black";
        this.context.fillText("Your name: ",this.x,this.y);
    }

    update(secondsPassed){
    }

    storeUsernameLocalStorage(){
        //Create userObject
        let userObject = {
            'username': this.input.value,
            'time': this.timer.diff,
            'timeString': this.timer.time
        };

        this.results = new Array();

        //If not null or undefined - get current results from localStorage
        if(localStorage.getItem("Results")){
            this.results = JSON.parse(localStorage.getItem("Results"));
        }

        this.results.push(userObject);

        localStorage.setItem("Results",JSON.stringify(this.results));

        //In order to highlight the user record, I need to know who it is
        localStorage.setItem("CurrentUsername",this.input.value);
        localStorage.setItem("CurrentTime", this.timer.time);
    }
}