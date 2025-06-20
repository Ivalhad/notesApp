import { showLoading, hideLoading } from '../services/loading-service.js';

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
    this._onAdd = this._onAdd.bind(this);
  }
  connectedCallback() {
    this.render();
    this.fetchAndRenderNotes();
    // Listen for add event globally since note-input is sibling
    document.addEventListener('note-add-requested', this._onAdd);
    // Delete, archive, unarchive events bubble from children
    this.addEventListener('note-delete-requested', async (e) => {
      const { id } = e.detail;
      await this.deleteNoteAPI(id);
      await this.fetchAndRenderNotes();
    });
    this.addEventListener('note-archive-requested', async (e) => {
      const { id } = e.detail;
      await this.archiveNoteAPI(id);
      await this.fetchAndRenderNotes();
    });
    this.addEventListener('note-unarchive-requested', async (e) => {
      const { id } = e.detail;
      await this.unarchiveNoteAPI(id);
      await this.fetchAndRenderNotes();
    });
  }
  disconnectedCallback() {
    document.removeEventListener('note-add-requested', this._onAdd);
  }
  async _onAdd(e) {
    const { title, body } = e.detail;
    await this.createNoteAPI({ title, body });
    await this.fetchAndRenderNotes();
  }
  render() {
    // Create container
    this.innerHTML = `
      <div class="note-list-container">
        <ul></ul>
      </div>
    `;
  }
  async fetchAndRenderNotes() {
    showLoading();
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      const resJson = await response.json();
      if (resJson.status === 'success') {
        this.notes = resJson.data;
      } else {
        console.error('Failed to fetch notes', resJson.message);
        this.notes = [];
      }
    } catch (error) {
      console.error('Error fetching notes', error);
      this.notes = [];
    } finally {
      hideLoading();
    }
    this.updateList();
  }
  updateList() {
    const ul = this.querySelector('ul');
    ul.innerHTML = '';
    this.notes.forEach(note => {
      const noteItem = document.createElement('note-item');
      noteItem.note = note;
      ul.appendChild(noteItem);
    });
  }
  async createNoteAPI({ title, body }) {
    showLoading();
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
      });
      const resJson = await response.json();
      if (resJson.status !== 'success') {
        alert('Failed to create note: ' + resJson.message);
      }
    } catch (error) {
      console.error('Error creating note', error);
      alert('Error creating note: ' + error.message);
    } finally {
      hideLoading();
    }
  }
  async deleteNoteAPI(id) {
    showLoading();
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, { method: 'DELETE' });
      const resJson = await response.json();
      if (resJson.status !== 'success') {
        alert('Failed to delete note: ' + resJson.message);
      }
    } catch (error) {
      console.error('Error deleting note', error);
      alert('Error deleting note: ' + error.message);
    } finally {
      hideLoading();
    }
  }
  async archiveNoteAPI(id) {
    showLoading();
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/archive`, { method: 'POST' });
      const resJson = await response.json();
      if (resJson.status !== 'success') {
        alert('Failed to archive note: ' + resJson.message);
      }
    } catch (error) {
      console.error('Error archiving note', error);
      alert('Error archiving note: ' + error.message);
    } finally {
      hideLoading();
    }
  }
  async unarchiveNoteAPI(id) {
    showLoading();
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`, { method: 'POST' });
      const resJson = await response.json();
      if (resJson.status !== 'success') {
        alert('Failed to unarchive note: ' + resJson.message);
      }
    } catch (error) {
      console.error('Error unarchiving note', error);
      alert('Error unarchiving note: ' + error.message);
    } finally {
      hideLoading();
    }
  }
}
customElements.define('note-list', NoteList);