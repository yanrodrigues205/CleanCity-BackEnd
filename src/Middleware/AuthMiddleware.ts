import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { database } from "../Database/Connection";

interface AuthRequest extends Request
{
    userId?: string;
}
export default class AuthMiddeware
{
    constructor()
    {

    }

    public static Authentication()
    {
        return async(req: AuthRequest, res: Response, next: NextFunction) => {
            const authHeader = req.headers.authorization;
            if(!authHeader || !authHeader.startsWith('Bearer '))
            {
                return res.status(401).json({
                    "message": "Para acessar esta ambiente você necessita estar logado no sistema!",
                    "status": 401
                });
            }

            const token = authHeader.substring(7);


            let SECURITY_KEY :string = String(process.env.SECURITY_KEY);

            if(SECURITY_KEY.length == 0 || !SECURITY_KEY)
            {
                console.error("Chave de segurança da API inexistente!");
            }

            let decode : any;
            try
            {
                decode = await verify(token, SECURITY_KEY, {
                    complete: true
                });
            }
            catch(err)
            {
                 return res.status(401).json({
                    "message": "Sua sessão é inválida, tente logar novamente!",
                    "status": 401
                });
            }

            if(!decode.payload.id || !decode)
            {
                return res.status(401).json({
                    "message": "Sua sessão é inválida, tente logar novamente!",
                    "status": 401
                });
            }

            const verifyIdUser = await database.users.findUnique({
                where:{
                    id: decode.payload.id
                }
            });

            if(!verifyIdUser)
            {
                return res.status(401).json({
                    "message": "Sua sessão é inválida, tente logar novamente!",
                    "status": 401
                });
            }
            req.userId = decode.payload.id;
            return next();
    };
    }
}