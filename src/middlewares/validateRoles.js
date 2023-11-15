export function validateRoles(rolesPermitidos) {
  return (req, res, next) => {
    const { rol ,userId } = req.payload;
    console.log({ rolesPermitidos, rol });
    if (rolesPermitidos.includes(rol)) {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "Acceso denegado. No tienes permisos suficientes." });
    }
  };
}
