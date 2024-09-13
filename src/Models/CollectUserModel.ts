import { database } from "../Database/Connection";
import CollectUser from "../Dtos/CollectUser";
import UsersModel from "./UsersModel";
export default class CollectUserModel extends UsersModel
{
    constructor()
    {
        super();
    }

    protected async insertCollectUser(collectUser: CollectUser) : Promise<boolean | object>
    {
        try
        {
            const insert = await database.collectUser.create({
                data:{
                    name: collectUser.name,
                    cpfCnpj: collectUser.cpf_cnpj,
                    phone: collectUser.phone,
                    description: collectUser.description
                },
                select:{
                    id:true
                }
            });
            if(insert)
                return insert;
            else
                return false;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }


    protected async cpfCnpjExists(cpf_cnpj : string) : Promise<boolean>
    {
        try
        {
            const verify = await database.collectUser.findUnique({
                where:{
                    cpfCnpj: cpf_cnpj
                }
            });

            if(verify)
                return false;
            else
                return true;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }

    public async getDataById(collect_user_id : string) : Promise<object | false>
    {
        try
        {
            let getColletUser = await database.collectUser.findMany({
                where:{
                    id: collect_user_id
                },
                select:{
                    id: true,
                    name: true,
                    cpfCnpj: true,
                    phone: true,
                    description: true,
                    created_at: true,
                    updated_at: true
                }
            });

            if(getColletUser.length > 0)
            {
                return getColletUser;
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
}