const templateAppBar = document.createElement('template');
templateAppBar.innerHTML = `
<style>
  header {
    background-color: #6200ee;
    color: white;
    padding: 1rem;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  h1 {
    font-size: 1.5rem;
  }
</style>
<header>
  <h1>Notes App</h1>
</header>
`;
class AppBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateAppBar.content.cloneNode(true));
  }
}
customElements.define('app-bar', AppBar);