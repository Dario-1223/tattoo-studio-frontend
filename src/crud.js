import { getAll, saveAll, generateId, seedIfEmpty } from "./storage.js";

export function createCRUD(config) {
  const { key, title, fields, seed = [] } = config;
  seedIfEmpty(key, seed);

  let editingId = null;

  function render(container) {
    const records = getAll(key);

    container.innerHTML = `
      <div class="section-head">
        <h2>${title}</h2>
        <span class="count">${records.length} registro(s)</span>
      </div>
      <form class="record-form" id="form-${key}">
        ${fields.map(fieldHTML).join("")}
        <div class="form-actions">
          <button type="submit" class="btn">${editingId ? "Guardar cambios" : "Agregar"}</button>
          ${editingId ? `<button type="button" class="btn btn-ghost" id="cancel-${key}">Cancelar</button>` : ""}
        </div>
      </form>
      ${renderTable(records)}
    `;

    if (editingId) {
      const record = records.find((r) => r.id === editingId);
      if (record) {
        fields.forEach((f) => {
          const input = container.querySelector(`[name="${f.name}"]`);
          if (input) input.value = record[f.name] ?? "";
        });
      }
    }

    container
      .querySelector(`#form-${key}`)
      .addEventListener("submit", (e) => handleSubmit(e, container));

    const cancelBtn = container.querySelector(`#cancel-${key}`);
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        editingId = null;
        render(container);
      });
    }

    container.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        editingId = btn.dataset.edit;
        render(container);
        container.querySelector(`#form-${key}`).scrollIntoView({ behavior: "smooth" });
      });
    });

    container.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.delete;
        const ok = confirm("¿Eliminar este registro? Esta acción no se puede deshacer.");
        if (!ok) return;
        const updated = getAll(key).filter((r) => r.id !== id);
        saveAll(key, updated);
        if (editingId === id) editingId = null;
        render(container);
      });
    });
  }

  function fieldHTML(field) {
    if (field.type === "select") {
      return `
        <div class="field">
          <label for="${key}-${field.name}">${field.label}</label>
          <select id="${key}-${field.name}" name="${field.name}" ${field.required ? "required" : ""}>
            ${field.options.map((opt) => `<option value="${opt}">${opt}</option>`).join("")}
          </select>
        </div>`;
    }
    return `
      <div class="field">
        <label for="${key}-${field.name}">${field.label}</label>
        <input
          id="${key}-${field.name}"
          name="${field.name}"
          type="${field.type || "text"}"
          ${field.required ? "required" : ""}
          ${field.step ? `step="${field.step}"` : ""}
        />
      </div>`;
  }

  function renderTable(records) {
    if (records.length === 0) {
      return `<div class="empty-state">Todavía no hay registros. Agrega el primero arriba.</div>`;
    }
    return `
      <table class="record-table">
        <thead>
          <tr>
            ${fields.map((f) => `<th>${f.label}</th>`).join("")}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${records
            .map(
              (r) => `
            <tr>
              ${fields.map((f) => `<td>${formatCell(r[f.name], f)}</td>`).join("")}
              <td class="row-actions">
                <button class="icon-btn" data-edit="${r.id}">Editar</button>
                <button class="icon-btn danger" data-delete="${r.id}">Eliminar</button>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  function formatCell(value, field) {
    if (value === undefined || value === "") return "—";
    if (field.type === "select") return `<span class="status-pill">${value}</span>`;
    return value;
  }

  function handleSubmit(e, container) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const record = {};
    fields.forEach((f) => {
      record[f.name] = formData.get(f.name)?.toString().trim() ?? "";
    });

    const records = getAll(key);

    if (editingId) {
      const idx = records.findIndex((r) => r.id === editingId);
      if (idx !== -1) records[idx] = { ...records[idx], ...record };
      editingId = null;
    } else {
      records.push({ id: generateId(), ...record });
    }

    saveAll(key, records);
    render(container);
  }

  return { render };
}