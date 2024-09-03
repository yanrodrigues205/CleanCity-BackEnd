<h1 align="center" style="font-weight: bold;">CleanCity-BackEnd</h1>

<p align="center">
    <b>This repository was created to be the back-end of an application focused on meeting some of the objectives of the UN (United Nations Organization), in addition, we saw a current problem in our community, the irregular disposal of garbage, with this Clean City appears, focusing on helping people who depend on collecting recyclable waste with people who depend on it to live!</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- list of all technologies you used
- Typescript
- MySQL
- Prisma
- NodeJS
- Docker

<h2 id="started">🚀 Getting started</h2>

Here you describe how to run your project locally

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

<h3>Cloning</h3>

How to clone your project

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

How to start your project

```bash
cd CleanCity-BackEnd
docker-compose up
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /authenticate</kbd>     | retrieves user info see [response details](#get-auth-detail)
| <kbd>POST /authenticate</kbd>     | authenticate user into the api see [request details](#post-auth-detail)

<h3 id="get-auth-detail">GET /authenticate</h3>

**RESPONSE**
```json
{
  "name": "Tester 1",
  "age": 18,
  "email": "tester@cleancity.com"
}
```

<h3 id="post-auth-detail">POST /authenticate</h3>

**REQUEST**
```json
{
  "username": "tester",
  "password": "tester"
}
```

**RESPONSE**
```json
{
  "token": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
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
