const templateNoteList = document.getElementById('template-note-list');
class NoteList extends HTMLElement {
  constructor() {
    super();
    this.removeHandler = this.removeHandler.bind(this);
  }
  connectedCallback() {
    this.innerHTML = '';
    this.appendChild(templateNoteList.content.cloneNode(true));
    this.container = this.querySelector('.note-list-container');

    this.addEventListener('note-deleted', this.removeHandler);
  }
  disconnectedCallback() {
    this.removeEventListener('note-deleted', this.removeHandler);
  }
  addNote(note) {

    const itemElem = document.createElement('note-item');
    itemElem.setAttribute('data-id', note.id);
    itemElem.setAttribute('data-title', note.title);
    itemElem.setAttribute('data-content', note.content);
    itemElem.setAttribute('data-date', note.date);
    this.container.appendChild(itemElem);
  }
  removeHandler(e) {
    const { id } = e.detail;
    const items = Array.from(this.container.querySelectorAll('note-item'));
    for (const item of items) {
      if (item.getAttribute('data-id') === id) {
        this.container.removeChild(item);
        break;
      }
    }
  }
}
customElements.define('note-list', NoteList);
