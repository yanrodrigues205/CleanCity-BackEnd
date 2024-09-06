<h1 align="center" style="font-weight: bold;">CleanCity-BackEnd</h1>

<p align="center">
    <b>This repository was created to be the back-end of an application focused on meeting some of the objectives of the UN (United Nations Organization), in addition, we saw a current problem in our community, the irregular disposal of garbage, with this Clean City appears, focusing on helping people who depend on collecting recyclable waste with people who depend on it to live!</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- Typescript
- MySQL
- Prisma
- NodeJS
- Docker
- Docker Compose

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- [NodeJS](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

<h3>Cloning</h3>

```bash
git clone https://github.com/yanrodrigues205/CleanCity-BackEnd.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your credentials

```yaml
# Database settings 
DATABASE_USER='root'
DATABASE_PASSWORD='56c46fad85a799276c99793d4543a330'
DATABASE_NAME='clean_city'
DATABASE_HOST='database'
DATABASE_PORT=3306
DATABASE_URL="mysql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}"

# Server settings
SERVER_PORT=4000
PHP_MY_ADMIN_PORT=8000
SERVER_MESSAGE="RODANDO"
```

<h3>Starting</h3>

How to start the project

```bash
cd CleanCity-BackEnd
docker-compose up
```

<h2 id="routes">📍 API Endpoints</h2>
​

| routes               | link in page                                        
|----------------------|-----------------------------------------------------
|<kbd>POST /signup</kbd>|Click to see [here](#post-signup)
|<kbd>POST /first-factor</kbd>|Click to see [here](#post-first-factor)
|<kbd>POST /second-factor</kbd>|Click to see [here](#post-second-factor)
| <kbd>POST /verify</kbd>|Click to see [here](#post-verify)

<h3 id="post-signup">POST /signup</h3>

**Summary:** Cadastro de Usuários

**Request Body:**

```json
{
  "name": "Recicla Aqui da Silva",
  "email": "recicla_aqui@exemplo.com",
  "password": "KIwqs62t1_l"
}
```

**Response 202 (Created):**

```json
{
  "message": "Usuário criado com sucesso!",
  "status": "202"
}
```

**Response 400 (Bad Request):**

```json
{
  "message": "Preencha todos os campos para finalizar seu cadastro!",
  "status": "400"
}
```

**Response 401 (Unauthorized):**

```json
{
  "message": "A senha está muito curta , deve conter no mínimo 8 caracteres!",
  "status": "401"
}
```

**Response 402 (Payment Required):**

```json
{
  "message": "Erro de validação do reCAPTCHA, tente novamente.",
  "status": "402"
}
```

**Response 403 (Forbidden):**

```json
{
  "message": "O email já existe dentro do sistema!",
  "status": "403"
}
```

<h3 id="post-first-factor">POST /first-factor</h3>

**Summary:** Primeiro passo do processo de autenticação de Dois Fatores

**Request Body:**

```json
{
  "email": "recicla_aqui@exemplo.com",
  "password": "KIwqs62t1_l"
}
```

**Response 202 (Accepted):**

```json
{
  "message": "Para concluir a autenticação, verifique a caixa de emails aonde foi enviado o código de verificação.",
  "id_OTP": "Gja67y",
  "expiry": "2024-07-23 10:45:12.496",
  "status": "202"
}
```

**Response 400 (Bad Request):**

```json
{
  "message": "Preencha todos os campos para entrar na sua conta!",
  "status": "400"
}
```

**Response 401 (Unauthorized):**

```json
{
  "message": "O email não foi encontrado no sistema, digite novamente!",
  "status": "401"
}
```

**Response 402 (Payment Required):**

```json
{
  "message": "Erro de validação do reCAPTCHA, tente novamente.",
  "status": "402"
}
```

**Response 403 (Forbidden):**

```json
{
  "message": "A senha digitada esta incorreta, digite novamente!",
  "status": "403"
}
```

**Response 421 (Misdirected Request):**

```json
{
  "message": "Não foi possível concluir o o primeiro passo da autenticação dois fatores.",
  "status": "421"
}
```

<h3 id="post-second-factor">POST /second-factor</h3>

**Summary:** Segundo passo do processo de autenticação de Dois Fatores

**Request Body:**

```json
{
  "otp": "52Tuy8",
  "id": "65a13a3e-2d15-4047-bca6-bce947c91ba3"
}
```

**Response 202 (Accepted):**

```json
{
  "message": "Sessão iniciada com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "status": "202"
}
```

**Response 400 (Bad Request):**

```json
{
  "message": "Indentificação de fatores faltando campos, tente novamente.",
  "status": "400"
}
```

**Response 401 (Unauthorized):**

```json
{
  "message": "Indentificação de fatores inválida, tente novamente.",
  "status": "401"
}
```

**Response 402 (Payment Required):**

```json
{
  "message": "Não foi possível realizar a criação da sessão!",
  "status": "402"
}
```

<h3 id="post-verify">POST /verify</h3>

**Summary:** Rota de verificação de token, com base nos direitos do usuário a manipulação do Front-End

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

**Response 202 (Accepted):**

```json
{
  "message": "Finalizar a documentação desta rota.",
  "status": "202"
}
```

**Response 400 (Bad Request):**

```json
{
  "message": "Para a verificação de sessão é necessário informar o token.",
  "status": "400"
}
```




<h2 id="colab">🤝 Collaborators</h2>

Special thank you for all people that contributed for this project.

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/92941649?v=4" width="100px;" alt="Yan Rodrigues Profile Picture"/><br>
        <sub>
          <b>YAN RODRIGUES</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/101331964?v=4" width="100px;" alt="Matheus Marchioli Picture"/><br>
        <sub>
          <b>MATHEUS MARCHIOLI</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h2 id="contribute">📫 Contribute</h2>

Here you will explain how other developers can contribute to your project. For example, explaining how can create their branches, which patterns to follow and how to open an pull request

1. `git clone https://github.com/yanrodrigues205/CleanCity-BackEnd.git`
2. `git checkout -b feature/NAME`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
