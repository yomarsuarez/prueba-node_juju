const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

module.exports = mongoose;
 