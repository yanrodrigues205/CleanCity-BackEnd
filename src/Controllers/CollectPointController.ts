import CollectPoint from "../@Types/CollectPoint";
import collectPoint from "../Dtos/CollectPoint";
import CollectPointModel from "../Models/CollectPointModel";
import UsersModel from "../Models/UsersModel";
import WorkHoursModel from "../Models/WorkHoursModel";
export default class CollectPointController extends CollectPointModel
{
    private _userModel: UsersModel;
    private _workHoursModel: WorkHoursModel;

    constructor()
    {
        super();
        this._userModel = new UsersModel();
        this._workHoursModel = new WorkHoursModel();
    }


    public async createCollectPoint(req : any, res : any)
    {
        const { name, description, latitude, longitude, id_work_hours, address_number, street, city, state, country } = req.body;

        const user_id : string = req.userId;

        if(!name || !description || !latitude || !longitude || !id_work_hours || !address_number || !street || !city || !state || !country)
        {
            return res.status(400).json({
                message: "Preencha todos os campos necessários para cadastrar um ponto de coleta!",
                status: 400
            });
        }

        const getUser : any = await this._userModel.getDataById(user_id);

        if(!getUser[0].collectUser_id)
        {
            return res.status(401).json({
                message: "Para acessar este ambiente é necessário possuir um usuário de coleta.",
                status: 401
            });
        }
        console.log(getUser[0].collectUser_id)
        console.log(id_work_hours)

        const getWorkHours : any = await this._workHoursModel.getOneByID(id_work_hours, getUser[0].collectUser_id)
        console.log(getWorkHours)
        if(!getWorkHours)
        {
            return res.status(402).json({
                message: "Não foi possível encontrar este horário de funcionamento.",
                status: 402
            });
        }

        let data = {
            name,
            description,
            latitude,
            longitude,
            workHours_id: id_work_hours,
            street,
            address_number,
            city,
            state,
            country,
            disabled_at: null
        }

        const insert = await super.insert(data, getUser[0].collectUser_id);

        if(!insert)
        {
            return res.status(403).json({
                message: "Não foi possível cadastrar o ponto de coleta, tente novamente.",
                status: 403
            });
        }

        return res.status(202).json({
            message: "Ponto de coleta registrado com sucesso!",
            status: 202
        })
    }

    public async updateById(req : any, res : any)
    {
        const { id, name, description, latitude, longitude, id_work_hours,  address_number, street, city, state, country} = req.body;

        const user_id : string = req.userId;
        const getUser : any = await this._userModel.getDataById(user_id);

        if(!getUser[0].collectPoint_id)
        {
            return res.status(400).json({
                message: "Para acessar este ambiente é necessário possuir um usuário de coleta.",
                status: 400
            })
        }


        if(!name && !description && !latitude && !longitude && !id_work_hours && !address_number && !street && !city && !state && !country)
        {
            return res.status(401).json({
                message: "Para alterar o ponto de coleta é necessário modificar ao menos um campo.",
                status: 401
            });
        }

        const getWorkHour : any = await this._workHoursModel.getOneByID(id_work_hours, getUser[0].collectUser_id);

        if(!getWorkHour[0].id)
        {
            return res.status(402).json({
                message: "Não foi possível encontrar o horário de trabalho selecionado.",
                status: 402
            });
        }


        let data ={
            name,
            description,
            latitude,
            longitude,
            workHours_id: getWorkHour[0].id,
            street,
            city,
            state,
            country,
            address_number
        }

            const update : CollectPoint | false = await super.updateOneById(id, data, getUser[0].collectUser_id);

        if(!update)
        {
            return res.status(403).json({
                message: "Não foi possível alterar o seu ponto de coleta, tente novamente.",
                status: 403
            });
        }

        return res.status(202).json({
            message: "Ponto de coleta alterado com sucesso!",
            updated: update,
            status: 202
        });
    }

    public async dropById(req : any, res: any)
    {
        const { id } = req.body;

        if(!id)
        {
            return res.status(400).json({
                message: "Para acessar este ambiente é necessário possuir um usuário de coleta.",
                status: 400
            });
        }

        const getUser : any = await this._userModel.getDataById(req.userId);

        if(!getUser[0].collectUser_id)
        {
            return res.status(401).json({
                message: "Para acessar este ambiente é necessário possuir um usuário de coleta.",
                status: 401
            });
        }


        const getCollectPoint : any = await super.getOneById(id, getUser[0].collectUser_id);

        if(!getCollectPoint)
        {
            return res.status(401).json({
                message: "Não foi possível encontrar esse ponto de coleta.",
                status: 401
            });
        }

        

        const deleted = await super.deleteCollectPointById(id, getUser[0].collectUser_id);

        if(!deleted)
        {
            return res.status(401).json({
                message: "Não foi possível foi possível deletar este ponto de coleta.",
                status: 401
            });
        }

        return res.status(202).json({
            message: "Ponto de coleta apagado com sucesso!",
            status: 202
        });
    }

    public async getAllByCollectUser(req : any, res : any)
    {
        const user_id = req.userId;
        const getUser : any = await this._userModel.getDataById(user_id);
        const  collect_user_id = getUser[0].collectUser_id;
        
        if(!collect_user_id)
        {
            return res.status(400).json({
                message: "E necerrário possuir um cadastro como usuário de coleta.",
                status: 400
            })
        }
        const getall : any = await super.getAllByCollectUserId(collect_user_id);

        if(!getall)
        {
            return res.status(401).json({
                message: "Não foi possível pegar seus respectivos pontos de coleta.",
                status: 401
            })
        }

        if(getall.length <= 0)
        {
            return res.status(401).json({
                message: "Você ainda não possuí nenhum ponto de coleta registrado.",
                status: 401
            });
        }

        return res.status(200).json(getall);
    }

    public async getAllCollectPoints(req : any, res : any)
    {
        const getall = await super.getAll();

        if(!getall)
        {
            return res.status(400).json({
                message: "Não foi encontrado nenhum ponto de coleta, sem registros.",
                status: 400
            })
        }

        return res.status(202).json(getall);
    }

    public async getOneByIdAndCollectUser(req : any, res : any)
    {
        const { id_collect_point } = req.body;

        if(!id_collect_point)
        {
            return res.status(400).json({
                message: "Para pegar um ponto de coleta é necessário informar sua identificação.",
                status: 400
            })
        }
        const getUser : any = await this._userModel.getDataById(req.userId);
        let collectUser_id = "";
        if(!getUser[0].collectUser_id || !req.userId)
        {
            return  res.status(403).json({
                message: "Para acessar está página é necessário o cadastro completo do usuário de coleta.",
                status: 403
            });
        }
        else
        {
            collectUser_id = getUser[0].collectUser_id;
        }

        const getone : any = await super.getOneById(id_collect_point, collectUser_id);

         if(!getone)
        {
            return res.status(401).json({
                message: "Não foi possível buscar o ponto de coleta de identificação => "+id_collect_point,
                status: 401
            });
        }

        return res.status(202).json(getone);
    }

}