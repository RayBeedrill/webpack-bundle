//@flow
import chai from "./../../../node_modules/chai/";
import Game from "../Game.js";
const userMoveSymbol: string = "x";
const initialGameBoard: Array<Array<string>> = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let game: Game;

beforeEach(() => {
  game = new Game();
});

describe("Game", () => {
  it("should return gameboard", () => {
    const board: Array<Array<string>> = game.getState();
    chai.expect(board).to.deep.equal(initialGameBoard);
  });
  it("Write's symbol in given coordinates", () => {
    const x: number = 1,
      y: number = 1;

    game.acceptUserMove((x: number), (y: number));
    const board: Array<Array<string>> = game.getState();

    chai.expect(board[x][y]).to.equal(userMoveSymbol);
  });
  it("Trows exception if user moves in taken sell", () => {
    const x: number = 2,
      y: number = 2;

    game.acceptUserMove(x, y);
    const func = game.acceptUserMove.bind(game, x, y);
    chai.expect(func).to.throw("cell is already taken");
  });
  it("Computer moves in top left cell", () => {
    game.createComputerMove();
    const board: Array<Array<string>> = game.getState();

    chai.expect(board[0][0]).to.equal("o");
  });
});
