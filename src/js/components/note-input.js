class NoteInput extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
    this.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const titleEl = this.querySelector('#title');
      const bodyEl = this.querySelector('#body');
      const title = titleEl.value.trim();
      const body = bodyEl.value.trim();
      if (!title || !body) {
        alert('Title and body cannot be empty');
        return;
      }
      const event = new CustomEvent('note-add-requested', {
        detail: { title, body },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
      titleEl.value = '';
      bodyEl.value = '';
    });
  }
  render() {
    this.innerHTML = `
      <div class="note-input-container">
        <form>
          <input type="text" id="title" placeholder="Note title" required />
          <textarea id="body" placeholder="Note body" rows="4" required></textarea>
          <button type="submit">Add Note</button>
        </form>
      </div>
    `;
  }
}
customElements.define('note-input', NoteInput);