import { createCRUD } from "../crud.js";

export const citasCRUD = createCRUD({
  key: "tf_citas",
  title: "Citas",
  fields: [
    { name: "cliente", label: "Cliente", type: "text", required: true },
    { name: "tatuador", label: "Tatuador", type: "text", required: true },
    { name: "fecha", label: "Fecha", type: "date", required: true },
    { name: "hora", label: "Hora", type: "time" },
    { name: "estado", label: "Estado", type: "select", options: ["Programada", "Realizada", "Cancelada"] },
  ],
  seed: [
    {
      id: "seed-a1",
      cliente: "Juan Pérez",
      tatuador: "Camila Ruiz",
      fecha: "2026-09-20",
      hora: "15:00",
      estado: "Programada",
    },
  ],
});