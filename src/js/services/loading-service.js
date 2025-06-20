import '../components/loading-indicator';
let loadingCount = 0;
export function showLoading() {
  loadingCount++;
  if (loadingCount === 1) {
    const loadingEl = document.createElement('loading-indicator');
    loadingEl.id = 'global-loading-indicator';
    document.body.appendChild(loadingEl);
  }
}
export function hideLoading() {
  if (loadingCount > 0) loadingCount--;
  if (loadingCount === 0) {
    const loadingEl = document.getElementById('global-loading-indicator');
    if (loadingEl) document.body.removeChild(loadingEl);
  }
}