class LoadingService {
  static loadingCount = 0;
  static showLoading() {
    LoadingService.loadingCount++;
    if (LoadingService.loadingCount === 1) {
      const loadingEl = document.createElement('loading-indicator');
      loadingEl.id = 'global-loading-indicator';
      document.body.appendChild(loadingEl);
    }
  }
  static hideLoading() {
    if (LoadingService.loadingCount > 0) LoadingService.loadingCount--;
    if (LoadingService.loadingCount === 0) {
      const loadingEl = document.getElementById('global-loading-indicator');
      if (loadingEl) document.body.removeChild(loadingEl);
    }
  }
}
export const showLoading = LoadingService.showLoading;
export const hideLoading = LoadingService.hideLoading;