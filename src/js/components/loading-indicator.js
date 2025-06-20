class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // Append overlay div
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    overlay.appendChild(spinner);
    this.appendChild(overlay);
  }
}
customElements.define('loading-indicator', LoadingIndicator);