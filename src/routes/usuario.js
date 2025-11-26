const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

// Middleware de validación
const validarUsuario = (req, res, next) => {
    next();
};

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

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el usuario",
            error: error.message,
        });
    }
});

// Crear nuevo usuario
router.post("/", validarUsuario, async (req, res) => {
    try {
        const { contraseña } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        const nuevoUsuario = new Usuario({
            ...req.body,
            contraseña: hashedPassword,
        });
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

router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({
            mensaje: 'Correo y contraseña son obligatorios',
        });
    }

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!esValida) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const payload = {
            id: usuario._id,
            correo: usuario.correo,
            rol: usuario.rol,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', {
            expiresIn: '1h',
        });

        const usuarioSinPassword = {
            _id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            rol: usuario.rol,
            facultad: usuario.facultad,
            telefono: usuario.telefono,
            fechaRegistro: usuario.fechaRegistro,
        };

        res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            usuario: usuarioSinPassword,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el proceso de login',
            error: error.message,
        });
    }
});

// Actualizar un usuario por ID
router.put("/:id", async (req, res) => {
    try {
        if (req.body.contraseña) {
            const saltRounds = 10;
            req.body.contraseña = await bcrypt.hash(req.body.contraseña, saltRounds);
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioActualizado,
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el usuario",
            error: error.message,
        });
    }
});

// Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al eliminar el usuario",
            error: error.message,
        });
    }
});

module.exports = router;
