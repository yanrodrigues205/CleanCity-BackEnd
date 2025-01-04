import { database } from "../Database/Connection";
import WastesDTO from "../Dtos/Wastes";

export default class WastesModel
{
    
    constructor()
    {
    }

    protected async insert(wastes: WastesDTO) : Promise<false | Object>
    {
        try
        {
            const create_waste = await database.wastes.create({
                data: {
                    type: wastes.type,
                    description: wastes.description,
                    classification: wastes.classification,
                    unit_of_measure:wastes.unit_of_measure,
                    value: wastes.value,
                    collectUser_id: wastes.collectUser_id,
                    disabled_at: null,

                }
            });

            if(create_waste)
            {
                return create_waste;
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

    protected async getDataById(waste_id: string) : Promise<false | object>
    {
        try
        {
            const getData = await database.wastes.findMany({
                where: {
                    id: waste_id,
                    disabled_at: null
                },
                select:{
                    id: true,
                    type: true,
                    description: true,
                    classification: true,
                    unit_of_measure: true,
                    value: true,
                    created_at: true,
                    disabled_at: true,
                    updated_at: true
                }
            })

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

    protected async updateById(waste_id : string, data : object, collect_user_id : string) : Promise<boolean>
    {
        try
        {
            const filtred = Object.fromEntries(
                Object.entries(data).filter(
                    ([name, value]) => value !== null && value !== undefined && value !== false
                )
            );

            const update = await database.wastes.updateMany({
                where:{
                    id: waste_id,
                    collectUser_id: collect_user_id
                },
                data: filtred
            });

            if(update.count > 0)
            {
                return true;
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

    protected async disabledById(waste_id: string, collect_user_id: string) : Promise<boolean>
    {
        try
        {
            const action = await database.wastes.updateMany({
                where: {
                    id: waste_id,
                    collectUser_id: collect_user_id,
                    disabled_at: null
                },
                data:{
                    disabled_at: new Date()
                }
            });

            if(action.count > 0)
            {
                return true;
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

    protected async getAllByCollectUser(id_collect_user : string) : Promise<false | object>
    {
        try
        {
            const getAll = await database.wastes.findMany({
                where: {
                    collectUser_id: id_collect_user,
                    disabled_at: null
                },
                select: {
                    id: true,
                    type: true,
                    description: true,
                    classification: true,
                    unit_of_measure: true,
                    value: true,
                    created_at: false,
                    updated_at: false,
                    disabled_at: false,
                    collectUser_id: false
                }
            })

            if(getAll.length > 0)
            {
                return getAll;
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