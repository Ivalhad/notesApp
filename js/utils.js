export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
export function generateId() {
  return 'notes-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}