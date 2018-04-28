//@flow
export default class Game {
  _board: Array<Array<string>>;
  _userMoveSymbol: string;
  _computerMoveSymbol: string;
  _history: Array<mixed>;
  _fieldSize: number;

  constructor(): void {
    this._board = [["", "", ""], ["", "", ""], ["", "", ""]];
    this._userMoveSymbol = "x";
    this._computerMoveSymbol = "o";
    this._history = [];
    this._fieldSize = 3;
  }
  getState(): Array<Array<string>> {
    return this._board;
  }
  acceptUserMove(x: number, y: number): void {
    if (this._isCellFree(x, y)) {
      this._history.push({ turn: "user", x, y });
      this._updateBoard(x, y, { moveSymbol: this._userMoveSymbol });
    } else {
      return this._throwException("cell is already taken");
    }
  }
  createComputerMove(): void {
    const freeCells = this._board.reduce(
      (total, row) =>
        row.reduce((count, el) => (el === "" ? ++count : count), total),
      0
    );

    if (!freeCells) {
      return;
    }
    let x: number = this._getRandomCoordinate();
    let y: number = this._getRandomCoordinate();

    while (!!this._board[x][y]) {
      x = this._getRandomCoordinate();
      y = this._getRandomCoordinate();
    }

    this._history.push({ turn: "computer", x, y });
    this._updateBoard(x, y, { moveSymbol: this._computerMoveSymbol });
  }
  getMoveHistory(): Array<mixed> {
    return this._history;
  }
  _getRandomCoordinate(): number {
    return Math.floor(Math.random() * (this._fieldSize - 0));
  }
  _updateBoard(x: number, y: number, config: { moveSymbol: string }): void {
    const { moveSymbol = this._userMoveSymbol } = config;
    this._board[x][y] = moveSymbol;
  }
  _isCellFree(x: number, y: number): boolean {
    return !this._board[x][y];
  }

  _throwException(msg: string): void {
    throw new Error(msg);
  }
}
