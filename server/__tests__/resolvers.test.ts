import { buildSchema } from 'type-graphql';
import { graphql, GraphQLSchema } from 'graphql';
import { Connection, createConnection } from 'typeorm';
import { Request } from 'express';

import { resolvers } from '../src/resolvers';
import ensureAuthenticated from '../src/app/middlewares/ensureAuthenticated';

describe('Testing resolvers', () => {
  let schema: GraphQLSchema;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({
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

  afterAll(async () => {
    await connection.close();
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

    expect(response.data.createUser.id).toBeDefined();
  });

  it('Should not be able to register with duplicated email', async () => {
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

    expect(response.data).toBeNull();
  });

  it('Should not be able to register with some null field', async () => {
    const createUserMutation = `
      mutation {
          createUser(
              name: "",
              email: "",
              password: ""
          ) {
              id
          }
      }`;

    const response = await graphql(schema, createUserMutation);

    expect(response.data).toBeNull();
  });
});
