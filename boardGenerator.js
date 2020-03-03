const generateRandomNumberBetween = (minimumNumber,maximumNumber) => {
    minimumNumber = Math.ceil(minimumNumber);
    maximumNumber = Math.floor(maximumNumber);
    const randomNumber = Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) + minimumNumber;
    return randomNumber;
}

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
            board.push([...row]);
        }
        return board;
    }

    generateBoardWithRandomElements(){
        const numberOfEmptyElements = (this.numberOfRows + this.numberOfColumns)/(this.numberOfRows/2);
        const generatedBoard = this.generateBoard();
        for(let i=0;i<numberOfEmptyElements;i++){
            const randomNumberRow = generateRandomNumberBetween(0,this.numberOfRows-1);
            const randomNumberColumn = generateRandomNumberBetween(0,this.numberOfColumns-1);
            const chosenColumn = generatedBoard[randomNumberColumn];
            if(chosenColumn[randomNumberRow] === " "){
                i--;
            }else{
                chosenColumn.splice(randomNumberRow,1," ");
            }
        }
        return generatedBoard;
    }
}

module.exports = BoardGenerator;