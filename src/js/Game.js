//@flow
export default class Game {
  _board: Array<Array<string>>;
  _userMoveSymbol: string;
  _computerMoveSymbol: string;
  constructor(): void {
    this._board = [["", "", ""], ["", "", ""], ["", "", ""]];
    this._userMoveSymbol = "x";
    this._computerMoveSymbol = "o";
  }
  getState(): Array<Array<string>> {
    return this._board;
  }
  acceptUserMove(x: number, y: number): void {
    if (this._isCellFree(x, y)) {
      this._updateBoard(x, y, { moveSymbol: this._userMoveSymbol });
    } else {
      return this._throwException("cell is already taken");
    }
  }
  createComputerMove(): void {
    this._updateBoard(0, 0, { moveSymbol: this._computerMoveSymbol });
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
