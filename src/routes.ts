import { Router } from "express";
import AuthMiddeware from "./Middleware/AuthMiddleware";
import UsersController from "./Controllers/UsersController";
import SessionsController from "./Controllers/SessionsController";
import CollectUserController from "./Controllers/CollectUserController";
const collectUserController = new CollectUserController();
const usersController = new UsersController();
const sessionController = new SessionsController();

export const routes = Router();

routes.get("/", (req, res) => {
    res.status(244).json({
        message: "bem vindo!"
    })
})


//AUTHENTICATION AND REGISTER ROUTE
routes.post("/signup", (req, res) =>{   usersController.createUser(req, res)    });
routes.post("/signin", (req, res) =>{   sessionController.createSession(req, res)   });



//COLLECT_USER
routes.post("/collect_user/insert", AuthMiddeware.Authentication(), (req, res) => {
    collectUserController.createCollectUser(req, res);
})