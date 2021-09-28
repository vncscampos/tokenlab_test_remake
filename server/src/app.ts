import express from 'express';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GraphQLError } from 'graphql';
import cors from 'cors';

import './database';
import { resolvers } from './resolvers';
import ensureAuthenticated from './app/middlewares/ensureAuthenticated';

export async function startApolloServer() {
  const app = express();
  
  app.use(cors());

  // ApolloServer startup
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      authChecker: ensureAuthenticated,
    }),
    context: ({ req, res }) => {
      const context = {
        req,
        token: req?.headers?.authorization,
      };

      return context;
    },
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      return new GraphQLError(error.message);
    },
  });

  // Logic to integrate express
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  return app;
}
