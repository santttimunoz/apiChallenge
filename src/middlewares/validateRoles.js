export function validateRoles(rolesPermitidos) {
  return (req, res, next) => {
    const { role ,userId } = req.payload;
    console.log({ rolesPermitidos, role });
    if (rolesPermitidos.includes(role)) {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "Acceso denegado. No tienes permisos suficientes." });
    }
  };
}
