class BoardRenderer{

    constructor(randomlyGeneratedBoard,document){
        this.board = randomlyGeneratedBoard;
        this.document = document;
    }

    renderBlock(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:grey;padding:2em;display:inline;border:1px solid white");
        return div;
    }

    renderObstacle(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:black;padding:2em;display:inline;border:1px solid white");
        return div;
    }

    renderSword(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:yellow;padding:2em;display:inline;border:1px solid white");
        return div;
    }

    renderGun(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:blue;padding:2em;display:inline;border:1px solid white");
        return div;
    }

    renderKnife(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:red;padding:2em;display:inline;border:1px solid white");
        return div;
    }

    renderBomb(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:pink;padding:2em;display:inline;border:1px solid white");
        return div;
    }

    renderPerson(color){
        const div = this.document.createElement("div");
        div.setAttribute("style", `background-color:${color};padding:2em;display:inline;border:1px solid white`);
        return div;
    }

    renderStructure(){
        const parentContainer = this.document.createElement("div");
        parentContainer.setAttribute("style", "width:100%;display:flex;flex-direction:column;");
        const boardLength = this.board.length;
        for(let i=0;i<boardLength;i++){
            const div = this.document.createElement("div");
            div.setAttribute("style", "width:100%;display:flex;flex-direction:row;");
            this.board[i].forEach((Element)=>{
                switch(Element.symbol){
                    case "*":
                        const block = this.renderBlock();
                        block.setAttribute("id",`block_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(block);
                        break;
                    case " ":
                        const obstacle = this.renderObstacle();
                        obstacle.setAttribute("id",`obstacle_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(obstacle);
                        break;
                    case "/":
                        const sword = this.renderSword();
                        sword.setAttribute("id",`sword_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(sword);
                        break;
                    case ":":
                        const gun = this.renderGun();
                        gun.setAttribute("id",`gun_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(gun);
                        break;
                    case "|":
                        const knife = this.renderKnife();
                        knife.setAttribute("id",`knife_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(knife);
                        break;
                    case "-":
                        const bomb = this.renderBomb();
                        bomb.setAttribute("id",`bomb_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(bomb);
                        break;
                    case "$":
                        const person = this.renderPerson('brown');
                        person.setAttribute("id",`person_${Element.id[0]}-${Element.id[1]}`);
                        div.appendChild(person);
                        break;
                    case "&":
                        const second_person = this.renderPerson('white');
                        second_person.setAttribute("id",`secondperson_${Element.id[0]}-${Element.id[1]}`);
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

