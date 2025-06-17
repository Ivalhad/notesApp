const templateList = document.createElement('template');
templateList.innerHTML = `
<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>
<div class="grid-container"></div>
`;
class NoteList extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateList.content.cloneNode(true));
    this.container = shadow.querySelector('.grid-container');
  }
  set notes(dataArray) {
    this._notes = dataArray;
    this._render();
  }
  get notes() {
    return this._notes;
  }
  _render() {
    this.container.innerHTML = '';
    // Hanya tampilkan yang belum di-archive
    const activeNotes = this._notes.filter(n => !n.archived);
    if (activeNotes.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = 'No notes available.';
      this.container.appendChild(emptyMsg);
      return;
    }
    activeNotes.forEach(noteData => {
      const item = document.createElement('note-item');
      item.note = noteData;
      this.container.appendChild(item);
    });
  }
}
customElements.define('note-list', NoteList);