class InputUsername{
    constructor(context, timer, thisGame){
        this.context = context;
        this.x = 200;
        this.y = 280;
        this.timer = timer;

        this.results;

        //Create input for username
        let marginCanvas = document.getElementById("canvas").offsetLeft;
        this.input = document.createElement('INPUT');
        this.input.id = 'usernameInput';
        this.input.style.position = 'absolute';
        this.input.style.top = `${this.y+40}px`;
        this.input.style.left = `${marginCanvas+100}px`;
        this.input.style.height = "30px";
        this.input.style.width = "200px";
        this.input.style.paddingLeft = "10px";
        document.getElementById('bg').appendChild(this.input);

        window.addEventListener('keydown', event => {
            //If the input.value is empty, no need to save nothing
            if(event.code === 'Enter' && this.input.value!=""){
                //this.storeUsernameLocalStorage();
                this.storeUsernameInJsonFile();
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

    storeUsernameInJsonFile(){
        this.results = new Array();

        //Create object
        let userObject = {
            'username': this.input.value,
            'time': this.timer.diff,
            'timeString': this.timer.time
        };

        //Charge URL into a variable
        let requestURL = 'https://6242ria.z22.web.core.windows.net/ressources/json/hallOfFame.json';

        //Instanciate a new XMLHttpRequest and then open a new request
        let request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('GET', requestURL);

        //Tell the server that we're expecting an answer in .json type then send request
        request.responseType = 'json';
        let header = request.getAllResponseHeaders();
        console.log(header);
        request.send();


        //Store the answer into a native variable
        request.onload = function() {
            let hallOfFameJson = request.response;
            this.result = JSON.parse(hallOfFameJson);
        }
                
        //Add last result to the array
        this.results.push(userObject);
        console.log(this.results);

        

        /*localStorage.setItem("Results",JSON.stringify(this.results));

        //In order to highlight the user record, I need to know who it is
        localStorage.setItem("CurrentUsername",this.input.value);
        localStorage.setItem("CurrentTime", this.timer.time);*/

    }

    fillInHOFArray(jsonObject) {
        //Put lines from JSON into result ** not finished **
        let jsonArray = jsonObject['results'];
        let resultingArray = new Array();

        for (let i = 0; i < jsonArray.length; i++) {
            resultingArray[i] = JSON.parse(jsonArray[i]);
        }

        return resultingArray;
    }
}