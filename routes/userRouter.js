import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const REGISTRATION = "/registration";
const LOGIN = "/login";
const AUTH = "/auth";

const router = Router();

router.post(
  REGISTRATION,
  [
    check("username", "username field don`t be empty").notEmpty(),
    check("password", "password must be 4-16 characters long").isLength({
      min: 4,
      max: 15,
    }),
  ],
  UserController.registration
);
router.post(LOGIN, UserController.login);
router.get(AUTH, authMiddleware, UserController.check);

export default router;
