import { database } from "../Database/Connection";
import WorkHours from "../@Types/WorkHours";
import WorkHoursDTO from "../Dtos/WorkHours";
export default class WorkHoursModel
{
    constructor()
    {

    }

    protected async insert(data: WorkHours) : Promise<boolean>
    {
        try
        {
            const insert = await database.workHours.create({
                data:{
                    collectUser_id: data.id_collect_user,
                    week_days: data.week_days,
                    BMD_first: data.BMD_first,
                    BMD_second: data.BMD_second,
                    AMD_first: data.AMD_first,
                    AMD_second: data.AMD_second,
                    comments: data.comments
                }
            });

            if(insert)
                return true;
            else
                return false;
        }
        catch(err)
        {
            console.error("ERRO AO INSERIR WORK_HOURS = "+err);
            return false;
        }

    }

    protected async getAllByCollectUserID(id_collect_user: string) : Promise<object | false>
    {
        try
        {
            const response = await database.workHours.findMany({
                where:{
                    collectUser_id: id_collect_user
                }
            });
            if(response.length > 0)
            {
                return response;
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

    protected async deleteWorkHoursByID(id_work_hours: string) : Promise<boolean>
    {
        try
        {
            const action = await database.workHours.delete({
                where: {
                    id: id_work_hours
                }
            });

            if(action)
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

    public async getOneByID(id_work_hours: string, id_collect_user: string) : Promise<object | null | false>
    {
        try
        {
            const data = await database.workHours.findUnique({
                where: {
                    id: id_work_hours,
                    collectUser_id: id_collect_user
                }
            });
           return data;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }

    protected async updateOneByID(id_work_hours: string, data: WorkHoursDTO) : Promise<object | false>
    {
        try
        {
            const filtredData = Object.fromEntries(
                Object.entries(data).filter(
                    ([name, value]) => value !== null && value !== false && typeof value !== "undefined"
                )
            )
            const update :any = await database.workHours.update({
                where:
                {
                    id: id_work_hours
                },
                data: filtredData
            });
            console.log(update)
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
            console.error(err)
            return false;
        }
    }
}