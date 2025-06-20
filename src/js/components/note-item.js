import { formatDate } from '../utils.js';

class NoteItem extends HTMLElement {
  constructor() {
    super();
  }
  set note(data) {
    this._note = data;
    this.render();
  }
  get note() {
    return this._note;
  }
  render() {
    const { id, title, body, createdAt, archived } = this._note;
    const li = document.createElement('li');
    li.className = 'note-list-item';
    // Title
    const titleDiv = document.createElement('div');
    titleDiv.className = 'note-title';
    titleDiv.textContent = title;
    // Body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'note-body';
    bodyDiv.textContent = body;
    // Meta
    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';
    metaDiv.textContent = formatDate(createdAt);
    // Actions
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'note-actions';
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('note-delete-requested', { detail: { id }, bubbles: true, composed: true }));
    });
    actionsDiv.appendChild(deleteBtn);
    // Archive/Unarchive button
    const archiveBtn = document.createElement('button');
    if (archived) {
      archiveBtn.textContent = 'Unarchive';
      archiveBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('note-unarchive-requested', { detail: { id }, bubbles: true, composed: true }));
      });
    } else {
      archiveBtn.textContent = 'Archive';
      archiveBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('note-archive-requested', { detail: { id }, bubbles: true, composed: true }));
      });
    }
    actionsDiv.appendChild(archiveBtn);
    // View button (if needed)
    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View';
    viewBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('note-view-requested', { detail: { id }, bubbles: true, composed: true }));
    });
    actionsDiv.appendChild(viewBtn);
    // Assemble
    li.appendChild(titleDiv);
    li.appendChild(bodyDiv);
    li.appendChild(metaDiv);
    li.appendChild(actionsDiv);
    // Clear existing content and append
    this.innerHTML = '';
    this.appendChild(li);
  }
}
customElements.define('note-item', NoteItem);