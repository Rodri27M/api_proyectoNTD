import mongoose from "mongoose";

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
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
