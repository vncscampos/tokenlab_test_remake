import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import './database';
import { resolvers } from './resolvers';

// TODA request é POST
// TODA request bate no mesmo endpoint

// Query -> GET
// Mutation -> POST/PUT/DELETE
// Scalar types -> string, int, boolean, float e ID

export async function startApolloServer() {
  const app = express();

  // Inicialização do ApolloServer
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  // Lógica para integrar o express
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  return app;
}
