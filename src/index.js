import express from "express";
import cors from "cors";
import mongoose from "mongoose";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API KonEventos lista para recibir peticiones ");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
// Conexión a MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/koneventos")
  .then(() => console.log(" Conectado a MongoDB"))
  .catch((err) => console.error(" Error de conexión:", err));
