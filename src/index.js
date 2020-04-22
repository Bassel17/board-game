const {
    getJsonStructureOfElementWith,
    transformToID,
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
const hero = new Player({
    name:"hero",
    health:100,
    power:50,
    weapon:"hands"
});

const villian = {
    name:"villian",
    health:100,
    power:50,
    weapon:"hands"
}
const game = new Game(hero,villian);

let HeroElement = document.getElementsByClassName("hero");
let VillianElement = document.getElementsByClassName("villian");

let heroID = HeroElement[0].id;
let villianID = VillianElement[0].id;

game.start(hero);
let listOfBlocksPLayerCanMoveOn;
function start(){
    if(game.turn === "hero"){
        listOfBlocksPLayerCanMoveOn = getListOfBlocksPLayerCanMoveOn(Board,getJsonStructureOfElementWith(heroID));
        onClickListener(heroID,listOfBlocksPLayerCanMoveOn,hero);
    }else{
        listOfBlocksPLayerCanMoveOn = getListOfBlocksPLayerCanMoveOn(Board,getJsonStructureOfElementWith(villianID));
        onClickListener(villianID,listOfBlocksPLayerCanMoveOn,villian);
    }
}

function render(board){
    const boardRenderer = new BoardRenderer(board,document);
    const renderedBoard = boardRenderer.renderStructure();
    root.innerHTML="";
    root.appendChild(renderedBoard);
}

function updatePlayers(){
    HeroElement = document.getElementsByClassName("hero");
    VillianElement = document.getElementsByClassName("villian");
    heroID = HeroElement[0].id;
    villianID = VillianElement[0].id;
}

function onClickListener(ID,list,player){

    list.forEach((element)=>{
        if(isBlock(element)){
            const elementID = transformToID(element);
            const elementTag = document.getElementById(elementID);
            elementTag.addEventListener('click',(event)=>{
                const elementClicked = event.target.id;
                if(listOfBlocksPLayerCanMoveOn.some((element)=>(element.id[0] === getJsonStructureOfElementWith(elementClicked).id[0])&&(element.id[1] === getJsonStructureOfElementWith(elementClicked).id[1]))){
                    const movement = new Movement(Board,ID,elementClicked);
                    Board = movement.getSwitchedBoard();
                    render(Board);
                    updatePlayers();
                    listOfBlocksPLayerCanMoveOn = [];
                    game.moved();
                    start();
                }
            });
        }else{
            const elementID = transformToID(element);
            const elementTag = document.getElementById(elementID);
            elementTag.addEventListener('click',(event)=>{
                const elementClicked = event.target.id;
                if(listOfBlocksPLayerCanMoveOn.some((element)=>(element.id[0] === getJsonStructureOfElementWith(elementClicked).id[0])&&(element.id[1] === getJsonStructureOfElementWith(elementClicked).id[1]))){
                    const movement = new Movement(Board,ID,elementClicked);
                    Board = movement.pickupWeapon(elementID);
                    player.pickUp({
                        name:"sword",
                        power: 100
                    });
                    render(Board);
                    updatePlayers();
                    listOfBlocksPLayerCanMoveOn = [];
                    game.moved();
                    start();
                }
            });
        }
    });
}
start();