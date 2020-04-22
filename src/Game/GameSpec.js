const Game = require("./Game");
const {hero,villian} = require("./playerStub");

describe("testing game behavior class", ()=>{

    it("Game should return hero player", ()=>{
        const game = new Game(hero,villian);
        expect(game.hero).toEqual(hero);
    });

    it("Game should return villian player", ()=>{
        const game = new Game(hero,villian);
        expect(game.villian).toEqual(villian);
    });

    it("Game should give first turn to hero player", () => {
        const game = new Game(hero,villian);
        game.start(hero);
        expect(game.turn).toEqual("hero");
    });

    it("Game should give first turn to villian player", () => {
        const game = new Game(hero,villian);
        game.start(villian);
        expect(game.turn).toEqual("villian");
    });

    it("Game should give next turn to villian",()=>{
        const game = new Game(hero,villian);
        game.start(hero);
        game.moved();
        expect(game.turn).toEqual("villian");
    });

    it("Game should give next turn to hero",()=>{
        const game = new Game(hero,villian);
        game.start(hero);
        game.moved();
        game.moved();
        expect(game.turn).toEqual("hero");
    });

    it("Game moved method should return game did not start",()=>{
        const game = new Game(hero,villian);
        expect(game.moved()).toEqual("game did not start");
    });

    it("Game start method should return give us starting player",()=>{
        const game = new Game(hero,villian);
        expect(game.start()).toEqual("give us starting player");
    });

});
