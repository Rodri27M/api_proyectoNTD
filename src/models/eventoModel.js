import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: String,
    required: true,
  },
  horaFin: {
    type: String,
  },
  lugar: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ["académico", "cultural", "deportivo", "social"],
    required: true,
  },
  capacidad: {
    type: Number,
    required: true,
  },
  organizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  inscritos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inscripcion",
    },
  ],
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

const Evento = mongoose.model("Evento", eventoSchema);

export default Evento;
