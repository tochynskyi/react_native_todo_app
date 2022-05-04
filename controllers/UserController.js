import bcrypt from "bcrypt";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const generateJwt = (id, username) => {
  return jwt.sign({ id, username }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error in registration", errors });
      }
      const { username, password } = req.body;

      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this username already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ username, password: hashPassword });
      const token = generateJwt(user.id, user.username);
      return res.json({ token });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Not correct password" });
      }

      const token = generateJwt(user.id, user.username);
      res.json({ token });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.username);
    return res.json({ token });
  }
}

export default new UserController();
