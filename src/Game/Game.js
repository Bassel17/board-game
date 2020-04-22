class Game {

    constructor(hero,villian){
        this.hero = hero;
        this.villian = villian;
        this.turn = null;
    }

    start(player){
        if(player !== undefined)
            player == this.hero ? this.turn = "hero" : this.turn = "villian";
        else return "give us starting player";
    }

    moved(){
        if(this.turn !== null)
            this.turn == "hero" ? this.turn = "villian" : this.turn = "hero";
        else return "game did not start"
    }

}

module.exports = Game;
