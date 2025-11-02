require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Importar rutas
const usuarioRoutes = require("./routes/usuario");
const eventoRoutes = require("./routes/evento");
const inscripcionRoutes = require("./routes/inscripcion");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conexión exitosa a MongoDB Atlas"))
  .catch((error) => console.error("❌ Error de conexión:", error.message));

// Rutas base de la API
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/inscripciones", inscripcionRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ mensaje: "🚀 API KonEventos funcionando correctamente" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🌐 Servidor corriendo en puerto ${port}`);
});
