const getSymbol = (type) => {
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

const getName = (symbol) => {
    let name;
    switch(symbol){
        case "secondperson":
            name="secondperson";
            break;
        case "$":
            name="person";
            break;
        case "*":
            name="block"
            break;
        case " ":
            name="obstacle";
            break;
        case "/":
            name="sword";
            break;
        case ":":
            name="gun";
            break;
        case "|":
            name = "knife";
            break;
        case "-":
            name = "bomb"
            break;
    }
    return name;
}

const getJsonStructureOfElementWith = (ID) => {
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

const transformToID = (element) => {
    return `${getName(element.symbol)}_${element.id[0]}-${element.id[1]}`
}

const isPlayer = (player) => {
    return player.symbol === getSymbol("person") || player.symbol === getSymbol("secondperson");
}

const isBlock = (block) => {
    return block.symbol === getSymbol("block");
}

const isObstacle = (obstacle) => {
    return obstacle.symbol === getSymbol("obstacle"); ;
}

const isWeapon = (weapon) => {
    return weapon.symbol === getSymbol("sword") || weapon.symbol === getSymbol("gun") || weapon.symbol === getSymbol("knife") || weapon.symbol === getSymbol("bomb");
}

const playerCanMoveOn = (element) => {
    return isWeapon(element) || isBlock(element);
}
const getArrayOfElementsRight = (columnPlayerIsOn,row) => {
    const arrayOfElementsThatPlayerCanMoveOn = [];
    for(let i = columnPlayerIsOn+1; i<=columnPlayerIsOn+3;i++){
        if(!(row[i] == undefined)){
            if(playerCanMoveOn(row[i])){
                arrayOfElementsThatPlayerCanMoveOn.push(row[i]);
            }else{
                break;
            }
        }
    }
    return arrayOfElementsThatPlayerCanMoveOn;
}

const getArrayOfElementsLeft = (columnPlayerIsOn,row)=>{
    const arrayOfElementsThatPlayerCanMoveOn = [];
    for(let i = columnPlayerIsOn-1; i>=columnPlayerIsOn-3;i--){
        if(!(row[i] == undefined)){
            if(playerCanMoveOn(row[i])){
                arrayOfElementsThatPlayerCanMoveOn.push(row[i]);
            }else{
                break;
            }
        }
    }
    return arrayOfElementsThatPlayerCanMoveOn;
}

const getArrayOfElementsUp = (rowPlayerIsOn,columnPlayerIsOn,board)=>{
    const arrayOfElementsThatPlayerCanMoveOn = [];
    for(let i = rowPlayerIsOn+1; i<=rowPlayerIsOn+3;i++){
        if(!(board[i] == undefined || board[i][columnPlayerIsOn]== undefined)){
            if(playerCanMoveOn(board[i][columnPlayerIsOn])){
                arrayOfElementsThatPlayerCanMoveOn.push(board[i][columnPlayerIsOn]);
            }else{
                break;
            }
        }
    }
    return arrayOfElementsThatPlayerCanMoveOn;
}

const getArrayOfElementsDown = (rowPlayerIsOn,columnPlayerIsOn,board) => {
    const arrayOfElementsThatPlayerCanMoveOn = [];
    for(let i = rowPlayerIsOn-1; i>=rowPlayerIsOn-3;i--){
        if(!(board[i] == undefined || board[i][columnPlayerIsOn]== undefined)){
            if(playerCanMoveOn(board[i][columnPlayerIsOn])){
                arrayOfElementsThatPlayerCanMoveOn.push(board[i][columnPlayerIsOn]);
            }else{
                break;
            }
        }
    }
    return arrayOfElementsThatPlayerCanMoveOn;
}

const getListOfBlocksPLayerCanMoveOn = (board,player) => {
    const rowPlayerIsOn = player.id[1];
    const columnPlayerIsOn = player.id[0];
    const row = board[rowPlayerIsOn];
    const arrayOfElementsRight = getArrayOfElementsRight(columnPlayerIsOn,row);
    const arrayOfElementsLeft = getArrayOfElementsLeft(columnPlayerIsOn,row);
    const arrayOfElementsUp = getArrayOfElementsUp(rowPlayerIsOn,columnPlayerIsOn,board);
    const arrayOfElementsDown = getArrayOfElementsDown(rowPlayerIsOn,columnPlayerIsOn,board);
    const arrayOfElementsThatPlayerCanMoveOn = [
        ...arrayOfElementsRight,
        ...arrayOfElementsLeft,
        ...arrayOfElementsUp,
        ...arrayOfElementsDown
    ];
    return arrayOfElementsThatPlayerCanMoveOn;
    
}

const getPower = (weaponName) => {
    switch(weaponName){
        case "sword":
            return 100;
        case "knife":
            return 80;
        case "gun":
            return 150;
        case "bomb":
            return 200;
    }
}

exports.getSymbol = getSymbol;
exports.getJsonStructureOfElementWith = getJsonStructureOfElementWith;
exports.isPlayer = isPlayer;
exports.isBlock = isBlock;
exports.isObstacle = isObstacle;
exports.isWeapon = isWeapon;
exports.playerCanMoveOn = playerCanMoveOn;
exports.getListOfBlocksPLayerCanMoveOn = getListOfBlocksPLayerCanMoveOn;
exports.transformToID = transformToID;
exports.getName = getName;
exports.getPower = getPower;