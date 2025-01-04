import WorkHours from "../@Types/WorkHours";
import WorkHoursModel from "../Models/WorkHoursModel";
import VerifyHour from "../Services/VerifyHour";
import UsersModel from "../Models/UsersModel";
import WorkHoursDTO from "../Dtos/WorkHours";

export default class WorkHoursController extends WorkHoursModel
{
    private _userModel;
    constructor()
    {
        super();
        this._userModel = new UsersModel();
    }

    public async createWorkHours(req: any, res: any)
    {
        const {BMD_first, BMD_second, AMD_first, AMD_second, comments, week_days } = req.body;

        let id_collect_user = "";

        const getUser : any = await this._userModel.getDataById(req.userId);

        if(!getUser[0].collectUser_id || !req.userId)
        {
            return  res.status(403).json({
                message: "Para acessar está página é necessário o cadastro completo do usuário de coleta.",
                status: 403
            });
        }

        id_collect_user = getUser[0].collectUser_id;

        if(!BMD_first || !BMD_second || !comments || !AMD_first || !AMD_second || !week_days )
        {
            return  res.status(400).json({
                        message: "Preencha todos os campos para cadastrar um horário de trabalho",
                        status: 400
                    });
        }


        if(!VerifyHour.isCorrect(BMD_first) || !VerifyHour.isCorrect(BMD_second) || ! VerifyHour.isCorrect(AMD_first) || !VerifyHour.isCorrect(AMD_second))
        {
            return  res.status(400).json({
                        message: "Este cadastro possuí 4 horários como parâmetros, o mesmo com o formato de Horas : Minutos, Exemplo = 06:00",
                        status: 400
                    });
        }

        if(comments.length < 5)
        {
            return  res.status(400).json({
                        message: "O comentário do cadastro de horário deve possui no mínimo 5 caracteres!",
                        status: 400
                    });
        }

        const data: WorkHours = {
            BMD_first,
            BMD_second,
            AMD_first,
            AMD_second,
            comments,
            week_days,
            id_collect_user
        };
        const insert = await super.insert(data);

        if(insert)
        {
            return  res.status(202).json({
                message: "Horário de Trabalho cadastrado com sucesso!",
                status: 202
            });
        }
        else
        {
            return  res.status(400).json({
                message: "Não foi possivel concluir a inserção do Horário de Trabalho!",
                status: 400
            });
        }


    }

    public async getAllWorkHours(req:any, res:any)
    {

        const getUser : any = await this._userModel.getDataById(req.userId);

        if(!getUser[0].collectUser_id || !req.userId)
        {
            
            return  res.status(403).json({
                message: "Para acessar está página é necessário o cadastro completo do usuário de coleta.",
                status: 403
            });
        }

 
        const getall : any = await super.getAllByCollectUserID(getUser[0].collectUser_id);

        if(getall.length <= 0)
        {
            return  res.status(402).json({
                message: "Não foi encontrado nenhum horário de funcionamento.",
                status: 402
            });
        }

        return res.status(202).json(getall);
    }

    public async dropWorkHoursById(req : any, res : any)
    {
        const { id } = req.body;

        console.log(req.userId);
        if(!id)
        {
            return  res.status(400).json({
                message: "Para deletar um horário de funcionamento é necessário informar a identificação do mesmo.",
                status: 400
            });
        }

        const drop = await super.deleteWorkHoursByID(id);

        if(!drop)
        {
            return  res.status(401).json({
                message: "Não foi encontrado nenhum horário de funcionamento com essa identificação.",
                status: 401
            });
        }

        return res.status(202).json({
            message: "Horário de funcionamento apagado com sucesso!",
            status: 202
        })
    }

    public async updateWorkHoursById(req : any, res : any) 
    {
        const { id, BMD_first, BMD_second, AMD_first, AMD_second, comments, week_days } = req.body;

        if(!id)
        {
            return res.status(400).json({
                message: "Para alterar um horário de funcionamento é necessário informar sua identificação.",
                status: 400
            })
        }
        

        if(!BMD_first && !BMD_second && !AMD_first && !AMD_second && !comments && !week_days)
        {
            return res.status(401).json({
                message: "Para concluir a alteração é neceesário adicionar ao menos um campo a ser alterado.",
                status: 401
            });
        }

        let data : WorkHoursDTO = {
            AMD_first,
            AMD_second,
            BMD_first,
            BMD_second,
            comments,
            week_days
        }

        const update : any = await super.updateOneByID(id, data);

        if(!update)
        {
            return res.status(402).json({
                message: "Não foi possivél concluir a alteração!",
                status: 402
            });
        }

        return res.status(202).json({
            message: "Horário de Funcionamento alterado com sucesso!",
            status: 202,
            updated: update
        })
    }

    public async getWorkHoursByID(req:any, res:any)
    {
        const { id } = req.body;

        if(!id)
        {
            return res.status(400).json({
                message: "",
                status: 400
            })
        }


        // const getUser : any = await this._userModel.getDataById(req.userId);

        // if(!getUser[0].collectUser_id || !req.userId)
        // {
            
        //     return  res.status(403).json({
        //         message: "Para acessar está página é necessário o cadastro completo do usuário de coleta.",
        //         status: 403
        //     });
        // }
        let collect_user_id = "";
        const getone : any = await super.getOneByID(id, collect_user_id);

        if(!getone)
        {
            return res.status(401).json({
                message: "Para acessar este ambiente é necessário possuir um usuário de coleta.",
                status: 401
            });
        }

        return res.status(202).json(getone);
    }
}

