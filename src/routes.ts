import { Router } from "express";
import AuthMiddeware from "./Middleware/AuthMiddleware";
import UsersController from "./Controllers/UsersController";
import SessionsController from "./Controllers/SessionsController";
import CollectUserController from "./Controllers/CollectUserController";
import WorkHoursController from "./Controllers/WorkHoursController";
import CollectPointController from "./Controllers/CollectPointController";
const workHoursController = new WorkHoursController();
const collectUserController = new CollectUserController();
const usersController = new UsersController();
const sessionController = new SessionsController();
const collectPointController = new CollectPointController();

export const routes = Router();

routes.get("/", (req, res) => {
    res.status(244).json({
        message: "bem vindo!"
    })
})


//AUTHENTICATION AND REGISTER ROUTE

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome que o usuário deseja utilizar.
 *         email:
 *           type: string
 *           description: Endereço de email válido para autenticação de dois fatores.
 *         password:
 *           type: string
 *           description: Senha para acesso ao sistema.
 *       example:
 *         name: Recicla Aqui da Silva
 *         email: recicla_aqui@exemplo.com
 *         password: KIwqs62t1_l
 *     RespostaCadastroUsuario:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem relativa a operação.
 *         status:
 *           type: string
 *           description: Status relativo a operação.
 *       example:
 *         message: Usuário criado com sucesso!
 *         status: 202
*     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Endereço de email válido para autenticação de dois fatores.
 *         password:
 *           type: string
 *           description: Senha para acesso ao sistema.
 *       example:
 *         email: recicla_aqui@exemplo.com
 *         password: KIwqs62t1_l
*     OTP:
 *       type: object
 *       required:
 *         - otp
 *         - id
 *       properties:
 *         otp:
 *           type: string
 *           description: One-Time Password, modo de verificação por E-mail no primeiro passo da Authenticação Dois Fatores.
 *         id:
 *           type: string
 *           description: Identficação Relativa ao primeiro passo da authenticação de Dois Fatores.
 *       example:
 *         otp: 52Tuy8
 *         id: 65a13a3e-2d15-4047-bca6-bce947c91ba3
*     Verify:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Token de Sessão, retornodo pelo Segundo Passo da Authenticação de Dois-Fatores
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Gerenciamento de Usuários dentro do Sistema
 *   - name: Authenticação
 *     description: Gerenciamento do processo de authenticação dois fatores.
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Cadastro de Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     tags: [Usuários]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: "Nome para identificação do usuário no sistema"
 *         required: true
 *         schema:
 *          type: string
 *       - name: email
 *         in: query
 *         description: "Endereço de email único verídico para authenticação"
 *         required: true
 *         schema:
 *          type: string
 *       - name: password
 *         in: query
 *         description: "Senha definida pelo usuário para se conectar ao sistema"
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       202:
 *         description: Criação de Usuário bem sucedida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaCadastroUsuario'
 *       400:
 *         description: Dados Inválidos, Falta de Campos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Preencha todos os campos para finalizar seu cadastro!
 *                 status: 400
 *       401:
 *         description: Dados Inválidos, A senha possuí menos de oito caractéres.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: A senha está muito curta , deve conter no mínimo 8 caracteres!
 *                 status: 401
 *       402:
 *         description: Requisição Inválida, Erro de Interpretação do REcaptcha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Erro de validação do reCAPTCHA, tente novamente.
 *                 status: 402
 *       403:
 *         description: Dados Inválidos, Email já foi registrado no sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: O email já existe dentro do sistema!
 *                 status: 403
 */
routes.post("/signup", (req, res) =>{   usersController.createUser(req, res)    });
routes.post("/user/getUserById", AuthMiddeware.Authentication(false), (req, res) => { usersController.getUserByID(req, res) });


/**
 * @swagger
 * /first-factor:
 *   post:
 *     summary: Primeiro passo do processo de authenticação de Dois Fatores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     tags: [Authenticação]
 *     parameters:
 *       - name: email
 *         in: query
 *         description: "Endereço de email definido pelo usuário no cadastro"
 *         required: true
 *         schema:
 *          type: string
 *       - name: password
 *         in: query
 *         description: "Senha definida pelo usuário para se conectar ao sistema"
 *         required: true
 *         schema:
 *          type: string
 *     responses:
*       202:
 *         description: Primeiro passo da authenticação dois fatores concluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de Sucesso na Operação.
 *                 id_OTP:
 *                   type: string
 *                   description: Código enviado na caixa de email responsável pela segunda parte do processo de authenticação (One-Time Password).
 *                 expiry:
 *                   type: string
 *                   description: Data de expiração do id_OTP (One-Time Password).
 *                 status:
 *                   type: string
 *                   description: Status de Sucesso na operação.
 *               example:
 *                 message: Para concluir a authenticação, verifique a caixa de emails aonde foi enviado o código de verificação.
 *                 id_OTP: Gja67y
 *                 expiry: 2024-07-23 10:45:12.496
 *                 status: 202
 *       400:
 *         description: Dados Inválidos, Falta de campos para authenticação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Preencha todos os campos para entrar na sua conta!
 *                 status: 400
 *       401:
 *         description: Dados Inválidos, Email não existe no sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: O email não foi encontrado no sistema, digite novamente!
 *                 status: 401
 *       402:
 *         description: Requisição Inválida, Erro de Interpretação do REcaptcha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Erro de validação do reCAPTCHA, tente novamente.
 *                 status: 402
 *       403:
 *         description: Dados Inválidos, Senha Inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: A senha digitada esta incorreta, digite novamente!
 *                 status: 403
 *       421:
 *         description: Servidor de Envio SMTP temporeariamente indisponível.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Não foi possível concluir o o primeiro passo da authenticação dois fatores.
 *                 status: 421
 */
routes.post("/first-factor", (req, res) =>{   sessionController.firstFactor(req, res)   });

/**
 * @swagger
 * /second-factor:
 *   post:
 *     summary: Segundo passo do processo de authenticação de Dois Fatores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OTP'
 *     tags: [Authenticação]
 *     parameters:
 *       - name: otp
 *         in: query
 *         description: "One-Time Password, Senha Temporária 'Código' de duração de 9 minutos"
 *         required: true
 *         schema:
 *          type: string
 *       - name: id
 *         in: query
 *         description: "Identificação relativa a senha temporária, retornada no Primeiro Passo da Indetificação Dois Fatores"
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       202:
 *         description: Segundo Passo da Authenticação Dois Fatores realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 token:
 *                   type: string
 *                   description: Token JWT para authenticação em rotas privadas, duração de 24 horas.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Sessão iniciada com sucesso!
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 status: 202
 *       400:
 *         description: Dados Inválidos, Falta de Preenchimento dos campos (otp, id) ou campo otp for diferente de 6 caractéres.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Indentificação de fatores faltando campos, tente novamente.
 *                 status: 400
 *       401:
 *         description: Dados Inválidos, Senha temporária(otp, One-Time Password) não condiz com a Identifição(id).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Indentificação de fatores inválida, tente novamente.
 *                 status: 401
*       402:
 *         description: Sessão não iniciada, não foi possível a criação e inserção da sessão.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Não foi possível realizar a criação da sessão!
 *                 status: 402
 */
routes.post("/second-factor", (req, res) =>{   sessionController.secondFactor(req, res)   });

/**
* @swagger
 * /verify:
 *   post:
 *     summary: Rota de verificação de token, com base nos direitos do usuário a manipulação do Front-End
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Verify'
 *     tags: [Authenticação]
 *     parameters:
 *       - name: token
 *         in: query
 *         description: "Token de sessão com informações criptografadas retornado pelo Segundo Passo da Authenticação Dois-Fatores"
 *         required: true
 *     responses:
 *       202:
 *         description: Segundo Passo da Authenticação Dois Fatores realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 token:
 *                   type: string
 *                   description: Token JWT para authenticação em rotas privadas, duração de 24 horas.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Finalizar a documentação desta rota.
 *                 status: 202
 *       400:
 *         description: Dados Inválidos, Falta o preenchimento do campo de Sessão(token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *                 status:
 *                   type: string
 *                   description: Status de erro na operação.
 *               example:
 *                 message: Para a verificação de sessão é necessário informar o token.
 *                 status: 400
 */
routes.post("/verify", (req, res) =>{
    sessionController.verifySession(req, res);
});


//COLLECT_USER
routes.post("/collect_user/insert",AuthMiddeware.Authentication(false), (req, res) => {
    collectUserController.createCollectUser(req, res);
});

routes.post("/collect_user/getCollectUserById", AuthMiddeware.Authentication(false), (req, res) => { 
    collectUserController.getCollectUserById(req, res) 
});



// //WORK_HOURS
routes.post("/work_hours/insert", AuthMiddeware.Authentication(true),  (req, res) => {
     workHoursController.createWorkHours(req, res);
});

routes.get("/work_hours/getall", AuthMiddeware.Authentication(true), (req, res) => {
    workHoursController.getAllWorkHours(req, res);
});

routes.post("/work_hours/getOneById", AuthMiddeware.Authentication(true), (req, res) => {
    workHoursController.getWorkHoursByID(req, res);
})

routes.delete("/work_hours/deleteById", AuthMiddeware.Authentication(true), (req, res) => {
    workHoursController.dropWorkHoursById(req, res);
});

routes.put("/work_hours/updateById", AuthMiddeware.Authentication(true), (req, res) => {
    workHoursController.updateWorkHoursById(req, res);
});


//COLLECT_POINTS
routes.post("/collect_points/insert", AuthMiddeware.Authentication(true), (req, res) => {
    collectPointController.createCollectPoint(req, res);
})

routes.delete("/collect_points/deleteById", AuthMiddeware.Authentication(true), (req, res) => {
    collectPointController.dropById(req, res);
})

routes.get("/collect_points/getAllById", AuthMiddeware.Authentication(true), (req, res) => {
    collectPointController.getAllByCollectUser(req, res);
});

routes.get("/collect_points/getall", AuthMiddeware.Authentication(true), (req, res) => {
    collectPointController.getAllCollectPoints(req, res);
});
