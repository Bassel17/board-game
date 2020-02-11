const BoardGenerator = require("../boardGenerator");

const arrayConsestsOfStars = (array) => {
    for(let i=0; i++<array.length; i++){
        if(array[0] !== "*"){
            return false;
        }
    }
    return true;
}

describe("Tests the generation of a board", () => {
    const numberOfRows = 10;
    const numberOfColumns = 10;
    const boardGenerator = new BoardGenerator(numberOfRows,numberOfColumns);
    const generatedRow = boardGenerator.generateRow();
    const generatedBoard = boardGenerator.generateBoard();

    it("the number of elements in a row is numberOfRows", () =>{
        expect(generatedRow.length).toEqual(numberOfRows);
    });

    it("a row contains * ", () => {
        expect(arrayConsestsOfStars(generatedRow)).toBe(true);
    });

    it("the number of columns is numberOfColumns", () => {
        expect(generatedBoard.length).toEqual(numberOfColumns);
    });
});