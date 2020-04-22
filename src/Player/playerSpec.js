const Player = require("./player");
const {hero} = require("../Game/playerStub");
const {swordStub} = require("./weaponStub");

describe("testing player class",()=>{

    it("player class should return player details name, health, power and weapon", () => {
        const player = new Player(hero);
        expect(player.name).toEqual("hero");
        expect(player.health).toEqual(100);
        expect(player.power).toEqual(50);
        expect(player.weapon).toEqual("hands");
    });

    it("player method pickup should pickup a weapon", ()=>{
        const player = new Player(hero);
        player.pickUp(swordStub);
        expect(player.weapon).toEqual("sword");
    });

    it("player power should increase after picking up weapon", ()=>{
        const player = new Player(hero);
        player.pickUp(swordStub);
        expect(player.power).toEqual(100);
    });

});