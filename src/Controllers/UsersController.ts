import Users from "../Dtos/User";
import UsersModel from "../Models/UsersModel";

export default class UsersController extends UsersModel
{
    constructor()
    {
        super();
    }

    public async createUser(req: any, res: any)
    {
        const data: Users = req.body;

        if(!data.name || !data.email || !data.password)
        {
            return  res.status(400).json({
                        message: "Preencha todos os campos para finalizar seu cadastro!",
                        status: 400
                    });
        }
        let pass = data.password;
        if(pass.length < 8)
        {
            return  res.status(400).json({
                        message: "A senha está muito curta , deve conter no mínimo 8 caracteres!",
                        status: 400
                    });
        }


        let emailExists = await super.emailExists(data.email);

        if(emailExists)
        {
            return  res.status(400).json({
                        message: "O email ja existe dentro do sistema!",
                        status: 400
                    });
        }

        let register = await super.insert(data);

        if(register)
        {
            return  res.status(202).json({
                        message: "Usuário criado com sucesso!",
                        status: 202
                    });
        }
    }
}