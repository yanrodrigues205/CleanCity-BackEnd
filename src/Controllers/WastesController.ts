import WastesDTO from "../Dtos/Wastes";
import WastesModel from "../Models/WastesModel";
import UsersController from "./UsersController";
import UnitOfMeasureService from "../Services/UnitOfMeasureService";
import { UnitOfMeasureTypes, WasteClassificationTypes } from "@prisma/client";
import WasteClassificationService from "../Services/WasteClassificationService";


export default class WastesController extends WastesModel
{
    private _usersController: UsersController;
    private _unitOfMeasureService : UnitOfMeasureService;
    private _wasteClassificationService : WasteClassificationService;


    constructor()
    {
        super();
        this._usersController = new UsersController();
        this._unitOfMeasureService = new UnitOfMeasureService();
        this._wasteClassificationService = new WasteClassificationService();
    }

    public async createWaste(req: any, res: any)
    {
        req.body.id = req.userId;
        let data : WastesDTO = req.body;

        const getUser : any = await this._usersController.getUserByID(req, res, true);
        if(!getUser[0].collectUser_id || !req.userId)
        {
            return  res.status(403).json({
                message: "Para acessar está página é necessário o cadastro completo do usuário de coleta.",
                status: 403
            });
        }
        else
        {
            data.collectUser_id = getUser[0].collectUser_id;
        }

        if(!data.type || !data.description || !data.classification || !data.unit_of_measure || !data.value)
        {
            return  res.status(400).json({
                message: "Para cadastrar o resíduo é necessário informar seus respectivos campos!",
                status: 400
            });
        }

        await this._unitOfMeasureService.setValue(data.unit_of_measure); // set Unit Of Measure Value

        const verifyUnitOfMeasureValue : UnitOfMeasureTypes | false = await this._unitOfMeasureService.isValid();

        if(!verifyUnitOfMeasureValue)
        {
            return  res.status(401).json({
                message: "Este tipo de unidade de medida é inválida, verifique este tipo.",
                status: 401
            });
        }
        else
        {
            data.unit_of_measure = verifyUnitOfMeasureValue;
        }

        await this._wasteClassificationService.setValue(data.classification); // Set Waste Classification Value

        const verifyWasteClassificationValue : WasteClassificationTypes | false = await this._wasteClassificationService.isValid();

        if(!verifyWasteClassificationValue)
        {
            return  res.status(402).json({
                message: "Este tipo de classificação de perigo é inválido, tente novamente.",
                status: 402
            });
        }
        const insert = await super.insert(data);

        if(insert)
        {
            return  res.status(202).json({
                message: "Resíduo cadastrado com sucesso!",
                status: 202
            });
        }
        else
        {
            return  res.status(400).json({
                message: "Não foi possivel concluir a inserção do Resíduo!",
                status: 400
            });
        }
        
    }

    public async disabledWasteById(req : any, res : any)
    {
        const { id_waste } = req.body;
        req.body.id = req.userId;

        const getUser : any = await this._usersController.getUserByID(req, res, true);
        
        if(!getUser[0].collectUser_id || !req.userId)
        {
            return  res.status(403).json({
                message: "Para acessar está página é necessário o cadastro completo do usuário de coleta.",
                status: 403
            });
        }
        const collectUser_id = getUser[0].collectUser_id;

        const disable_waste_by_id = await super.disabledById(id_waste, collectUser_id);

        if(!disable_waste_by_id)
        {
            return  res.status(401).json({
                message: "Não foi encontrado nenhum resíduo com essa identificação.",
                status: 401
            });
        }

        return res.status(202).json({
            message: "Resíduo desabilitado com sucesso!",
            status: 202
        })
    }

    public async updateWasteById(req : any, res : any)
    {
        let { waste_id, type, description, classification, unit_of_measure, value } = req.body;

        req.body.id = req.userId;
        let collectUser_id = "";

        const getUser : any = await this._usersController.getUserByID(req, res, true);
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

        if(!waste_id)
        {
            return res.status(400).json({
                message: "Para alterar um resíduo é necessário informar sua identificação.",
                status: 400
            })
        }
        
        if(!type && !description && !classification && !unit_of_measure && !value)
        {
            return res.status(401).json({
                message: "Para concluir a alteração é neceesário adicionar ao menos um campo a ser alterado.",
                status: 401
            });
        }

        if(unit_of_measure)
        {
            await this._unitOfMeasureService.setValue(unit_of_measure); // set Unit Of Measure Value

            const verifyUnitOfMeasureValue : UnitOfMeasureTypes | false = await this._unitOfMeasureService.isValid();

            if(!verifyUnitOfMeasureValue)
            {
                return  res.status(401).json({
                    message: "Este tipo de unidade de medida é inválida, verifique este tipo.",
                    status: 401
                });
            }
            else
            {
                unit_of_measure = verifyUnitOfMeasureValue;
            }
        }


        if(classification)
        {
            await this._wasteClassificationService.setValue(classification); // Set Waste Classification Value

            const verifyWasteClassificationValue : WasteClassificationTypes | false = await this._wasteClassificationService.isValid();

            if(!verifyWasteClassificationValue)
            {
                return  res.status(402).json({
                    message: "Este tipo de classificação de perigo é inválido, tente novamente.",
                    status: 402
                });
            }
            else
            {
                classification = verifyWasteClassificationValue;
            }
        }


        let data = {
            type,
            description,
            classification,
            unit_of_measure,
            value
        }
        
        const update : any = await super.updateById(waste_id, data, collectUser_id);
        
        if(!update)
        {
            return res.status(402).json({
                message: "Não foi possivél concluir a alteração do resíduo!",
                status: 402
            });
        }

        return res.status(202).json({
            message: "Resíduo alterado com sucesso!",
            status: 202,
        })
    }

    public async getAllWastes(req : any, res : any)
    {
        req.body.id = req.userId;
        const getUser : any = await this._usersController.getUserByID(req, res, true);
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

        const getall : any = await super.getAllByCollectUser(collectUser_id);

        if(!getall || getall.length <= 0)
        {
            return  res.status(402).json({
                message: "Não foi encontrado nenhum resíduo ativo.",
                status: 402
            });
        }
    
        return res.status(202).json(getall);
    }

    public async getWalesById(req : any, res : any)
    {
        const { waste_id } = req.body;

        if(!waste_id)
        {
            return res.status(400).json({
                message: "Para pegar um resíduo é necessário informar sua identificação.",
                status: 400
            })
        }
        req.body.id = req.userId;
        const getUser : any = await this._usersController.getUserByID(req, res, true);
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

        const getone : any = await super.getDataById(waste_id, collectUser_id);

         if(!getone)
        {
            return res.status(401).json({
                message: "Não foi possível buscar o resíduo de identificação => "+waste_id,
                status: 401
            });
        }

        return res.status(202).json(getone);
    }
}