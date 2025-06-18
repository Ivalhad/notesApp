// js/components/note-item.js
import { formatDate } from '../utils.js';
const templateNoteItem = document.getElementById('template-note-item');
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  connectedCallback() {
    this.innerHTML = '';
    this.appendChild(templateNoteItem.content.cloneNode(true));
    this.idValue = this.getAttribute('data-id') || '';
    const title = this.getAttribute('data-title') || '';
    const content = this.getAttribute('data-content') || '';
    const date = this.getAttribute('data-date') || '';
    this.querySelector('.note-item-title').textContent = title;
    this.querySelector('.note-item-date').textContent = formatDate(date);
    this.querySelector('.note-item-content').textContent = content;
    this.deleteButton = this.querySelector('.note-delete-button');
    this.deleteButton.addEventListener('click', this.onDeleteClick);
  }
  disconnectedCallback() {
    if (this.deleteButton) {
      this.deleteButton.removeEventListener('click', this.onDeleteClick);
    }
  }
  onDeleteClick() {
    const evt = new CustomEvent('note-deleted', {
      detail: { id: this.idValue },
      bubbles: true
    });
    this.dispatchEvent(evt);
  }
}
customElements.define('note-item', NoteItem);
