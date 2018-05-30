import { LitElement, html } from "@polymer/lit-element/lit-element.js";

const DELAY = 2000;

class PopupWindow extends LitElement {
  static get properties() {
    return {
      showed: Boolean,
      message: String,
      timeout: Object
    }
  }

  constructor() {
    super();
    this.showed = false;
    this.message = "";
  }

  show(message) {
    if (!this.showed) {
      this.showed = true;
      this.message = message;
      return new Promise(resolve => {
        this.timeout = window.setTimeout(() => {
          this.hide();
          resolve();
        }, DELAY);
      });
    }
  }

  hide() {
    if (this.showed) {
      this.showed = false;
      this.message = "";
      this._clearTimeout();
    }
  }

  _clearTimeout() {
    window.clearTimeout(this.timeout);
    this.timeout = null;
  }

  _render(props) {
    const divClass = props.showed ? "Popup--showed" : "Popup--hidden";
    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        .Popup {
          position: fixed;
          right: 0;
          top: 0;
          padding: 1rem 2rem;
          margin: 3rem;
          background-color: linen;
          box-shadow: 0 1px 8px 0 grey;
          border-radius: 0.5rem;
        }
        .Popup--hidden {
          opacity: 0;
        }
      </style>
      <div className="Popup ${divClass}">
        ${props.message}
      </div>
    `;
  }
}

customElements.define("popup-window", PopupWindow);