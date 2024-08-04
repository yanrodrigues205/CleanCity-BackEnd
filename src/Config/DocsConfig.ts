import path from 'path';
export const docsOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Recicla Aqui Documentação",
      version: '1.0.0',
      description: "O Recicla Aqui é uma aplicação inovadora que tem como objetivo facilitar o encontro entre coletadores de resíduos recicláveis e pessoas que desejam descartar esses materiais de forma responsável. Através de uma interface intuitiva e fácil de usar, os usuários podem agendar coletas, informar sobre o tipo e a quantidade de resíduos, e encontrar coletadores disponíveis na sua região. Com o Recicla Aqui, promovemos a sustentabilidade, incentivamos a reciclagem e contribuímos para um meio ambiente mais limpo e saudável. Junte-se a nós nessa missão de conectar e transformar a maneira como lidamos com os resíduos!",
      termsOfService: "http://localhost:9090/terms",
      contact: {
        "email": "cleancitysystem@gmail.com"
      },
    },
  },
  apis: [path.join(__dirname, '../routes.ts')]
};