import Test from 'ava';
import Server from '../src';

Test('/greet should respond with { message: `Hello, Bob`}', async t => {
  const res = await Server.inject({
    method: 'POST',
    url: '/greet',
    payload: { name: 'Bob' },
  });

  t.deepEqual(res.result, { message: `Hello, Bob` });
});
