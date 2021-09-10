import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('tic-tac-toe-cell')
export class TicTacToeCell extends LitElement {
  @property({ type: String })
  symbol = '';

  @property({ type: Number })
  col = 0;

  @property({ type: Number })
  row = 0;

  constructor() {
    super();
    this.symbol = '';
  }

  static get styles() {
    return css`
      :host {
        --box-bg-color: #fefef0;

        width: 175px;
        height: 175px;
        background: var(--box-bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cross {
        background: rgb(71, 69, 78);
        height: 100px;
        position: relative;
        width: 10px;
        transform: rotate(45deg);
        border-radius: 30px;
      }
      .cross:after {
        background: rgb(71, 69, 78);
        content: '';
        height: 10px;
        left: -45px;
        position: absolute;
        top: 45px;
        width: 100px;
        border-radius: 30px;
      }
      .circle {
        background: transparent;
        border: 10px solid rgb(184, 64, 57);
        width: 75px;
        height: 70px;
        border-radius: 50%;
      }
    `;
  }

  render() {
    return html` <div class="${this.symbol}"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tic-tac-toe-cell': TicTacToeCell;
  }
}
