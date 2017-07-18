import Test from 'ava';
import PersistencePlugin from '../src/plugins/persistence';
import Setup from './helpers/_setup';

Test.beforeEach(async t => {

  t.context = await Setup.hapi([
    require('hapi-es7-async-handler'),
    PersistencePlugin,
  ]);

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
