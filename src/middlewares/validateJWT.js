import jwt from "jsonwebtoken";

export function validateJWT(req, res, next) {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res.status(401).json({ msg: "Acceso denegado. No hay token." });
  }
  const [bearer, token] = authorizationHeader.split(" ");
  try {
    const decoded = jwt.verify(token, "admin123");
    console.log(decoded);
    req.payload = { userId: decoded.id, rol: decoded.rol };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido." });
  }
}
