import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { Referee } from './helper/referee.js';

import './common/cell.js';
import './common/modalDialog.js';

import { Game } from './model/game.js';

@customElement('tic-tac-toe')
class TicTacToe extends LitElement {

  static styles = css`
      :host {
        --board-bg-color: #e5d6c2;
      }
      .board {
        width: 540px;
        height: 540px;
        padding: 20px;
        background: var(--board-bg-color);
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
        border-radius: 13px;
      }
  `;

  @property({ type: Object }) game?: Game;

  constructor() {
    super();

    this.initGame();

    this.addEventListener('player-win', (e: Event) => {
      const modal = this.shadowRoot?.querySelector('modal-dialog');
      if(modal){
          modal.open = true;
          modal.title = 'Congratulations 🎉';
          modal.text = `Player ${(e as CustomEvent).detail.player} has won!`;
      }
    });

    this.addEventListener('tie', () => {
      const modal = this.shadowRoot?.querySelector('modal-dialog');
      if(modal){
          modal.open = true;
          modal.title = 'mmh';
          modal.text = `It seems i'ts a tie 🤨`;
      }
    });
  }

  initGame() {
    if(this.game){
        this.game.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
          ];
        this.game.turn = 1;
        this.game.currentPlayer = 1;
        this.game.plays = { 1: 0, 2: 0 };
    }
  }

  _handleClick(e: Event) {
    if (this.game?.board[e.target.row][e.target.col] !== 0) {
      return;
    }

    e.target.symbol = this.game?.currentPlayer === 1 ? 'cross' : 'circle';

    this.game.board[e.target.row][e.target.col] = this.game?.currentPlayer;
    this.game.plays[this.game.currentPlayer]+=1;
    if (Referee.checkVictory(this.game?.currentPlayer)) {
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('player-win', {
          detail: {
            player: this.game?.currentPlayer
          }
        }));
      }, 500)
    } else if (this.game?.plays[1] + this.game?.plays[2] === 9) {
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('tie'));
      }, 500);
    } else {
      this.game?.turn+=1;
      this.changePlayer();
    }
  }

  _resetGame() {
    this._resetTiles();
    this.initGame();
  }

  _resetTiles() {
    const children = this.shadowRoot?.querySelectorAll('tic-tac-toe-cell');
    children?.forEach(cell => {
      cell.symbol = '';
    });
  }

  changePlayer() {
    if(this.game){
      this.game.currentPlayer = this.game?.currentPlayer === 1 ? 2 : 1;
    }
  }

  // checkHorizontal(player: Number) {
  //   for (let row = 0; row < this.game?.board.length; row+=1) {
  //     let count = 0;
  //     for (let col = 0; col < this.game?.board.length; col+=1) {
  //       if (this.game?.board[row][col] === player) {
  //         count+=1;
  //       } else {
  //         break;
  //       }

  //       if (count === this.game?.board.length) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  // checkVertical(player: Number) {
  //   for (let col = 0; col < this.game?.board.length; col+=1) {
  //     let count = 0;
  //     for (let row = 0; row < this.game?.board.length; row+=1) {
  //       if (this.game?.board[row][col] === player) {
  //         count +=1;
  //       } else {
  //         break;
  //       }

  //       if (count === this.game?.board.length) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  // checkDiagonal(player: Number) {
  //   let count = 0
  //   for (let row = 0, col = 0; row < this.game?.board.length; row+=1, col+=1) {
  //     if (this.game?.board[row][col] === player) {
  //       count+=1;
  //     } else {
  //       break;
  //     }
  //     if (count === this.game?.board.length) {
  //       return true;
  //     }
  //   }
  //   count = 0;
  //   for (let row = 0, col = this.game?.board.length - 1;
  //         row < this.game?.board.length; row+=1, col-=1) {
  //     if (this.game?.board[row][col] === player) {
  //       count+=1;
  //     } else {
  //       break;
  //     }
  //     if (count === this.game?.board.length) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // checkVictory(player: Number) {
  //   return this.checkHorizontal(player)
  //       || this.checkVertical(player)
  //       || this.checkDiagonal(player);
  // }

  render() {
    return html`
    <modal-dialog @button-click="${this._resetGame}"></modal-dialog>
    <div class="board">
        ${this.game?.board.map((row, rowIndex) =>
          row.map((_col: any, colIndex: number) =>
            html`
              <tic-tac-toe-cell
                .symbol=''
                .col=${colIndex}
                .row=${rowIndex}
                @click="${this._handleClick}"
              >
              </tic-tac-toe-cell>`
          ))}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tic-tac-toe": TicTacToe,
  }
}
