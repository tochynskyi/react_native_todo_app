import jwt from "jsonwebtoken";

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(400).json({ message: "Don't valid token" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Don't authorization" });
  }
}
