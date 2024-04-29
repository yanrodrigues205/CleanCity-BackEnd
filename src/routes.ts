import { Router } from "express";
import UsersController from "./Controllers/UsersController";
const usersController = new UsersController();

export const routes = Router();

routes.get("/", (req, res) => {
    res.status(244).json({
        message: "bem vindo!"
    })
})


routes.post("/signin", (req, res) =>{   usersController.createUser(req, res)    });