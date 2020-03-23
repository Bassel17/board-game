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
            row.push({id:[i],symbol:"*"});
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

    generateBoardWithEmptyElements(){
        const numberOfEmptyElements = (this.numberOfRows * this.numberOfColumns)/(this.numberOfRows + this.numberOfColumns);
        const generatedBoard = this.generateBoard();
        for(let i=0;i<numberOfEmptyElements;i++){
            const randomNumberRow = generateRandomNumberBetween(0,this.numberOfRows-1);
            const randomNumberColumn = generateRandomNumberBetween(0,this.numberOfColumns-1);
            const chosenColumn = generatedBoard[randomNumberColumn];
            if(chosenColumn[randomNumberRow].symbol === " "){
                i--;
            }else{
                chosenColumn.splice(randomNumberRow,1,{id:[randomNumberRow,randomNumberColumn],symbol:" "});
            }
        }
        return generatedBoard;
    }

    generateGameBoard(){
        const randomlyGeneratedBoard = this.generateBoardWithEmptyElements();
        const weapons = [{id:1,symbol:"/"},{id:2,symbol:":"},{id:3,symbol:"|"},{id:4,symbol:"-"}]
        for(let i=0;i<4;i++){
            const randomNumberRow = generateRandomNumberBetween(0,this.numberOfRows-1);
            const randomNumberColumn = generateRandomNumberBetween(0,this.numberOfColumns-1);
            const chosenColumn = randomlyGeneratedBoard[randomNumberColumn];
            if(chosenColumn[randomNumberRow] === " " || chosenColumn[randomNumberRow].symbol === "/" || chosenColumn[randomNumberRow].symbol===":" || chosenColumn[randomNumberRow].symbol==="|" || chosenColumn[randomNumberRow].symbol==="-"){
                i--;
            }else{
                weapons[i].id=[randomNumberRow,randomNumberColumn];
                chosenColumn.splice(randomNumberRow,1,weapons[i]);
            }
        }
        console.log(randomlyGeneratedBoard);
        return randomlyGeneratedBoard;
    }
}

//module.exports = BoardGenerator;