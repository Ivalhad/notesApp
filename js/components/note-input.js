import { generateId } from '../utils.js';
const templateInput = document.createElement('template');
templateInput.innerHTML = `
<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
  }
  button {
    align-self: flex-end;
    padding: 0.5rem 1rem;
    background-color: #6200ee;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
</style>
<form>
  <input type="text" name="title" placeholder="Title" required />
  <textarea name="body" rows="4" placeholder="Write your note here..." required></textarea>
  <button type="submit">Add Note</button>
</form>
`;
class NoteInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateInput.content.cloneNode(true));
    this.form = shadow.querySelector('form');
    this.inputTitle = shadow.querySelector('input[name="title"]');
    this.inputBody = shadow.querySelector('textarea[name="body"]');
  }
  connectedCallback() {
    this.form.addEventListener('submit', this._onSubmit.bind(this));
  }
  disconnectedCallback() {
    this.form.removeEventListener('submit', this._onSubmit.bind(this));
  }
  _onSubmit(e) {
    e.preventDefault();
    const title = this.inputTitle.value.trim();
    const body = this.inputBody.value.trim();
    if (!title || !body) return;
    const detail = {
      id: generateId(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    this.dispatchEvent(new CustomEvent('note-add', { detail, bubbles: true, composed: true }));
    this.form.reset();
  }
}
customElements.define('note-input', NoteInput);