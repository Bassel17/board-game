function spreadElementID(ID){
    const arrayOfTypeAndPosition = ID.split("_");
    const arrayOfElementPosition = arrayOfTypeAndPosition[1].split("-");
    const positionInRow = parseInt(arrayOfElementPosition[0]);
    const positionInColumn = parseInt(arrayOfElementPosition[1]);
    const elementDetails={
        id:[positionInRow,positionInColumn],
        symbol:getSymbol(arrayOfTypeAndPosition[0])
    }

    return elementDetails
}

function getSymbol(type){
    let symbol;
    switch(type){
        case "person":
            symbol="$";
            break;
        case "block":
            symbol="*";
            break;
        case "obstacle":
            symbol=" ";
            break;
        case "sword":
            symbol="/";
            break;
        case "gun":
            symbol=":";
            break;
        case "knife":
            symbol="|";
            break;
        case "bomb":
            symbol="-";
            break;
    }
    return symbol;
}

class Movement {

    constructor (board="",player="",position=""){
        this.board = board;
        this.player = player;
        this.position = position;
    }

    getJsonStructure(){
        const player = spreadElementID(this.player);
        const position = spreadElementID(this.position);
        return [player,position];
    }

    isPlayer(){
        const player = this.player.split("_");
        return player[0] === "person";
    }

    isBlock(){
        const block = this.position.split("_");
        return block[0] === "block";
    }

    isObstacle(element){
        const obstacle = element.split("_");
        return obstacle[0] === "obstacle" ;
    }

    isWeapon(element){
        const weapon = element.split("_");
        return weapon[0] === "sword" || weapon[0] === "gun" || weapon[0] === "knife" || weapon[0] === "bomb";
    }

    inReach(){
        const [player,block] = this.getJsonStructure();
        return (player.id[0] === block.id[0] && (block.id[1]===player.id[1]+1 || block.id[1]===player.id[1]-1)) || (player.id[1] === block.id[1] && (block.id[0]===player.id[0]+1 || block.id[0]===player.id[0]-1));
    }

    getSwitchedBoard(){
        const [player,block] = this.getJsonStructure();
        const playerPosition = [...player.id];
        const blockPosition = [...block.id];
        const copyPlayer = {...player};
        const copyBlock = {...block};
        copyPlayer.id = [...blockPosition];
        copyBlock.id = [...playerPosition];
        this.board[playerPosition[1]][playerPosition[0]] = {...copyBlock};
        this.board[blockPosition[1]][blockPosition[0]] = {...copyPlayer};
        return this.board;
    }

}

module.exports = Movement;