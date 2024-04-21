const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/prueba_bots";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

module.exports = mongoose;
 