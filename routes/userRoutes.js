import express, { request, response } from "express";
import userService from "../UserService/userService.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const uService = new userService();
    console.log(username, email, password);
    uService.handleUserRegistration(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const uService = new userService();
    uService.handleUserLogin(username, password);
  } catch (error) {
    console.log(error);
  }
});

export default router;
