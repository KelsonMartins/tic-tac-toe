export class Referee {
  checkHorizontal(player: Number): Boolean {
    for (let row = 0; row < this.game?.board.length; row += 1) {
      let count = 0;
      for (let col = 0; col < this.game?.board.length; col += 1) {
        if (this.game?.board[row][col] === player) {
          count += 1;
        } else {
          break;
        }

        if (count === this.game?.board.length) {
          return true;
        }
      }
    }
    return false;
  }

  checkVertical(player: Number): Boolean {
    for (let col = 0; col < this.game?.board.length; col += 1) {
      let count = 0;
      for (let row = 0; row < this.game?.board.length; row += 1) {
        if (this.game?.board[row][col] === player) {
          count += 1;
        } else {
          break;
        }

        if (count === this.game?.board.length) {
          return true;
        }
      }
    }
    return false;
  }

  checkDiagonal(player: Number): Boolean {
    let count = 0;
    for (
      let row = 0, col = 0;
      row < this.game?.board.length;
      row += 1, col += 1
    ) {
      if (this.game?.board[row][col] === player) {
        count += 1;
      } else {
        break;
      }
      if (count === this.game?.board.length) {
        return true;
      }
    }
    count = 0;
    for (
      let row = 0, col = this.game?.board.length - 1;
      row < this.game?.board.length;
      row += 1, col -= 1
    ) {
      if (this.game?.board[row][col] === player) {
        count += 1;
      } else {
        break;
      }
      if (count === this.game?.board.length) {
        return true;
      }
    }
    return false;
  }

  checkVictory(player: Number): Boolean {
    return (
      this.checkHorizontal(player) ||
      this.checkVertical(player) ||
      this.checkDiagonal(player)
    );
  }
}
