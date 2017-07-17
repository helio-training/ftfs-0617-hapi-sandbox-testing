import { Server } from 'hapi';
import Joi from 'joi';

const server = new Server();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

server.connection({
  port, router: {
    isCaseSensitive: false,
  },
  routes: {
    cors: true,
  },
});


server.route({
  method: 'GET',
  path: '/blah',
  config: {
    tags: ['api'],
  },
  handler: (req, reply) => {
    return reply({ hello: 'world'});
  },
});


server.route({
  method: 'POST',
  path: '/greet',
  config: {
    tags: ['api'],
    validate: {
      payload: {
        name: Joi.string().required(),
      },
    },
  },
  handler: (req, reply) => {
    const { name } = req.payload;
    return reply({
      message: `Hello, ${name}`,
    });
  },
});

server.register([
  require('inert'),
  require('vision'),
  require('blipp'),
  require('tv'),
  require('hapi-async-handler'),
  {
    register: require('good'),
    options: {
      ops: {
        interval: 5000,
      },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              log: '*',
              response: '*', request: '*', error: '*',
            }],
          },
          {
            module: 'good-console',
          }, 'stdout'],
      },
    },
  },
  {
    register: require('hapi-swagger'),
    options: {
      cors: true,
      jsonEditor: true,
      documentationPath: '/',
      info: {
        title: 'Example',
        version: '1.0.0',
        description: 'An example api',
      },
    },
  },
], err => {
  if (err) throw err;

  if (env !== 'testing') {
    server.start(err => {
      if (err) throw err;
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }

});


export default server;
