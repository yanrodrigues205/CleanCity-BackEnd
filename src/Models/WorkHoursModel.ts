import { database } from "../Database/Connection";
import WorkHours from "../Dtos/WorkHours";
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

    protected async getAll() : Promise<object | boolean>
    {
        try
        {
            return true;
        }
        catch(err)
        {
            return {};
        }
    }
}