const express = require("express");
const Inscripcion = require("../models/inscripcionModel");

const router = express.Router();

// Crear una nueva inscripción
router.post("/", async (req, res) => {
  try {
    const nuevaInscripcion = new Inscripcion(req.body);
    await nuevaInscripcion.save();
    res.status(201).json({
      mensaje: "Inscripción creada correctamente",
      inscripcion: nuevaInscripcion,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la inscripción",
      error: error.message,
    });
  }
});

// Obtener todas las inscripciones
router.get("/", async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find()
      .populate("usuario")
      .populate("evento");
    res.status(200).json(inscripciones);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las inscripciones",
      error: error.message,
    });
  }
});

// Obtener una inscripción por ID
router.get("/:id", async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findById(req.params.id)
      .populate("usuario")
      .populate("evento");
    if (!inscripcion) {
      return res.status(404).json({ mensaje: "Inscripción no encontrada" });
    }
    res.status(200).json(inscripcion);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar la inscripción",
      error: error.message,
    });
  }
});

// Actualizar una inscripción por ID
router.put("/:id", async (req, res) => {
  try {
    const inscripcionActualizada = await Inscripcion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!inscripcionActualizada) {
      return res.status(404).json({ mensaje: "Inscripción no encontrada" });
    }
    res.status(200).json({
      mensaje: "Inscripción actualizada correctamente",
      inscripcion: inscripcionActualizada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la inscripción",
      error: error.message,
    });
  }
});

// Eliminar una inscripción por ID
router.delete("/:id", async (req, res) => {
  try {
    const inscripcionEliminada = await Inscripcion.findByIdAndDelete(req.params.id);
    if (!inscripcionEliminada) {
      return res.status(404).json({ mensaje: "Inscripción no encontrada" });
    }
    res.status(200).json({ mensaje: "Inscripción eliminada correctamente" });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar la inscripción",
      error: error.message,
    });
  }
});

module.exports = router;
