import express from "express";
import { routes } from "./routes";
require("dotenv").config();
export default class Server
{
    private port: string;
    private message: string;
    private app: any;

    constructor()
    {
        this.port = String(process.env.SERVER_PORT);
        this.message = String(process.env.SERVER_MESSAGE);
        this.app = express();
    }


    async __init__()
    {
        this.app.use(express.json());
        this.app.use(routes);
        await this.app.listen(this.port, ()=>{
            console.log("Server running on the port 🚀 => "+this.port);
            console.log(this.message);
        });
    }
}