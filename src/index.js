import './style.css';

const {
    getJsonStructureOfElementWith,
    transformToID,
    getSymbol,
    isPlayer,
    isBlock,
    isObstacle,
    isWeapon,
    playerCanMoveOn,
    getListOfBlocksPLayerCanMoveOn,
    getName,
    getPower
} = require("./HelperFunctions/helperFunctions");
const BoardGenerator = require("./BoardGenerator/boardGenerator");
const BoardRenderer = require("./BoardRenderer/boardRenderer");
const Movement = require("./Movement/movement");
const Game = require("./Game/game");
const Player = require("./Player/player");
const boardGenerator = new BoardGenerator();
let Board = boardGenerator.generateGameBoardWithPlayers();
const root = document.getElementById("root");
render(Board);
const hero = new Player({
    name:"hero",
    health:100,
    power:50,
    weapon:"hands"
});

const villian = new Player({
    name:"villian",
    health:100,
    power:50,
    weapon:"hands"
});
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
            movePlayerOnBlock(element,ID);
        }else if(isPlayer(element)){
            const elementID = transformToID(element);
            const elementTag = document.getElementById(elementID);
            elementTag.addEventListener("click",()=>{
                console.log("battle start");
            })
        }else{
            movePlayerOnWeapon(element,ID,player);
        }
    });
}
start();

function movePlayerOnBlock(element,ID){
    const elementID = transformToID(element);
    const elementTag = document.getElementById(elementID);
    elementTag.classList.add("glowing-tiles");
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
}

function movePlayerOnWeapon(element,ID,player){
    const weaponName = getName(element.symbol);
    const weaponPower = getPower(weaponName);
    const elementID = transformToID(element);
    const elementTag = document.getElementById(elementID);
    elementTag.classList.add("glowing-tiles");
    elementTag.addEventListener('click',(event)=>{
        const elementClicked = event.target.id;
        if(listOfBlocksPLayerCanMoveOn.some((element)=>(element.id[0] === getJsonStructureOfElementWith(elementClicked).id[0])&&(element.id[1] === getJsonStructureOfElementWith(elementClicked).id[1]))){
            const movement = new Movement(Board,ID,elementClicked);
            Board = movement.pickupWeapon(elementID);
            if(player.weapon !== "hands")
                Board = movement.dropWeapon(player.weapon,ID);
            player.pickUp({
                name:weaponName,
                power: weaponPower
            });
            render(Board);
            updatePlayers();
            listOfBlocksPLayerCanMoveOn = [];
            game.moved();
            start();
        }
    });
}