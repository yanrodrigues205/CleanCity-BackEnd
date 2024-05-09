import { database } from "../Database/Connection";
import CollectUser from "../Dtos/CollectUser";
import UsersModel from "./UsersModel";
export default class CollectUserModel extends UsersModel
{
    constructor()
    {
        super();
    }

    protected async insertCollectUser(collectUser: CollectUser) : Promise<boolean>
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
            console.log(insert);
            if(insert)
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
}