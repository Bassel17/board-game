const {getJsonStructureOfElementWith,getSymbol,isPlayer,isBlock,isObstacle,isWeapon,playerCanMoveOn} = require("./helperFunctions");

describe("Tests the helper function", () => {

    it("return the type symbol based on the name", ()=>{
        expect(getSymbol("person")).toEqual("$");
        expect(getSymbol("secondperson")).toEqual("&");
        expect(getSymbol("block")).toEqual("*");
        expect(getSymbol("obstacle")).toEqual(" ");
        expect(getSymbol("sword")).toEqual("/");
        expect(getSymbol("gun")).toEqual(":");
        expect(getSymbol("knife")).toEqual("|");
        expect(getSymbol("bomb")).toEqual("-");
    })

    it("return a json structure after recieving the ID",()=>{
        const ID = "block_3-0";
        const JsonStructure = getJsonStructureOfElementWith(ID);
        expect(JsonStructure).toEqual({
            id:[3,0],
            symbol:"*"
        });
    });

    it("return true if player and false if not",()=>{
        const player = {symbol:"$"}
        const secondPlayer = {symbol:"&"}
        const notPlayer = {symbol:"*"}

        expect(isPlayer(player)).toBe(true);
        expect(isPlayer(secondPlayer)).toBe(true);
        expect(isPlayer(notPlayer)).toBe(false);

    });

    it("return true if block and false if not",()=>{
        const block = {symbol:"*"}
        const notBlock = {symbol:"&"}

        expect(isBlock(block)).toBe(true);
        expect(isBlock(notBlock)).toBe(false);

    });

    it("return true if obstacle and false if not",()=>{
        const obstacle = {symbol:" "}
        const notObstacle = {symbol:"&"}

        expect(isObstacle(obstacle)).toBe(true);
        expect(isObstacle(notObstacle)).toBe(false);

    });

    it("return true if obstacle and false if not",()=>{
        const sword = {symbol:"/"}
        const knife = {symbol:"|"}
        const gun = {symbol:":"}
        const bomb = {symbol:"-"}
        const notWeapon = {symbol:"&"}

        expect(isWeapon(sword)).toBe(true);
        expect(isWeapon(knife)).toBe(true);
        expect(isWeapon(gun)).toBe(true);
        expect(isWeapon(bomb)).toBe(true);
        expect(isWeapon(notWeapon)).toBe(false);

    });

    it("return true if player can move on element false otherwise",()=>{
        const weapon = {symbol:"/"}
        const notWeapon = {symbol:"&"}
        const block = {symbol:"*"}

        expect(playerCanMoveOn(weapon)).toBe(true);
        expect(playerCanMoveOn(block)).toBe(true);
        expect(playerCanMoveOn(notWeapon)).toBe(false);

    });

    it("return the elements a player can move on",()=>{
        

    });

});