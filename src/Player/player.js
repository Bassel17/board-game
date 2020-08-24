class Player {
    constructor(playerData){
        this.name = playerData.name;
        this.health = playerData.health;
        this.power = playerData.power;
        this.weapon = playerData.weapon;
        this.defence = 0;
    }

    pickUp(weapon){
        this.weapon = weapon.name;
        this.power = weapon.power;
    }

    attack(player){
        player.health = player.health - (this.power/10) + player.defence;
    }

    defend(){
        this.defence = 5;
    }
}

module.exports = Player;