import express from "express";
const router = express.Router();
import Usuario from "../models/usuarioModel.js";

// Ruta de prueba
router.get("/", (req, res) => {
  res.send("Ruta de usuarios funcionando correctamente ");
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el usuario",
      error: error.message,
    });
  }
});
// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      error: error.message,
    });
  }
});

export default router;
