import Test from 'ava';
import { Server } from 'hapi';
import PersistencePlugin from '../src/plugins/persistence';

Test.beforeEach(async t => {
  const server = new Server();
  server.connection();

  await server.register([
    require('hapi-es7-async-handler'),
    PersistencePlugin,
  ]);

  t.context = server;
});

Test(`sets up properly`, async t => {
  const server = t.context;
  t.truthy(server.plugins.persistence);
});

Test(`can access figures collection`, async t => {
  const { persistence } = t.context.plugins;
  const figures = await persistence.collection('figures');
  const result = await figures.find({});
  t.truthy(result);
});
