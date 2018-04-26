//@flow
import chai from "./../../../node_modules/chai/";
import Game from "../Game.js";

const userName: string = "user";
const computerName: string = "computer";
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
  it("Game saves user's move in history", () => {
    const x: number = 1,
      y: number = 1;
    game.acceptUserMove(x, y);
    const history: Array<mixed> = game.getMoveHistory();

    chai.expect(history).to.deep.equal([{ turn: userName, x, y }]);
  });
  it("Game saves computer's move in history", () => {
    game.createComputerMove();

    const history: Array<mixed> = game.getMoveHistory();

    chai.expect(history).to.deep.equal([{ turn: computerName, x: 0, y: 0 }]);
  });
  it("Game saves 1 computer's move and 1 user's move in history", () => {
    const x: number = 1,
      y: number = 1;
    game.createComputerMove();
    game.acceptUserMove(x, y);
    const history: Array<any> = game.getMoveHistory();

    chai.expect(history.length).to.equal(2);
    chai.expect(history[0].turn).to.equal(computerName);
    chai.expect(history[1].turn).to.equal(userName);
  });
});
