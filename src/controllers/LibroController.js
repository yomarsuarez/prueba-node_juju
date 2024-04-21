const Libro = require("../models/Libro");

const LibroController = {
  async crearLibro(req, res) {
    try {
      const nuevoLibro = await Libro.create(req.body);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear libro" });
    }
  },

  async obtenerLibros(req, res) {
    try {
      const libros = await Libro.find();
      res.status(200).json(libros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener libros" });
    }
  },

  async obtenerLibroPorId(req, res) {
    const { id } = req.params;
    try {
      const libro = await Libro.findById(id);
      if (!libro) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      res.status(200).json(libro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener libro por ID" });
    }
  },

  async actualizarLibro(req, res) {
    const { id } = req.params;
    try {
      const libro = await Libro.findByIdAndUpdate(id, req.body, { new: true });
      if (!libro) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      res.status(200).json(libro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar libro" });
    }
  },

  async eliminarLibro(req, res) {
    const { id } = req.params;
    try {
      const libro = await Libro.findByIdAndDelete(id);
      if (!libro) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar libro" });
    }
  },
};

module.exports = LibroController;
