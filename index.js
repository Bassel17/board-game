const boardGenerator = new BoardGenerator();
let Board = boardGenerator.generateGameBoard();
const boardRenderer = new BoardRenderer(Board,document);
const renderedBoard = boardRenderer.renderStructure();
const root = document.getElementById("root");
root.appendChild(renderedBoard);
let elementsClicked = [];

root.addEventListener("click",(event)=>{
    let element = spreadElementID(event.target.id);
    if(element.symbol === "$"){
       elementsClicked.push(element);
    }else{
        if(elementsClicked.length === 1){
            elementsClicked.push(element);
            console.log(elementsClicked[0],elementsClicked[1]);
            switchTwoElements(elementsClicked[0],elementsClicked[1]);
            elementsClicked=[];
        }
    }
});

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

function switchTwoElements(person,Element){
    
}
