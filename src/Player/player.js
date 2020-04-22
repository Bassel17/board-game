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
}

module.exports = Player;