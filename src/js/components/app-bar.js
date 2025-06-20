class AppBar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const container = document.createElement('header');
    container.className = 'app-bar-container';
    container.innerHTML = `<h1>Notes App</h1>`;
    this.appendChild(container);
  }
}
customElements.define('app-bar', AppBar);