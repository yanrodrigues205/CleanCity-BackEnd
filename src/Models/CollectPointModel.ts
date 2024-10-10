import CollectPoint from "../@Types/CollectPoint";
import { database } from "../Database/Connection";
import collectPoint from "../Dtos/CollectPoint";
import Users from "../Dtos/User";

export default class CollectPointModel
{
    constructor()
    {

    }


    protected async insert(collectPoint: collectPoint, collect_user_id: string) : Promise<boolean | object>
    {
        try
        {
            const insert = await database.collectPoint.create({
                data:{
                    name: collectPoint.name,
                    description: collectPoint.description,
                    latitude: collectPoint.latitude,
                    longitude: collectPoint.longitude,
                    collectUser_id: collect_user_id,
                    workHours_id: collectPoint.workHours_id,
                    address_number: collectPoint.address_number,
                    street: collectPoint.street,
                    city: collectPoint.city,
                    state: collectPoint.state,
                    country: collectPoint.country,
                    disabled_at: null
                },
                select:{
                    id: true,
                    name: true,
                    description: true,
                    latitude: true,
                    longitude: true,
                    address_number: true,
                    street: true,
                    city: true,
                    state: true,
                    country: true,
                    collectUser_id: true,
                    workHours_id: true,
                    created_at: true,
                    disabled_at: true,
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
                    id: id_collect_user,
                    disabled_at:{
                        not: null
                    }
                },
                select:{
                    id: true,
                    name: true,
                    description: true,
                    latitude: true,
                    longitude: true,
                    collectUser_id: true,
                    address_number: true,
                    street: true,
                    city: true,
                    state: true,
                    country: true,
                    workHours_id: true,
                    created_at: true,
                    disabled_at: true,
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

    protected async updateOneById(id_collect_point : string, data: collectPoint, id_collect_user: string)
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
                    id: id_collect_point,
                    disabled_at:{
                        not: null
                    }
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

    protected async getOneById(id: string, collect_user_id: string )
    {
        try
        {
            const get : any = await database.collectPoint.findMany({
                where: {
                    id,
                    collectUser_id: collect_user_id
                }
            });

            return get[0];
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