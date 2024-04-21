const mongoose = require("../config/mongoose");

const libroSchema = new mongoose.Schema({
  Titulo: { type: String, required: true },
  Autor: { type: String, required: true },
  AnioPublicacion: { type: Number, required: true },
  Estado: { type: Number, required: true },
});

const Libro = mongoose.model("Libro", libroSchema);

module.exports = Libro;
