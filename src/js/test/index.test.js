//@flow
import chai from "./../../../node_modules/chai/";
import sinon from "./../../../node_modules/sinon/";
import Game from "../Game.js";

const userName: string = "user";
const computerName: string = "computer";
const userMoveSymbol: string = "x";
const computerMoveSymbol: string = "o";
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
  it("Game saves user's move in history", () => {
    const x: number = 1,
      y: number = 1;
    game.acceptUserMove(x, y);
    const history: Array<mixed> = game.getMoveHistory();

    chai.expect(history).to.deep.equal([{ turn: userName, x, y }]);
  });
  it("Game saves computer's move in history", () => {
    const stub = sinon.stub(Math, "random").returns(0.5);
    game.createComputerMove();

    const history: Array<mixed> = game.getMoveHistory();

    chai.expect(history).to.deep.equal([{ turn: computerName, x: 1, y: 1 }]);
    stub.restore();
  });
  it("Game saves 1 computer's move and 1 user's move in history", () => {
    const x: number = 0,
      y: number = 0;
    game.createComputerMove();
    game.acceptUserMove(x, y);
    const history: Array<any> = game.getMoveHistory();

    chai.expect(history.length).to.equal(2);
    chai.expect(history[0].turn).to.equal(computerName);
    chai.expect(history[1].turn).to.equal(userName);
  });
  it("Computer moves in randomly chosen cell", () => {
    const stub = sinon.stub(Math, "random").returns(0.5);

    game.createComputerMove();
    const board = game.getState();

    chai.expect(board[1][1]).to.equal(computerMoveSymbol);
    stub.restore();
  });
  it("Computer moves in cell that is't taken", () => {
    for (let i: number = 0; i < 3; i++) {
      for (let j: number = 0; j < 3; j++) {
        if (i !== 2 || j !== 2) {
          game.acceptUserMove(i, j);
        }
      }
    }

    game.createComputerMove();
    const board = game.getState();

    const userCount = board.reduce((result, row) => {
      return row.reduce((count, el) => {
        return el === userMoveSymbol ? ++count : count;
      }, result);
    }, 0);

    const computerCount = board.reduce((result, row) => {
      return row.reduce((count, el) => {
        return el === computerMoveSymbol ? ++count : count;
      }, result);
    }, 0);

    chai.expect(userCount).to.equal(8);
    chai.expect(computerCount).to.equal(1);
    chai.expect(board[2][2]).to.equal(computerMoveSymbol);
  });
});
