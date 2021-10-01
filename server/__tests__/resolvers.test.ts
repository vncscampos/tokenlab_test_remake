import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { graphql, GraphQLSchema } from 'graphql';
import { createConnection } from 'typeorm';

import { resolvers } from '../src/resolvers';
import ensureAuthenticated from '../src/app/middlewares/ensureAuthenticated';

describe('Testing resolvers', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tokenlab',
      database: 'tokenlab_postgres_test',
      entities: [__dirname + '/../src/app/entities/*.ts'],
    });

    schema = await buildSchema({
      resolvers,
      authChecker: ensureAuthenticated,
    });
  });

  it('Should be able to register user', async () => {
    const createUserMutation = `
      mutation {
          createUser(
              name: "user6",
              email: "user6@email.com",
              password: "!User600"
          ) {
              id
          }
      }`;

    const response = await graphql(schema, createUserMutation);

    console.log(response);
  });

  // it('login', async () => {
  //   const createLoginMutation = `
  //     mutation {
  //         session(
  //             email: "user2@email.com",
  //             password: "0000"
  //         ) {
  //             token
  //         }
  //     }`;

  //   const response = await graphql(schema, createLoginMutation);

  //   console.log(response);
  // });
});
