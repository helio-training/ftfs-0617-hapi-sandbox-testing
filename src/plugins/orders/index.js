const register = (server, options, next) => {
  server.dependency(['hapi-es7-async-handler', 'persistence']);

  const { persistence } = server.plugins;

  server.expose({
    async find(predicate = {}) {
      const orders = await persistence.collection('orders');
      return await orders.find(predicate);
    },
  });

  server.route({
    method: 'GET',
    path: '/orders',
    config: {
      tags: ['api'],
    },
    handler: async (request, reply) => {
      const { orders } = request.server.plugins;
      const results = await orders.find({});
      return reply(results);
    },
  });

  return next();
};

register.attributes = {
  name: 'orders',
  // dependencies: ['hapi-es7-async-handler'],
};

export default register;
