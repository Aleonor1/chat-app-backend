import express, { request, response } from "express";
import userService from "../UserService/userService.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const uService = new userService();
    uService.handleUserRegistration(username, email, password);
  } catch (error) {
    console.log(error);
  }
});

export default router;
