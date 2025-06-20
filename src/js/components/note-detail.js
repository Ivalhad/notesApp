import { formatDate } from '../utils.js';
import { hideLoading, showLoading } from '../services/loading-service.js';

class NoteDetail extends HTMLElement {
  constructor() {
    super();
    this._noteId = null;
    this._overlay = null;
  }
  set noteId(id) {
    this._noteId = id;
    this.fetchAndShowDetail();
  }
  connectedCallback() {

  }
  disconnectedCallback() {

  }
  async fetchAndShowDetail() {
    if (!this._noteId) return;
    showLoading();
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${this._noteId}`);
      const resJson = await response.json();
      if (resJson.status === 'success') {
        this.renderDetail(resJson.data);
      } else {
        console.error('Failed to fetch note detail', resJson.message);
        alert('Gagal memuat detail catatan: ' + resJson.message);
        this.remove();
      }
    } catch (error) {
      console.error('Error fetching note detail', error);
      alert('Error fetching note detail: ' + error.message);
      this.remove();
    } finally {
      hideLoading();
    }
  }
  renderDetail(data) {

    this._overlay = document.createElement('div');
    this._overlay.className = 'note-detail-overlay';
    const content = document.createElement('div');
    content.className = 'note-detail-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-button';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => this.close());
    content.appendChild(closeBtn);

    const titleEl = document.createElement('h2');
    titleEl.textContent = data.title;
    content.appendChild(titleEl);

    const metaEl = document.createElement('div');
    metaEl.className = 'note-meta';
    metaEl.textContent = formatDate(data.createdAt);
    content.appendChild(metaEl);
 
    const bodyEl = document.createElement('p');
    bodyEl.textContent = data.body;
    content.appendChild(bodyEl);
    this._overlay.appendChild(content);
    document.body.appendChild(this._overlay);
  }
  close() {
    if (this._overlay) {
      document.body.removeChild(this._overlay);
      this._overlay = null;
      this.remove();
    }
  }
}
customElements.define('note-detail', NoteDetail);