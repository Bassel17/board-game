const Movement = require("./movement.js");
const board = require("./boardStub.js");

describe("Tests the movement of a player on the board", () => { 

    it("expect it to return board, player, position", () =>{
        const player = "person_2-0";
        const element = "block_3-0";
        const movement = new Movement(board,player,element);
        expect(movement.board).toEqual(board);
        expect(movement.player).toEqual({
            id:[2,0],
            symbol:"$"
        });
        expect(movement.element).toEqual({
            id:[3,0],
            symbol:"*"
        });
    });

    it("should return a the board with player and position switched", () =>{
        const player = "person_0-1";
        const block = "block_0-2";
        const movement = new Movement(board,player,block);
        const newBoard = movement.getSwitchedBoard();
        const newPlayer = newBoard[2][0];
        const newBlock = newBoard[1][0];

        expect(newPlayer).toEqual({
            id:[0,2],
            symbol:"$"
        });

        expect(newBlock).toEqual({
            id:[0,1],
            symbol:"*"
        });
    });

});