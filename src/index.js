const {
    getJsonStructureOfElementWith,
    getSymbol,
    isPlayer,
    isBlock,
    isObstacle,
    isWeapon,
    playerCanMoveOn,
    getListOfBlocksPLayerCanMoveOn
} = require("./HelperFunctions/helperFunctions");
const BoardGenerator = require("./BoardGenerator/boardGenerator");
const BoardRenderer = require("./BoardRenderer/boardRenderer");
const Movement = require("./Movement/movement");
const Game = require("./Game/game");
const Player = require("./Player/player");

const boardGenerator = new BoardGenerator(8,8);
let Board = boardGenerator.generateGameBoardWithPlayers();
const root = document.getElementById("root");
render(Board);

function render(board){
    const boardRenderer = new BoardRenderer(board,document);
    const renderedBoard = boardRenderer.renderStructure();
    root.innerHTML="";
    root.appendChild(renderedBoard);
}