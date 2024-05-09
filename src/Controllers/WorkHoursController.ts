import WorkHours from "../Dtos/WorkHours";
import WorkHoursModel from "../Models/WorkHoursModel";
import VerifyHour from "../Services/VerifyHour";
export default class WorkHoursController extends WorkHoursModel
{
    constructor()
    {
        super();
    }

    public async createWorkHours(req: any, res: any)
    {
        const {BMD_first, BMD_second, AMD_first, AMD_second, comments } = req.body;

        if(!BMD_first || !BMD_second || !comments || !AMD_first || !AMD_second)
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
            comments
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
}