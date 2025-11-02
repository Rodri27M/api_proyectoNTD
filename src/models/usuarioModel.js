const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 6,
  },
  rol: {
    type: String,
    enum: ["estudiante", "organizador", "administrador"],
    default: "estudiante",
  },
  facultad: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  eventosInscritos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evento",
    },
  ],
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
