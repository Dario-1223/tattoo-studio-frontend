import { createCRUD } from "../crud.js";

export const disenosCRUD = createCRUD({
  key: "tf_disenos",
  title: "Diseños",
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "estilo", label: "Estilo", type: "text", required: true },
    { name: "precio", label: "Precio (COP)", type: "number", step: "1000" },
    { name: "estado", label: "Estado", type: "select", options: ["Disponible", "Agotado"] },
  ],
  seed: [
    { id: "seed-d1", nombre: "Serpiente enredada", estilo: "Blackwork", precio: "180000", estado: "Disponible" },
    { id: "seed-d2", nombre: "Rosa tradicional", estilo: "Old School", precio: "150000", estado: "Disponible" },
  ],
});