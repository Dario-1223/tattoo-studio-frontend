import "./style.css";
import { disenosCRUD } from "./modules/disenos.js";
import { tatuadoresCRUD } from "./modules/tatuadores.js";
import { clientesCRUD } from "./modules/clientes.js";
import { citasCRUD } from "./modules/citas.js";

const sections = [
  { id: "disenos", label: "Diseños", crud: disenosCRUD },
  { id: "tatuadores", label: "Tatuadores", crud: tatuadoresCRUD },
  { id: "clientes", label: "Clientes", crud: clientesCRUD },
  { id: "citas", label: "Citas", crud: citasCRUD },
];

const tabsEl = document.getElementById("tabs");
const panelEl = document.getElementById("panel");

let activeId = sections[0].id;

function renderTabs() {
  tabsEl.innerHTML = sections
    .map(
      (s) => `
      <button class="tab-btn ${s.id === activeId ? "is-active" : ""}" data-tab="${s.id}">
        ${s.label}
      </button>`
    )
    .join("");

  tabsEl.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeId = btn.dataset.tab;
      renderTabs();
      renderPanel();
    });
  });
}

function renderPanel() {
  const section = sections.find((s) => s.id === activeId);
  section.crud.render(panelEl);
}

renderTabs();
renderPanel();