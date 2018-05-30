import { LitElement, html } from "@polymer/lit-element/lit-element.js";
import * as Api from "../../services/api.js";
import "./feed-header.js";
import "./feed-item.js";

class FeedPage extends LitElement {
  static get properties() {
    return {
      feeds: Array,
      name: String,
      avatarUrl: String,
      disabled: Boolean
    }
  }

  constructor() {
    super();
    this.feeds = [];
    this.name = "Tom Fales";
    this.avatarUrl = "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-1/c0.109.534.534/s160x160/32169195_982289325267933_4089148103783874560_n.jpg?_nc_cat=0&oh=6af1ad21c837cb780da44b2a70588d57&oe=5B77E192";
    this.disabled = false;
  }

  _firstRendered() {
    Api.fetchFeeds().then(resp => {
      this.feeds = resp;
    });
  }

  addFeed(feed) {
    return Api.addFeed(feed).then(resp => {
      this.feeds = [resp].concat(this.feeds);
      this.fire("popup-show", `User ${resp.name} posted a message: ${resp.post}`);
    });
  }

  editFeed(feed) {
    return Api.editFeed(feed).then(resp => {
      const newFeeds = this.feeds.slice();
      const editedId = newFeeds.findIndex(entry => entry.id === feed.id);
      newFeeds[editedId] = feed;
      this.feeds = newFeeds;
    });
  }

  removeFeed(id) {
    return Api.removeFeed(id).then(() => {
      const newFeeds = this.feeds.slice();
      const editedId = newFeeds.findIndex(entry => entry.id === id);
      newFeeds.splice(editedId, 1);
      this.feeds = newFeeds;
    });
  }

  _render(props) {
    const feeds = props.feeds.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      } else {
        return 1;
      }
    }).map(feed => {
    return html`
      <li>
        <feed-item
          uId="${feed.id}"
          name="${feed.name}"
          avatarUrl="${feed.avatarUrl}"
          post="${feed.post}"
          editFeed="${this.editFeed.bind(this)}"
          removeFeed="${this.removeFeed.bind(this)}">
        </feed-item>
      </li>
    `;
    });

    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        .Feeds__container {
          padding: 2rem 3rem 0;
          list-style: none;
        }
      </style>
      <div class="container">
        <feed-header
          name="${props.name}"
          avatarUrl="${props.avatarUrl}"
          addFeed="${this.addFeed.bind(this)}">
        </feed-header>
        <ul class="Feeds__container">${feeds}</ul>
      </div>
    `;
  }

  fire(name, detail) {
    return this.dispatchEvent(new CustomEvent(name, {
      composed: true,
      bubbles: true,
      detail
    }));
  }
}

customElements.define("feed-page", FeedPage);