const express = require("express");
const Evento = require("../models/eventoModel");

const router = express.Router();

// Crear un nuevo evento
router.post("/", async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    await nuevoEvento.save();
    res.status(201).json({
      mensaje: "Evento creado correctamente",
      evento: nuevoEvento,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el evento",
      error: error.message,
    });
  }
});

// Obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los eventos",
      error: error.message,
    });
  }
});

// Obtener un evento por ID
router.get("/:id", async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el evento",
      error: error.message,
    });
  }
});

// Actualizar un evento por ID
router.put("/:id", async (req, res) => {
  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!eventoActualizado) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json({
      mensaje: "Evento actualizado correctamente",
      evento: eventoActualizado,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el evento",
      error: error.message,
    });
  }
});

// Eliminar un evento por ID
router.delete("/:id", async (req, res) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(req.params.id);
    if (!eventoEliminado) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json({ mensaje: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar el evento",
      error: error.message,
    });
  }
});

module.exports = router;
