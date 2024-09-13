import Users from "../Dtos/User";
import {hash, compare } from "bcryptjs";
import { database } from "../Database/Connection";
export default class UsersModel
{
    constructor()
    {

    }


    protected async emailExists(email: string) : Promise<boolean>
    {
        try
        {
            const verify = await database.users.findUnique({
                where: { email: email }
            });

            if(verify)
                return true;
            else
                return false;

        }
        catch(err)
        {
            console.log(err);
            return false;
        }
    }


    protected async insert(user: Users): Promise<boolean>
    {
        try
        {
            let cryptPass = await hash(user.password, 10);
            const create_user = await database.users.create({
                data:{
                    name: user.name,
                    email: user.email,
                    password: cryptPass
                }
            });

            if(create_user)
                return true;
            else
                return false;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }

    public async getDataById(user_id: string) : Promise<false | object>
    {
        try
        {
            const getData = await database.users.findMany({
                where:{
                    id: user_id
                },
                select:
                {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                    collectUser_id: true
                }
            });

            if(getData.length > 0)
            {
                return getData;
            }
            else
            {
                return false;
            }
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }

    protected async updateCollectUser(collectUser_id: string, user_id: string)
    {
        try
        {
            const update = await database.users.update({
                where:{
                    id: user_id
                },
                data:{
                    collectUser_id
                }
            });

            if(update)
                return true;
            else
                return false;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }
}