const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const tasks = [];

app.use(bodyParser.json());

app.use(
  '/api',
  graphqlHttp({
    schema: buildSchema(`
      type Task {
        _id: ID!
        name: String!
        description: String
        date: String
        hour: String
        place: String
      }
      input TaskInput {
        name: String!
        description: String
        date: String
        hour: String
        place: String
      }

      type RootQuery {
        tasks: [Task!]!
      }
      type RootMutation {
        createTask(taskInput: TaskInput): Task
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      tasks: () => {
        return tasks;
      },
      createTask: (args) => {
        const task = {
          _id: Math.random().toString(),
          name: args.taskInput.name,
          description: args.taskInput.description,
          date: args.taskInput.date || new Date().toISOString(),
          hour: args.taskInput.hour,
          place: args.taskInput.place,
        };
        tasks.push(task)
        return task;
      }
    },
    graphiql: true
  })
);

app.listen(3000);
