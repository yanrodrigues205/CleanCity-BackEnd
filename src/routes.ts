import { Router } from "express";
import UsersController from "./Controllers/UsersController";
import SessionsController from "./Controllers/SessionsController";
const usersController = new UsersController();
const sessionController = new SessionsController();

export const routes = Router();

routes.get("/", (req, res) => {
    res.status(244).json({
        message: "bem vindo!"
    })
})


routes.post("/signup", (req, res) =>{   usersController.createUser(req, res)    });
routes.post("/signin", (req, res) =>{   sessionController.createSession(req, res)   })