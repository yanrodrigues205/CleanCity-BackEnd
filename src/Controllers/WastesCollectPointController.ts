import WastesCollectPointModel from "../Models/WastesCollectPointModel";

export default class WastesCollectPointController extends WastesCollectPointModel
{

    constructor()
    {
        super();
    }

    public async createWasteCollectUser(req: any, res: any)
    {
        const data : any = req.body;
        
        if(!data.waste_id || !data.collect_point_id)
        {
            return res.status(400).json({
                message: "Preencha todos os campos para indexar um resíduo a um ponto de coleta.",
                status: 400
            });
        }

        const insert : any = await super.insert(data.waste_id, data.collect_point_id);

        if(insert)
        {
            return res.status(202).json({
                message: "Resíduo anexado ao ponto de coleta com sucesso!",
                status: 202
            });
        }
        else
        {
            return res.status(500).json({
                message: "Não foi possível indexar o resíduo ao ponto de coleta.",
                status: 500
            });
        }
    }


    public async dropById(req : any, res : any)
    {
        const data : any = req.body;

        if(!data.id)
        {
            return res.status(400).json({
                message: "Para concluir a operação é necessário passar a identificação.",
                status: 400
            });
        }


        const drop : any = await super.deleteOneById(data.id);

        if(!drop)
        {
            return res.status(401).json({
                message: "Não foi possível finalizar a exclusão deste index neste ponto de coleta!",
                status: 401
            });
        }


        return res.status(202).json({
            message: "Resíduo foi removido do ponto de coleta com sucesso!",
            status: 202
        });
    }


    public async getAll(req : any, res : any) 
    {
        const data : any = req.body;

        if(!data.collect_point_id)
        {
            return res.status(400).json({
                message: "Para buscar todos é necessário informar a identificação do ponto de coleta desejado.",
                status: 400
            });
        }

        const getall : any= await super.getAllByCollectPoint(data.collect_point_id);

        if(getall && getall.length > 0)
        {
            return res.status(202).json(getall);
        }
        else if(getall && getall.length <= 0)
        {
            return res.status(401).json({
                message: "Este ponto de coleta não especifica os resíduos aceitos.",
                status: 401
            });
        }
        else if(!getall)
        {
            return res.status(500).json({
                message: "Erro interno ao buscar os resíduos especificos aceitados por este ponto de coleta",
                status: 500
            });
        }
    }
}