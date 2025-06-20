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

    const titleDiv = document.createElement('div');
    titleDiv.className = 'note-title';
    titleDiv.textContent = title;

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'note-body';
    bodyDiv.textContent = body;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';
    metaDiv.textContent = formatDate(createdAt);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'note-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.className = 'delete-button';
    deleteBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('note-delete-requested', { detail: { id }, bubbles: true, composed: true }));
    });
    actionsDiv.appendChild(deleteBtn);

    const archiveBtn = document.createElement('button');
    if (archived) {
      archiveBtn.textContent = 'Unarchive';
      archiveBtn.className = 'unarchive-button';
      archiveBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('note-unarchive-requested', { detail: { id }, bubbles: true, composed: true }));
      });
    } else {
      archiveBtn.textContent = 'Archive';
      archiveBtn.className = 'archive-button';
      archiveBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('note-archive-requested', { detail: { id }, bubbles: true, composed: true }));
      });
    }
    actionsDiv.appendChild(archiveBtn);

    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View';
    viewBtn.className = 'view-button';
    viewBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('note-view-requested', { detail: { id }, bubbles: true, composed: true }));
    });
    actionsDiv.appendChild(viewBtn);

    li.appendChild(titleDiv);
    li.appendChild(bodyDiv);
    li.appendChild(metaDiv);
    li.appendChild(actionsDiv);

    this.innerHTML = '';
    this.appendChild(li);
  }
}
customElements.define('note-item', NoteItem);