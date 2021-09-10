import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from "lit-html/directives/class-map";

@customElement('modal-dialog')
export class ModalDialog extends LitElement {

  @property({ type: Boolean })
  open = false;

  @property({ type: String })
  title = '';

  @property({ type: String })
  text = '';

  @property({ type: String })
  clickAction = '';

  constructor() {
    super();
    this.open = false;
  }

  static get styles() {
    return css`
      :host {
        font-family: Arial, Helvetica, sans-serif;
      }
      .wrapper {
        opacity: 0;
        position: absolute;
        z-index: 10;
        transition: opacity 0.25s ease-in;
      }
      .wrapper:not(.open) {
        visibility: hidden;
      }
      .wrapper.open {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 580px;
        height: 580px;
        opacity: 1;
        visibility: visible;
      }
      .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100%;
        width: 100%;
        position: relative;
      }
      .dialog {
        background: #ffffff;
        border-radius: 13px;
        max-width: 600px;
        padding: 1rem;
        position: absolute;
      }
      .dialog h1 {
        margin: 0 0 10px;
      }
      .dialog button {
        background-color: #d81e5b;
        color: white;
        width: 100%;
        font-size: 16px;
        padding: 15px 32px;
        border: none;
        border-radius: 10px;
        text-decoration: none;
        display: inline-block;
        margin-top: 10px;
      }`;
  }

  _handleClose() {
    this.open = false;
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent('button-click'));
    this._handleClose();
  }

  render() {
    // <div class="overlay" @click="${this._handleClose}" @keyup="${this._handleClose}"></div>

    return html`
      <div class="${classMap({ wrapper: true, open: this.open })}">
        <div class="overlay" @keyup="${this._handleClose}"></div>
        <div class="dialog">
          <h1 id="title">${this.title}</h1>
          <div id="content" class="content">${this.text}</div>
          <button @click=${this._handleClick}>${this.clickAction}</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "modal-dialog": ModalDialog,
  }
}
