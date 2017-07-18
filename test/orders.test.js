import Test from 'ava';
import { Server } from 'hapi';
import OrderPlugin from '../src/plugins/orders';
import PersistencePlugin from '../src/plugins/persistence';


Test.beforeEach(async t => {
  const server = new Server();
  server.connection();

  await server.register([
    require('hapi-es7-async-handler'),
    {
      register: PersistencePlugin,
      options: {
        uri: 'mongodb://localhost:27017/figures',
      },
    },
    OrderPlugin,
  ]);

  t.context = server;
});

Test(`/orders returns and empty array`, async t => {
  const server = t.context;

  const res = await server.inject({ url: '/orders', method: 'GET' });
  t.deepEqual(res.result, []);
});
