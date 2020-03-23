class BoardRenderer{

    constructor(randomlyGeneratedBoard,document,root){
        this.board = randomlyGeneratedBoard;
        this.document = document;
    }

    renderBlock(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:grey;padding:50px;display:inline");
        return div;
    }

    renderObstacle(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:black;padding:50px;display:inline");
        return div;
    }

    renderSword(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:yellow;padding:50px;display:inline");
        return div;
    }

    renderGun(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:blue;padding:50px;display:inline");
        return div;
    }

    renderKnife(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:red;padding:50px;display:inline");
        return div;
    }

    renderBomb(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:pink;padding:50px;display:inline");
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
                        div.appendChild(block);
                        break;
                    case " ":
                        const obstacle = this.renderObstacle();
                        div.appendChild(obstacle);
                        break;
                    case "/":
                        const sword = this.renderSword();
                        div.appendChild(sword);
                        break;
                    case ":":
                        const gun = this.renderGun();
                        div.appendChild(gun);
                        break;
                    case "|":
                        const knife = this.renderKnife();
                        div.appendChild(knife);
                        break;
                    case "-":
                        const bomb = this.renderBomb();
                        div.appendChild(bomb);
                        break;
                }
            });
            parentContainer.appendChild(div);
        }
        return parentContainer;
    }
}

