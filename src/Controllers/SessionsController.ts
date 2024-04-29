import { compare } from "bcryptjs";
import Session from "../Dtos/Session";
import SessionsModel from "../Models/SessionsModel";

export default class SessionsController extends SessionsModel
{
    constructor()
    {
        super();
    }


    public async createSession(req: any, res: any)
    {
        const data: Session = req.body;

        if(!data.email || !data.password)
        {
            res.status(400).json({
                message: "Preencha todos os campos para entrar na sua conta!",
                status: 400
            });
        }

        const verifyEmail : any = await super.verifyEmail(data.email);

        if(!verifyEmail)
        {
            res.status(400).json({
                message: "O email não foi encontrado no sistema, digite novamente!",
                status: 400
            });
        }

        const comparePass = await compare(data.password, verifyEmail.password)

        if(!comparePass)
        {
            res.status(400).json({
                message: "A senha digitada esta incorreta, digite novamente!",
                status: 400
            });
        }


        const insertSession = await super.insert(verifyEmail);

        if(insertSession)
        {
            res.status(202).json({
                message: "Sessão iniciada com sucesso!",
                token: insertSession,
                status: 202
            });
        }
        
    }
}