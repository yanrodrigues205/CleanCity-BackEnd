import Users from "../@Types/Users";
import {sign, verify } from "jsonwebtoken";
import { database } from "../Database/Connection";
import TwoFactorsModel from "./TwoFactorsModel";
import OTP from "../@Types/OTP";
export default class SessionsModel extends TwoFactorsModel
{
    constructor()
    {
        super();
    }

    protected async twoFactors_sendCode(email: string, user_id: string): Promise<OTP | false>
    {
        //OTP = One-Time Password
        const sendOTP : OTP | false = await super.create(email, user_id);

        if(sendOTP)
        {
            return sendOTP;
        }
        else
        {
            return false;
        }
    }

    protected async twoFactors_verifyCode(id: string, OTP_receiver: string) : Promise<Boolean | string>
    {
        const verifyOTP = await super.verify(id, OTP_receiver);

        if(verifyOTP)
        {
            const getUser : any = await database.users.findUnique({
                where:{
                    id: verifyOTP
                },
                select:{
                    collectUser_id: true
                }
            });
            
            if(!getUser)
            {
                console.log("não achou usuário");
                return false;
            }
            else
            {
                console.log("achou usuário");
                if(!getUser.collectUser_id)
                {
                    return true;
                }
                else if(getUser.collectUser_id.length >= 6)
                {   
                    return getUser.collectUser_id
                }
                
                return false;
            }
        }
        else
        {
            return false;
        }
    }
  


    protected async insert(id_twofactors: string)
    {
        const dataExpiracao = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let SECURITY_KEY :string = String(process.env.SECURITY_KEY);

        if(SECURITY_KEY.length == 0 || !SECURITY_KEY)
        {
            console.error("Chave de segurança da API inexistente!");
        }

        let create_token;
        let payload = {
            id_twofactors
        };
        try
        {
            create_token = await sign(payload, SECURITY_KEY, {
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
                twofactors_id: id_twofactors
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

    protected async sessionDataByTwoFactorsID(id_twofactors: string)
    {
        try
        {
            const getTwoFactors : any = await database.twoFactors.findUnique({
                where: {
                    id: id_twofactors
                },
                select: {
                    user_id: true
                }
            });
            
            const getSessions : any = await database.sessions.findMany({
                where: {
                    twofactors_id: id_twofactors
                },
                select: {
                    created_at: true,
                    expiry: true
                }
            });

            const getUser : any = await database.users.findUnique({
                where:{
                    id: getTwoFactors.user_id
                },
                select:{
                    collectUser_id: true
                }
            });

            return {
                expiry: getSessions[0].expiry,
                created_at: getSessions[0].created_at,
                collect_user_id: getUser.collectUser_id,
                user_id: getTwoFactors.user_id
            }
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }
}

