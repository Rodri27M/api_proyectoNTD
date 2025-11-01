import mongoose from "mongoose";

const inscripcionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  evento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evento",
    required: true,
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ["pendiente", "confirmada", "cancelada"],
    default: "pendiente",
  },
});

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

export default Inscripcion;
