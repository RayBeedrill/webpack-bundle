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
});
