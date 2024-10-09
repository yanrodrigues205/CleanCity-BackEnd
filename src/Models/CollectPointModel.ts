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
            const insert : any = await database.collectPoint.create({
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
                    workHours_id: true,
                    collectUser_id: true,
                    latitude: true,
                    longitude: true,
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

    protected async getAllByCollectUserId(id_collect_user : string) : Promise<object | false>
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

    protected async deleteCollectPointById(id_collect_point : string, id_collect_user : string) : Promise<object | false>
    {
        try
        {
            const drop= await database.collectPoint.deleteMany({
                where:{
                    id: id_collect_point,
                    collectUser_id: id_collect_user
                }
            });
            console.log(drop);
            console.log("PONTO DE COLETA => "+id_collect_point);
            console.log("USUÁRIO DE COLETA => "+id_collect_user);
            if(drop.count > 0)
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

    protected async updateOneById(id_collect_point : string, data: collectPoint)
    {
        try
        {
            const filtredData = Object.fromEntries(
                Object.entries(data).filter(
                    ([name, value]) => value !== null && value !== false && typeof value !== "undefined"
                )
            )

            const update : any = await database.collectPoint.update({
                where: {
                    id: id_collect_point
                },
                data: filtredData
            })

            if(typeof update === "object")
            {
                return update;
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

    public async getOneById(id: string)
    {
        try
        {
            const get : any = await database.collectPoint.findUnique({
                where: {
                    id
                }
            });

            return get;
        }
        catch(err)
        {
            console.log(err);
            return false;
        }
    }

    protected async getAll() : Promise<object | false>
    {
        try
        {
            const getall = await database.collectPoint.findMany();

            if(getall.length <= 0)
            {
                return false
            }

            return getall;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }
}