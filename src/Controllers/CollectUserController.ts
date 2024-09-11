import CollectUser from "../Dtos/CollectUser";
import CollectUserModel from "../Models/CollectUserModel";
import { cnpj, cpf } from "cpf-cnpj-validator";
import UsersController from "./UsersController";
export default class CollectUserController extends CollectUserModel {
  private _usersController: UsersController;
  constructor() {
    super();
    this._usersController = new UsersController();
  }
  public async createCollectUser(req: any, res: any) {
    const local: CollectUser = req.body;
    if (!local.name || !local.cpf_cnpj || !local.phone || !local.description) {
      return res.status(400).json({
        message: "Preencha todos os campos para criar seu perfil de coleta!",
        status: 400
      });
    }
    if (local.name.length <= 5) {
      return res.status(400).json({
        message: "Digite o nome completo para concluir o cadastro!",
        status: 400
      });
    }
    if (local.phone.length != 11 && local.phone.length != 10) {
      return res.status(400).json({
        message: "Digite o telefone correto para contato!",
        status: 400
      });
    }
    if (!cnpj.isValid(local.cpf_cnpj) && !cpf.isValid(local.cpf_cnpj)) {
      return res.status(400).json({
        message: "Digite um CPF/CNPJ válido!",
        status: 400
      });
    }
    const verifyCpfCnpj = await super.cpfCnpjExists(local.cpf_cnpj);
    if (!verifyCpfCnpj) {
      return res.status(400).json({
        message: "O CPF/CNPJ já foi cadastrado no sistema!",
        status: 400
      });
    }
    const insert: any = await super.insertCollectUser(local);
    if (insert) {
      const bindCollecUser = await this._usersController.bindCollectUser(insert.id, req.userId);
      if (bindCollecUser) {
        return res.status(202).json({
          message: "Usuário de coleta cadastrado com sucesso!",
          status: 202
        });
      }
    }
    else {
      return res.status(500).json({
        message: "Não foi possível inserir o usuário de coleta!",
        status: 500
      });
    }
  }
}