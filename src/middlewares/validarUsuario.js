// Middleware para validar datos del usuario antes de crear o actualizar
export const validarUsuario = (req, res, next) => {
  const { nombre, apellido, correo, contraseña } = req.body;

  if (!nombre || !apellido || !correo || !contraseña) {
    return res.status(400).json({
      mensaje: "Faltan campos obligatorios: nombre, apellido, correo o contraseña",
    });
  }

  next(); 
};
