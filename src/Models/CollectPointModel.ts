import { database } from "../Database/Connection";
import collectPoint from "../Dtos/CollectPoint";

export default class CollectPointModel
{
    constructor()
    {

    }


    protected async insert(collectPoint: collectPoint) : Promise<boolean | object>
    {
        try
        {
            const insert = await database.collectPoint.create({
                data:{
                    name: collectPoint.name,
                    description: collectPoint.description,
                    collectUser_id: collectPoint.collectUser_id,
                    workHours_id: collectPoint.workHours_id
                },
                select:{
                    id: true
                }
            });

            if(insert)
                return insert;
            else
                return false
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }
}