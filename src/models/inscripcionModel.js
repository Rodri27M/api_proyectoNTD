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
  }
});

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

export default Inscripcion;
