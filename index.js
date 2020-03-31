const boardGenerator = new BoardGenerator(4,4);
let Board = boardGenerator.generateGameBoard();
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
            const Board = movement.getSwitchedBoard();
            render(Board);
            elementsClicked=[];
        }else{
            elementsClicked.shift();
        }
    }
});