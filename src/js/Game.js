//@flow
export default class Game {
  _board: Array<Array<string>>;
  _userMoveSymbol: string;
  constructor(): void {
    this._board = [["", "", ""], ["", "", ""], ["", "", ""]];
    this._userMoveSymbol = "x";
  }
  getState(): Array<Array<string>> {
    return this._board;
  }
  acceptUserMove(x: number, y: number): void {
    this._updateBoard(x, y);
  }
  _updateBoard(x: number, y: number) {
    this._board[x][y] = this._userMoveSymbol;
  }
}
