function spreadElementID(ID){
    const arrayOfTypeAndPosition = ID.split("_");
    const arrayOfElementPosition = arrayOfTypeAndPosition[1].split("-");
    const positionInColumn = parseInt(arrayOfElementPosition[0]);
    const positionInRow = parseInt(arrayOfElementPosition[1]);
    const elementDetails={
        id:[positionInColumn,positionInRow],
        symbol:getSymbol(arrayOfTypeAndPosition[0])
    }

    return elementDetails
}

function getSymbol(type){
    let symbol;
    switch(type){
        case "secondperson":
            symbol="&";
            break;
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
        return player[0] === "person" || "secondperson";
    }

    isBlock(){
        const block = this.position.split("_");
        return block[0] === "block";
    }

    isObstacle(obstacle){
        return obstacle.symbol === " " ;
    }

    isWeapon(weapon){
        return weapon.symbol === getSymbol("sword") || weapon.symbol === getSymbol("gun") || weapon.symbol === getSymbol("knife") || weapon.symbol === getSymbol("bomb");
    }

    isWeaponID(element){
        const weapon = this.position.split("_");
        return weapon[0] === "sword" || weapon[0] === "gun" || weapon[0] === "knife" || weapon[0] === "bomb";
    }

    isBlockFromJson(block){
        return block.symbol === "*";
    }

    playerCanMoveOn(element){
        return this.isWeapon(element) || this.isBlockFromJson(element);
    }

    getListOfBlocksPLayerCanMoveOn(){
        const [player,block] = this.getJsonStructure();
        const arrayOfElementsThatPlayerCanMoveOn = [];
        const rowPlayerIsOn = player.id[1];
        const columnPlayerIsOn = player.id[0];
        const row = this.board[rowPlayerIsOn];
        for(let i = columnPlayerIsOn+1; i<=columnPlayerIsOn+3;i++){
            if(!(row[i] == undefined)){
                if(this.playerCanMoveOn(row[i])){
                    arrayOfElementsThatPlayerCanMoveOn.push(row[i]);
                }else{
                    break;
                }
            }
        }

        for(let i = columnPlayerIsOn-1; i>=columnPlayerIsOn-3;i--){
            if(!(row[i] == undefined)){
                if(this.playerCanMoveOn(row[i])){
                    arrayOfElementsThatPlayerCanMoveOn.push(row[i]);
                }else{
                    break;
                }
            }
        }
        
        const board =this.board;
        for(let i = rowPlayerIsOn+1; i<=rowPlayerIsOn+3;i++){
            if(!(board[i] == undefined || board[i][columnPlayerIsOn]== undefined)){
                if(this.playerCanMoveOn(board[i][columnPlayerIsOn])){
                    arrayOfElementsThatPlayerCanMoveOn.push(board[i][columnPlayerIsOn]);
                }else{
                    break;
                }
            }
        }

        for(let i = rowPlayerIsOn-1; i>=rowPlayerIsOn-3;i--){
            if(!(board[i] == undefined || board[i][columnPlayerIsOn]== undefined)){
                if(this.playerCanMoveOn(board[i][columnPlayerIsOn])){
                    arrayOfElementsThatPlayerCanMoveOn.push(board[i][columnPlayerIsOn]);
                }else{
                    break;
                }
            }
        }
        return arrayOfElementsThatPlayerCanMoveOn;
        
    }

    inReach(){
        const [player,block] = this.getJsonStructure();
        const listOfBlocksPLayerCanMoveOn = this.getListOfBlocksPLayerCanMoveOn();
        let canMoveOn = false;
        listOfBlocksPLayerCanMoveOn.forEach((element)=>{if(element.id[0] === block.id[0] && element.id[1] === block.id[1] )canMoveOn=true;});
        return canMoveOn;
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

    pickupWeapon(elementID){
        const [player,block] = this.getJsonStructure();
        const weapon = spreadElementID(elementID);
        const playerPosition = [...player.id];
        const weaponPosition = [...weapon.id];
        const copyPlayer = {...player};
        const copyWeapon = {...weapon};
        copyPlayer.id = [...weaponPosition];
        copyWeapon.id = [...playerPosition];
        copyWeapon.symbol = "*";
        this.board[playerPosition[1]][playerPosition[0]] = {...copyWeapon};
        this.board[weaponPosition[1]][weapongitPosition[0]] = {...copyPlayer};
        return this.board;
    }

}

module.exports = Movement;