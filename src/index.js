require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usuarioRoutes = require("./routes/usuario");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa a MongoDB Atlas"))
  .catch((error) => console.error("Error de conexión:", error.message));

app.use("/api", usuarioRoutes);

app.get("/", (req, res) => res.json({ message: "API de Usuarios funcionando" }));

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
