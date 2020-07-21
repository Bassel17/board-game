class Player {
    constructor(playerData){
        this.name = playerData.name;
        this.health = playerData.health;
        this.power = playerData.power;
        this.weapon = playerData.weapon;
    }

    pickUp(weapon){
        this.weapon = weapon.name;
        this.power = weapon.power;
    }

    attack(player){
        player.health = player.health - (this.power/10);
    }
}

module.exports = Player;