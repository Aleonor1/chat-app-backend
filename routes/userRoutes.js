import express, { request, response } from "express";
import userService from "../UserService/userService.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const uService = new userService();
    console.log(username, email, password);
    res.json(uService.handleUserRegistration(username, email, password));
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const uService = new userService();
    res.json(await uService.handleUserLogin(username, password));
  } catch (error) {
    console.log(error);
  }
});

router.post("/setAvatar:id", async (req, res, next) => {
  try {
    res.json("test");
  } catch (error) {
    console.log(error);
  }
});

export default router;
