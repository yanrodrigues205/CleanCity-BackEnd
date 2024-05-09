import Users from "../@Types/Users";
import {sign, verify } from "jsonwebtoken";
import { database } from "../Database/Connection";
export default class SessionsModel
{
    constructor()
    {

    }


    protected async insert(users: any)
    {
       
            const dataExpiracao = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            let SECURITY_KEY :string = String(process.env.SECURITY_KEY);

            if(SECURITY_KEY.length == 0 || !SECURITY_KEY)
            {
                console.error("Chave de segurança da API inexistente!");
            }


            let create_token;
            try
            {
                create_token = await sign(users, SECURITY_KEY, {
                    algorithm: "HS256",
                    expiresIn: "24h"
                });
            }
            catch(err)
            {
                console.error(err);
                return false;
            }

            const insert = await database.sessions.create({
                data:{
                    token: create_token,
                    expiry: dataExpiracao,
                    user_id: users.id
                }
            });

            if(insert)
                return create_token;
            else
                return false;
    }

    protected async verifyEmail(email: string)
    {
        try
        {
            const verifyEmail = await database.users.findUnique({
                where: {
                    email
                },
                select:
                {
                    id: true,
                    email: true,
                    name: true,
                    collectUser_id: true,
                    password: true,
                    created_at: true,
                    updated_at: true
                }
            });

            return verifyEmail;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }
}

