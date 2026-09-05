// storage.js
// Capa simple de persistencia usando localStorage.
// Cada entidad (diseños, tatuadores, clientes, citas) se guarda bajo su propia llave.

export function getAll(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAll(key, records) {
  localStorage.setItem(key, JSON.stringify(records));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Carga datos de ejemplo la primera vez que se abre la app, para que no
// se vea vacía. Solo se ejecuta si la llave todavía no existe.
export function seedIfEmpty(key, seedRecords) {
  if (localStorage.getItem(key) === null) {
    saveAll(key, seedRecords);
  }
}