const Movement = require("./movement.js");
const board = require("./boardStub.js");

describe("Tests the generation of a board", () => { 

    it("expect it to return board, player, position", () =>{
        const player = "person_2-0";
        const block = "block_3-0";
        const movement = new Movement(board,player,block);
        expect(movement.board).toEqual(board);
        expect(movement.player).toEqual(player);
        expect(movement.position).toEqual(block);
    });

    it("return JSON structure for player and position", () =>{
        const player = "person_2-0";
        const block = "block_3-0";
        const movement = new Movement(board,player,block);
        const arrayOfPlayerAndPosition = movement.getJsonStructure();

        expect(arrayOfPlayerAndPosition).toEqual(
            [
                {id: [2,0], symbol: "$"},
                {id: [3,0], symbol: "*"}
            ]
        );
    });

    it("return false if not element is not a player", () =>{
        const player = "block_2-0";
        const block = "block_3-0";
        const movement = new Movement(board,player,block);

        expect(movement.isPlayer()).toBe(false);
    });

    it("return true element is a player", () =>{
        const player = "person_2-0";
        const block = "block_3-0";
        const movement = new Movement(board,player,block);

        expect(movement.isPlayer()).toBe(true);
    });

    it("return true element is a Block", () =>{
        const player = "person_2-0";
        const block = "block_3-0";
        const movement = new Movement(board,player,block);

        expect(movement.isBlock()).toBe(true);
    });

    it("return false if not element is not a block", () =>{
        const player = "person_2-0";
        const block = "obstacle_3-0";
        const movement = new Movement(board,player,block);

        expect(movement.isBlock()).toBe(false);
    });

    it("return false if block not in reach", () =>{
        const player = "person_2-0";
        const block = "block_3-2";
        const movement = new Movement(board,player,block);

        expect(movement.inReach()).toBe(false);
    });

    it("return true if block in reach", () =>{
        const player = "person_2-0";
        const block = "block_3-0";
        const movement = new Movement(board,player,block);

        expect(movement.inReach()).toBe(true);
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