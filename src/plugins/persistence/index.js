import { MongoClient } from 'mongodb';

const setup = async (uri) => await MongoClient.connect(uri);

const plugin = (server, options, next) => {

  const { uri = 'mongodb://localhost:27017/figures' } = options;

  return setup(uri)
  .then(db => {

    server.expose({
      async collection(name) {
        return await db.collection(name);
      },
    });

    return next();
  })
  .catch(err => {
    return next(err);
  });
};

plugin.attributes = {
  name: 'persistence',
};

export default plugin;
