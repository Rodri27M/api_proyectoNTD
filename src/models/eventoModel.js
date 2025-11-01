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
  }
});

const Evento = mongoose.model("Evento", eventoSchema);

export default Evento;
