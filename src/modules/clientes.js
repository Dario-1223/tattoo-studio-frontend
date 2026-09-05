import { createCRUD } from "../crud.js";

export const clientesCRUD = createCRUD({
  key: "tf_clientes",
  title: "Clientes",
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "telefono", label: "Teléfono", type: "text" },
    { name: "email", label: "Correo", type: "email" },
  ],
  seed: [
    { id: "seed-c1", nombre: "Juan Pérez", telefono: "3109876543", email: "juan.perez@correo.com" },
  ],
});