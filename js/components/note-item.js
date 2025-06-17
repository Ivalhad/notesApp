import { formatDate } from '../utils.js';
const templateItem = document.createElement('template');
templateItem.innerHTML = `
<style>
  .card {
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .header {
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
  p {
    flex: 1;
    margin: 0.5rem 0;
    white-space: pre-wrap;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }
  button {
    padding: 0.3rem 0.6rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .btn-archive {
    background-color: #03a9f4;
    color: white;
  }
  .btn-delete {
    background-color: #f44336;
    color: white;
  }
</style>
<div class="card">
  <div class="header">
    <h2></h2>
  </div>
  <p></p>
  <div class="footer">
    <span class="date"></span>
    <div class="actions">
      <button class="btn-archive"></button>
      <button class="btn-delete">Delete</button>
    </div>
  </div>
</div>
`;
class NoteItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateItem.content.cloneNode(true));
    this.titleElem = shadow.querySelector('h2');
    this.bodyElem = shadow.querySelector('p');
    this.dateElem = shadow.querySelector('.date');
    this.btnArchive = shadow.querySelector('.btn-archive');
    this.btnDelete = shadow.querySelector('.btn-delete');
  }
  set note(data) {
    this._data = data;
    this._render();
  }
  get note() {
    return this._data;
  }
  _render() {
    const { id, title, body, createdAt, archived } = this._data;
    this.titleElem.textContent = title;
    this.bodyElem.textContent = body;
    this.dateElem.textContent = formatDate(createdAt);
    this.btnArchive.textContent = archived ? 'Unarchive' : 'Archive';
    this.btnArchive.onclick = () => {
      this.dispatchEvent(new CustomEvent('note-toggle-archive', {
        detail: { id }, bubbles: true, composed: true
      }));
    };
    this.btnDelete.onclick = () => {
      this.dispatchEvent(new CustomEvent('note-delete', {
        detail: { id }, bubbles: true, composed: true
      }));
    };
  }
  connectedCallback() {
    // if note sudah diset sebelum connected, render
    if (this._data) this._render();
  }
}
customElements.define('note-item', NoteItem);