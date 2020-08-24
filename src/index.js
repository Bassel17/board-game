import './style.css';

const {
    getJsonStructureOfElementWith,
    transformToID,
    isPlayer,
    isBlock,
    getListOfBlocksPLayerCanMoveOn,
    getName,
    getPower
} = require("./HelperFunctions/helperFunctions");
const BoardGenerator = require("./BoardGenerator/boardGenerator");
const BoardRenderer = require("./BoardRenderer/boardRenderer");
const Movement = require("./Movement/movement");
const Game = require("./Game/game");
const Player = require("./Player/player");
const root = document.getElementById("root");

const $div = $(`
<div class = "start-screen">
    <h1 class = "start-screen__title"> Hero VS Villian </h1>
    <button class = "start-screen__button">Start Game !!</button>
</div>
`);
$div.click(gameOn);
$('#root').append($div);

function gameOn(){
    const boardGenerator = new BoardGenerator();
    let Board = boardGenerator.generateGameBoardWithPlayers();

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
    render(Board);
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
        const heroPlayer = boardRenderer.renderPlayerInfo(hero,'heroInfo')
        const villianPlayer = boardRenderer.renderPlayerInfo(villian,'villianInfo');
        const heroImage = document.createElement('div');
        const villianImage = document.createElement('div');
        heroImage.setAttribute("class",'heroImage');
        villianImage.setAttribute("class",'villianImage');
        root.innerHTML="";
        root.appendChild(renderedBoard);
        root.appendChild(heroPlayer);
        root.appendChild(villianPlayer);
        root.appendChild(heroImage);
        root.appendChild(villianImage);
    }

    function renderGame(){
        const boardRenderer = new BoardRenderer(Board,document);
        const heroPlayer = boardRenderer.renderPlayerInfo(hero,'heroInfo');
        const villianPlayer = boardRenderer.renderPlayerInfo(villian,'villianInfo');
        const heroImage = document.createElement('div');
        const villianImage = document.createElement('div');
        heroImage.setAttribute("class",'heroImage');
        villianImage.setAttribute("class",'villianImage');
        const buttonHero = document.createElement("button");
        const buttonVillian = document.createElement("button");
        buttonHero.innerText = "attack";
        buttonVillian.innerText = "attack";
        buttonHero.setAttribute('id','buttonHero');
        buttonVillian.setAttribute('id','buttonVillian');
        root.innerHTML="";
        heroPlayer.appendChild(buttonHero);
        villianPlayer.appendChild(buttonVillian);
        root.appendChild(heroPlayer);
        root.appendChild(villianPlayer);
        root.appendChild(heroImage);
        root.appendChild(villianImage);
        startBattle();
    }

    function renderWinner(playerName){
        root.innerHTML = 
        `<div class = "start-screen">
        <h1 class="winner-header">
            winner is the ${playerName} !!!
        </h1>
        <button onClick = "window.location.reload();">Restart Game</button>
        </div>`;
    }

    function startBattle(){
        const buttonHero = document.getElementById('buttonHero');
        const buttonVillian = document.getElementById('buttonVillian');
        if(game.turn === "hero"){
            buttonHero.addEventListener('click',()=>{
                hero.attack(villian);
                if(villian.health <= 0){
                    renderWinner("Hero");
                }else{
                    game.moved();
                    renderGame();
                }
            })
        }else{
            buttonVillian.addEventListener('click',()=>{
                villian.attack(hero);
                if(hero.health <= 0){
                    renderWinner("Villian");
                }else{
                    game.moved();
                    renderGame();
                }
            });
        }
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
                elementTag.classList.add("glowing-tiles");
                elementTag.addEventListener("click",()=>{
                    render(Board);
                    listOfBlocksPLayerCanMoveOn = [];
                    game.moved();
                    renderGame();
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
}