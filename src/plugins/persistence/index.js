import Monk from 'monk';

const plugin = (server, options, next) => {
  const { uri = 'mongodb://localhost:27017/figures' } = options;
  const db = Monk(uri);

  server.expose({
    db,
    async collection(name) {
      return await db.get(name);
    },
  });

  return next();
};

plugin.attributes = {
  name: 'persistence',
};

export default plugin;
