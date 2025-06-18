// js/components/app-bar.js
const templateAppBar = document.getElementById('template-app-bar');
class AppBar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = '';
    this.appendChild(templateAppBar.content.cloneNode(true));
  }
}
customElements.define('app-bar', AppBar);
