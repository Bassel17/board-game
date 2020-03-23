class BoardRenderer{

    constructor(randomlyGeneratedBoard,document){
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
    }

    renderGun(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:blue;padding:50px;display:inline");
    }

    renderKnife(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:red;padding:50px;display:inline");
    }

    renderBomb(){
        const div = this.document.createElement("div");
        div.setAttribute("style", "background-color:pink;padding:50px;display:inline");
    }
}
const boardRenderer = new BoardRenderer([""],document);
const root = document.getElementById("root");

module.exports= BoardRenderer;

