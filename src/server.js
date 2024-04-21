const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
//const specs = require("./config/swaggerConfig");
const specs = require("./routes/swagger");
const routes = require("./routes/routes");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("./src/public"));

app.use(routes);

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
