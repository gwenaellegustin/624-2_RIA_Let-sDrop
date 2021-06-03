/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Steam {
    constructor (context, x, y){
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = 250;
        this.height = 250;

        this.steam = document.createElement('img');
        this.steam.src = "/ressources/images/game/Level3/Steam250x250.png";
        this.steam.style.position = 'absolute';
        this.steam.style.top = 0;
        let marginLeft = document.getElementById("canvas").offsetLeft;
        let marginTop = document.getElementById("canvas").offsetTop;
        this.steam.style.marginLeft = `${marginLeft + this.x - this.width/2}px`;
        this.steam.style.marginTop = `${marginTop + this.y - this.height/2}px`;
        this.steam.id = 'steam' + Math.floor(Math.random()*1000);

        document.getElementById('bg').appendChild(this.steam);

        setTimeout(() => {
            this.remove();
        }, 3000)

    }

    remove(){
        if(document.getElementById(this.steam.id) != null){
            document.getElementById(this.steam.id).remove();
        }
    }
}