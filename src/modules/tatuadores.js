import { createCRUD } from "../crud.js";

export const tatuadoresCRUD = createCRUD({
  key: "tf_tatuadores",
  title: "Tatuadores",
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "especialidad", label: "Especialidad", type: "text", required: true },
    { name: "telefono", label: "Teléfono", type: "text" },
    { name: "estado", label: "Estado", type: "select", options: ["Activo", "Inactivo"] },
  ],
  seed: [
    { id: "seed-t1", nombre: "Camila Ruiz", especialidad: "Realismo", telefono: "3001234567", estado: "Activo" },
  ],
});