class BoardRenderer{

    constructor(randomlyGeneratedBoard,document){
        this.board = randomlyGeneratedBoard;
        this.document = document;
    }

    renderBlock(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:white;padding:1.5em;display:inline;border:1px solid grey");
        return div;
    }

    renderPlayerInfo(player,className){
        const playerInfo = this.document.createElement("div");
        playerInfo.setAttribute("class",className);
        const div = this.document.createElement('div');
        const health = this.document.createElement('span');
        const weapon = this.document.createElement('span');
        const power = this.document.createElement('span');
        health.innerHTML = `<div>Health</div><div>${player.health}</div>`;
        weapon.innerHTML = `<div>Weapon</div><div>${player.weapon}</div>`;
        power.innerHTML = `<div>Power</div><div>${player.power}</div>`;
        div.appendChild(health);
        div.appendChild(weapon);
        div.appendChild(power);
        div.setAttribute("class","playerInformationContainer");
        playerInfo.appendChild(div);
        return playerInfo;
    }

    renderStructure(){
        const parentContainer = this.document.createElement("div");
        parentContainer.setAttribute("class","parentContainer");
        const boardLength = this.board.length;
        for(let i=0;i<boardLength;i++){
            const div = this.document.createElement("div");
            div.setAttribute("class","parentContainerRow");
            this.board[i].forEach((Element)=>{
                switch(Element.symbol){
                    case "*":
                        const block = this.renderBlock();
                        block.setAttribute("id",`block_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(block);
                        break;
                    case " ":
                        const obstacle = this.renderBlock();
                        obstacle.setAttribute("id",`obstacle_${Element.id[0]}-${Element.id[1]}`);
                        obstacle.setAttribute("class","obstacle");
                        div.appendChild(obstacle);
                        break;
                    case "/":
                        const sword = this.renderBlock();
                        sword.setAttribute("id",`sword_${Element.id[0]}-${Element.id[1]}`);
                        sword.setAttribute("class","sword");
                        div.appendChild(sword);
                        break;
                    case ":":
                        const gun = this.renderBlock();
                        gun.setAttribute("id",`gun_${Element.id[0]}-${Element.id[1]}`);
                        gun.setAttribute("class","gun");
                        div.appendChild(gun);
                        break;
                    case "|":
                        const knife = this.renderBlock();
                        knife.setAttribute("id",`knife_${Element.id[0]}-${Element.id[1]}`);
                        knife.setAttribute("class","knife");
                        div.appendChild(knife);
                        break;
                    case "-":
                        const bomb = this.renderBlock();
                        bomb.setAttribute("id",`bomb_${Element.id[0]}-${Element.id[1]}`);
                        bomb.setAttribute("class","bomb");
                        div.appendChild(bomb);
                        break;
                    case "$":
                        const person = this.renderBlock();
                        person.setAttribute("id",`person_${Element.id[0]}-${Element.id[1]}`);
                        person.setAttribute("class","hero");
                        div.appendChild(person);
                        break;
                    case "&":
                        const second_person = this.renderBlock('white');
                        second_person.setAttribute("id",`secondperson_${Element.id[0]}-${Element.id[1]}`);
                        second_person.setAttribute("class","villian");
                        div.appendChild(second_person);
                        break;
                }
            });
            parentContainer.appendChild(div);
        }
        return parentContainer;
    }
}

module.exports = BoardRenderer;

