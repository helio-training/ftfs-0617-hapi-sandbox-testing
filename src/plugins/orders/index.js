const register = (server, options, next) => {

  server.expose({
    async find() {
      return await [];
    },
  });

  server.route({
    method: 'GET',
    path: '/orders',
    config: {
      tags: ['api']
    },
    handler: async (request, reply) => {
      const { server } = request;
      const orders = await server.plugins.orders.find();
      return reply(orders);
    },
  });

  return next();
};

register.attributes = {
  name: 'orders',
};

export default register;
