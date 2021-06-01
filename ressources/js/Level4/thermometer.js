/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony 
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Thermometer{
    constructor (context, x, y){
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = 7;
        this.height = -1;
        this.speed = 3;

        this.isColliding = false;
    }

    draw(){
        this.context.fillStyle = '#f2574e'; //#39b4b2
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        this.height -= this.speed * secondsPassed;
    }
}