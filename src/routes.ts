import { Router } from "express";

export const routes = Router();

routes.get("/", (req, res) => {
    res.status(244).json({
        message: "bem vindo!"
    })
})