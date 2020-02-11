class BoardGenerator {
    constructor(numberOfRows = 10, numberOfColumns = 10){
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
    }

    generateRow(){
        const row = [];
        for(let i=0; i<this.numberOfRows ; i++){
            row.push('*');
        }
        return row;
    }

    generateBoard(){
        const board = [];
        const row = this.generateRow();
        for(let i=0; i<this.numberOfColumns ; i++){
            board.push(row);
        }
        return board;
    }
}

module.exports = BoardGenerator;