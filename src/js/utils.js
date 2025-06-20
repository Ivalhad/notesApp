export function generateId() {
  return `notes-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString();
}