import jwt from "jsonwebtoken";
import 'dotenv/config'

export function validateJWT(req, res, next) {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res.status(401).json({ msg: "Acceso denegado. No hay token." });
  }
  const [bearer, token] = authorizationHeader.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    req.payload = { userId: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido." });
  }
}
