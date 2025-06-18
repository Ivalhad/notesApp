const templateNoteInput = document.getElementById('template-note-input');
class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.onAddClick = this.onAddClick.bind(this);
  }
  connectedCallback() {
    this.innerHTML = '';
    this.appendChild(templateNoteInput.content.cloneNode(true));
    this.titleInput = this.querySelector('.note-title-input');
    this.contentInput = this.querySelector('.note-content-input');
    this.addButton = this.querySelector('.note-add-button');
    this.addButton.addEventListener('click', this.onAddClick);
  }
  disconnectedCallback() {
    this.addButton.removeEventListener('click', this.onAddClick);
  }
  onAddClick() {
    const title = this.titleInput.value.trim();
    const content = this.contentInput.value.trim();
    if (!title && !content) return;
    const event = new CustomEvent('note-added', {
      detail: { title, content },
      bubbles: true
    });
    this.dispatchEvent(event);
    this.titleInput.value = '';
    this.contentInput.value = '';
  }
}
customElements.define('note-input', NoteInput);
