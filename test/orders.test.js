import Test from 'ava';
import OrderPlugin from '../src/plugins/orders';
import PersistencePlugin from '../src/plugins/persistence';
import Setup from './helpers/_setup';


Test.beforeEach(async t => {

  t.context = await Setup.hapi([
    require('hapi-es7-async-handler'),
    {
      register: PersistencePlugin,
      options: {
        uri: 'localhost/figures',
      },
    },
    OrderPlugin,
  ]);
});

Test(`/orders returns and empty array`, async t => {
  const server = t.context;
  const res = await server.inject({ url: '/orders', method: 'GET' });
  t.truthy(res.result);
});
