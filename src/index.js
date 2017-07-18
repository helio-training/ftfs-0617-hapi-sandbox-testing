import { Server } from 'hapi';

import OrdersPlugin from './plugins/orders/index';

const server = new Server();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

server.connection({
  port,
  router: {
    isCaseSensitive: false,
  },
  routes: {
    cors: true,
  },
});


server.register([
  require('inert'),
  require('vision'),
  require('blipp'),
  require('tv'),
  require('hapi-es7-async-handler'),
  {
    register: OrdersPlugin,
    options: {
      stripe: {
        isProduction: true,
        key: '1234',
      },
    },
  },
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
              response: '*',
              request: '*',
              error: '*',
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
        title: 'Lego Store',
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
