import Test from 'ava';
import { Server } from 'hapi';
import OrderPlugin from '../src/plugins/orders';


Test.beforeEach(async t => {
  const server = new Server();
  server.connection();

  await server.register([
    require('hapi-es7-async-handler'),
    OrderPlugin,
  ]);

  t.context = server;
});

Test(`/orders returns and empty array`, async t => {
  const server = t.context;

  const res = await server.inject({ url: '/orders', method: 'GET' });
  t.deepEqual(res.result, []);
});
