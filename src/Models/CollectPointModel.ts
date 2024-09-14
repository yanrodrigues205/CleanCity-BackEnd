import CollectPoint from "../@Types/CollectPoint";
import { database } from "../Database/Connection";
import collectPoint from "../Dtos/CollectPoint";
import CollectUser from "../Dtos/CollectUser";
import Users from "../Dtos/User";

export default class CollectPointModel
{
    constructor()
    {

    }


    protected async insert(collectPoint: collectPoint) : Promise<boolean | Users>
    {
        try
        {
            const insert : CollectPoint | any = await database.collectPoint.create({
                data:{
                    name: collectPoint.name,
                    description: collectPoint.description,
                    latitude: collectPoint.latitude,
                    longitude: collectPoint.longitude,
                    collectUser_id: collectPoint.collectUser_id,
                    workHours_id: collectPoint.workHours_id
                },
                select:{
                    id: true,
                    name: true,
                    description: true,
                    latitude: true,
                    longitude: true,
                    collectUser_id: true,
                    workHours_id: true,
                    created_at: true,
                    updated_at: true
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

    protected async getall(id_collect_user : string) : Promise<object | false>
    {
        try
        {
            const get : any = await database.collectPoint.findMany({
                where:{
                    id: id_collect_user
                },
                select:{
                    id: true,
                    name: true,
                    description: true,
                    latitude: true,
                    longitude: true,
                    collectUser_id: true,
                    workHours_id: true,
                    created_at: true,
                    updated_at: true
                }
            });

            if(get.length > 0)
            {
                return get;
            }
            else
            {
                return false;
            }
        }
        catch(err)
        {
            console.log(err);
            return false;
        }
    }

    protected async delete(id_collect_point : string, id_collect_user : string) : Promise<object | false>
    {
        try
        {
            const drop= await database.collectPoint.delete({
                where:{
                    id: id_collect_point,
                    collectUser_id: id_collect_user
                }
            });

            if(drop)
            {
                return drop;
            }
            else
            {
                return false;
            }
        }
        catch(err)
        {
            console.log(err);
            return false;
        }
    }

    protected async update(id_collect_point : string, data: CollectUser)
    {
        try
        {
            const filtredData = Object.fromEntries(
                Object.entries(data).filter(
                    ([name, value]) => value !== null && value !== false && typeof value !== "undefined"
                )
            )

        }
        catch(err)
        {
            console.log(err);
            return false;
        }
    }
}