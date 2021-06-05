/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class HallOfFame{
    static createLevel(thisGame, results){
        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Stop sound of droppy on the boat and start ocean + seagulls
        thisGame.winnerSound.muted = true;
        thisGame.endSound.play();

        //Delete input from html
        document.getElementById("usernameInput").remove();

        //Display winner screen background
        document.getElementById("bg").style.backgroundImage = thisGame.bgHallOfFameUrl ;

        //Sort results
        results.sort(this.sortResults);

        this.draw(thisGame, results);

        thisGame.canReload = true; 
    }

    static sortResults(a,b){
        let timeA = new Date(a.time).getTime();
        let timeB = new Date(b.time).getTime();
        return timeA > timeB ? 1 : -1;
    }

    static draw(thisGame, results){
        //Draw hall of fame rect
        thisGame.context.fillStyle = "rgba(255,255,255,0.8)";
        thisGame.context.fillRect(150, 50, thisGame.canvas.width-300, thisGame.canvas.height-50);

        //Title
        thisGame.context.fillStyle = "black";
        thisGame.context.textAlign = "left";
        thisGame.context.textBaseline = "top";
        thisGame.context.fillText("Hall of fame", 200, 70);

        //Display each row (10max)
        thisGame.context.font = "28px Delius";
        let numberOfMatches = 0;
        for (let i = 0; i < results.length && i < 10; i++) {
            const element = results[i];
            let position;

            let j = i+1; //because i=0 for the 1st position
            j -= numberOfMatches; //For example if there are 2 2nd, the 4th element will be 3rd

            if(i!=0 && new Date(element.time).getTime() === new Date(results[i-1].time).getTime()){
                j--; //3rd should be 2nd if a match
                numberOfMatches++;
            }

            switch(j){
                case 1:
                    position = "1st";
                    break;
                case 2:
                    position = "2nd";
                    break;
                case 3:
                    position = "3rd";
                    break;
                default:
                    position = j+"th";
                    break;
            }

            if(localStorage.getItem("CurrentUsername") === element.username && localStorage.getItem("CurrentTime") === element.timeString){
                thisGame.context.fillStyle = "#ff3232"; //Color in red current 
            }
            else{
                thisGame.context.fillStyle = "black";
            }

            //If username is longer than 12, make it like "AntonyMarque..."
            if(element.username.length > 12){
                element.username = element.username.substring(0, 12) + "...";
            }

            thisGame.context.fillText(`${position}`, 200, 150+i*35);
            thisGame.context.fillText(`- ${element.username}`, 350, 150+i*35);
            thisGame.context.fillText(`- ${element.timeString}`, 650, 150+i*35);
        }
    }
}