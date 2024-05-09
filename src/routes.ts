import { Router } from "express";
import AuthMiddeware from "./Middleware/AuthMiddleware";
import UsersController from "./Controllers/UsersController";
import SessionsController from "./Controllers/SessionsController";
import CollectUserController from "./Controllers/CollectUserController";
import WorkHoursController from "./Controllers/WorkHoursController";
const workHoursController = new WorkHoursController();
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

routes.get("/test", (req, res) =>{
    return res.status(203).json({msg: "passou no teste de adição de rota"})
});


//COLLECT_USER
routes.post("/collect_user/insert",AuthMiddeware.Authentication(false), (req, res) => {
    collectUserController.createCollectUser(req, res);
});

// //WORK_HOURS
routes.post("/work_hours/insert", AuthMiddeware.Authentication(true),  (req, res) => {
     workHoursController.createWorkHours(req, res);
});