const {getJsonStructureOfElementWith} = require('../HelperFunctions/helperFunctions');

class Movement {

    constructor (board,player,element){
        this.board = board;
        this.player = getJsonStructureOfElementWith(player);
        this.element = getJsonStructureOfElementWith(element);
    }

    getSwitchedBoard(){
        const playerPosition = [...this.player.id];
        const blockPosition = [...this.element.id];
        const copyPlayer = {...this.player};
        const copyBlock = {...this.element};
        copyPlayer.id = [...blockPosition];
        copyBlock.id = [...playerPosition];
        this.board[playerPosition[1]][playerPosition[0]] = {...copyBlock};
        this.board[blockPosition[1]][blockPosition[0]] = {...copyPlayer};
        return this.board;
    }

    pickupWeapon(elementID){
        const  player= this.player;
        const weapon = getJsonStructureOfElementWith(elementID);
        const playerPosition = [...player.id];
        const weaponPosition = [...weapon.id];
        const copyPlayer = {...player};
        const copyWeapon = {...weapon};
        copyPlayer.id = [...weaponPosition];
        copyWeapon.id = [...playerPosition];
        copyWeapon.symbol = "*";
        this.board[playerPosition[1]][playerPosition[0]] = {...copyWeapon};
        this.board[weaponPosition[1]][weaponPosition[0]] = {...copyPlayer};
        return this.board;
    }

}

module.exports = Movement;