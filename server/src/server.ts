import 'reflect-metadata';
import { startApolloServer } from './app';

async function main() {
  const server = await startApolloServer();
  server.listen(3333);
  console.log('🚀 Server started on port 3333!');
}

main();
