// utils.js
export function generateId() {
  // ID sederhana: timestamp + random
  return 'note-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5);
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  if (isNaN(date)) return '';
  // Format lokal Indonesia, misal: 18 Juni 2025, 13:45
  return date.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) + ', ' + date.toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit'
  });
}
