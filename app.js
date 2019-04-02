const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
  '/api',
  graphqlHttp({
    schema: buildSchema(`
      type RootQuery {
        tasks: [String!]!
      }
      type RootMutation {
        createTask(name: String): String
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      tasks: () => {
        return ['Depertarse', 'Hacer ejercicios', 'Tiempo de código'];
      },
      createTask: (args) => {
        const name = args.name;
        return name;
      }
    },
    graphiql: true
  })
);

app.listen(3000);
