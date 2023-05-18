import { Router } from "express";

const usersViewRouter = Router();

usersViewRouter.get("/login", (req, res) => {
  res.render("login");
});

usersViewRouter.get("/register", (req, res) => {
  res.render("register");
});

export default usersViewRouter;
