import { database } from "../Database/Connection";
export default class WastesCollectPointModel
{
    constructor()
    {

    }


    protected async insert(waste_id: string, collect_point_id: string) : Promise<boolean | object>
    {
        try
        {
            const insert = await database.wastesCollectPoint.create({
                data:{
                    collectPoint_id: collect_point_id,
                    waste_id: waste_id,
                    disabled_at: null
                },
                select:{
                    id: true,
                    collectPoint_id: true,
                    waste_id: true,
                    created_at: true,
                    updated_at: true
                }
            })

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

    protected async getAllByCollectPoint(collect_point_id : string) : Promise<boolean | object>
    {
        try
        {
            const getAll : any = await database.wastesCollectPoint.findMany({
                where:{
                    collectPoint_id: collect_point_id,
                    disabled_at: null
                },
                select:{
                    id: true,
                    collectPoint_id: true,
                    waste_id: true,
                    created_at: true,
                    updated_at: true,
                    disabled_at: true
                }
            })

            if(getAll && getAll.length > 0)
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

    protected async disabledAllByCollectPoint(collect_point_id : string) : Promise<boolean>
    {
        const disabled = await database.wastesCollectPoint.updateMany({
            where:{
                collectPoint_id: collect_point_id,
                disabled_at: null
            },
            data: {
                disabled_at: new Date()
            }
        });

        if(typeof disabled === "object")
        {
            return true;
        }
        else
        {
            return false;
        }


    }

    protected async deleteOneById(waste_collectpoint_id : string) : Promise<boolean>
    {
        try
        {
            const drop : any = await database.wastesCollectPoint.delete({
                where: {
                    id: waste_collectpoint_id
                }
            })

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
            console.error(err);
            return false;
        }
    }
}