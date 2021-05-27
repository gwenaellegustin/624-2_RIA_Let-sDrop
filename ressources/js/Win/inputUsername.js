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
                this.storeUsernameInJsonFile(thisGame);
                this.input.value = "";
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

    storeUsernameInJsonFile(thisGame){
        this.results = new Array();

        //Create object
        let userObject = {
            'username': this.input.value,
            'time': this.timer.diff,
            'timeString': this.timer.time
        };

        //Charge URL into a variable
        let requestURL = 'https://6242ria.blob.core.windows.net/$web/ressources/json/hallOfFame.json?sp=racwd&st=2021-05-27T16:29:39Z&se=2025-10-31T01:29:39Z&sv=2020-02-10&sr=b&sig=M1BcLE2%2BkRHmG5U64ZgxQdPPMs5wEjlVs1g1kA%2Fq4mQ%3D';

        //Instanciate a new XMLHttpRequest and then open a new request
        let request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('GET', requestURL);

        //Tell the server that we're expecting an answer in .json type then send request
        request.responseType = 'json';
        request.send();


        //Store the answer into a native variable
        request.onload = function() {
            let hallOfFameJson = request.response;
            this.results = hallOfFameJson;

            //Add last result to the array
            this.results.push(userObject);
            console.log(this.results);

            InputUsername.fillInHOFArray(this.results);

            HallOfFame.createLevel(thisGame, this.results);
        }       

        //In order to highlight the user record, I need to know who it is
        localStorage.setItem("CurrentUsername",this.input.value);
        localStorage.setItem("CurrentTime", this.timer.time);
    }

    static fillInHOFArray(jsonObject) {
        let requestURL = 'https://6242ria.blob.core.windows.net/$web/ressources/json/hallOfFame.json?sp=racwd&st=2021-05-27T16:29:39Z&se=2025-10-31T01:29:39Z&sv=2020-02-10&sr=b&sig=M1BcLE2%2BkRHmG5U64ZgxQdPPMs5wEjlVs1g1kA%2Fq4mQ%3D';
        let request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('PUT', requestURL, true);

        //request.setRequestHeader('Content-Type', 'application/json');
        //request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.setRequestHeader('x-ms-version', '2020-04-08');
        request.setRequestHeader('x-ms-blob-type', 'BlockBlob')

        var blob = new Blob([JSON.stringify(jsonObject)], {type: 'application/json'});

        
        request.send(blob);
        

        /*
        //Put lines from JSON into result ** not finished **
        let jsonArray = jsonObject['results'];
        let resultingArray = new Array();

        for (let i = 0; i < jsonArray.length; i++) {
            resultingArray[i] = JSON.parse(jsonArray[i]);
        }

        return resultingArray;
        */
    }
}