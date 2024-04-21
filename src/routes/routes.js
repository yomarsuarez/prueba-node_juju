const express = require("express");
const router = express.Router();
const LibroController = require("../controllers/LibroController");
const AuthController = require("../controllers/AuthController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/../public/index.html");
});

router.post("/api/librosCrear", authenticateJWT, LibroController.crearLibro);
router.get("/api/libros", LibroController.obtenerLibros);
router.get("/api/libros/:id", LibroController.obtenerLibroPorId);
router.put("/api/libros/:id", authenticateJWT, LibroController.actualizarLibro);

router.delete(
  "/api/libros/:id",
  authenticateJWT,
  LibroController.eliminarLibro
);

router.post("/api/login", AuthController.login);

module.exports = router;
