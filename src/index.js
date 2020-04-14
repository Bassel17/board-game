const BoardGenerator = require("./boardGenerator");
const BoardRenderer = require("./boardRenderer");
const Movement = require("./movement");

const boardGenerator = new BoardGenerator();
let Board = boardGenerator.generateGameBoardWithPlayers();
const root = document.getElementById("root");
render(Board);
function render(board){
    const boardRenderer = new BoardRenderer(board,document);
    const renderedBoard = boardRenderer.renderStructure();
    root.innerHTML="";
    root.appendChild(renderedBoard);
}

let elementsClicked = [];

root.addEventListener("click",(event)=>{
    const element = event.target.id;
    elementsClicked.push(element);
    if(elementsClicked.length === 2){
        const movement = new Movement(Board,elementsClicked[0],elementsClicked[1]);
        if(movement.isPlayer()){
            if(movement.isBlock() && movement.inReach()){
                const Board = movement.getSwitchedBoard();
                render(Board);
                elementsClicked=[];
            }else{
                elementsClicked.pop();
            }
        }else{
            elementsClicked.shift();
        }
    }
});