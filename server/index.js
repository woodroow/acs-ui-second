import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import expressGraphQL from 'express-graphql';
import Firebird from 'node-firebird';
import router from './router';
import schema from './data/schema';
import config from '../config';

const options = {};

options.host = config.firebird.host;
options.port = config.firebird.port;
options.database = config.firebird.database;
options.user = config.firebird.user;
options.password = config.firebird.password;
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null; // default
options.pageSize = 4096; // default when creating database

export const executeQuery = (query, params = []) => new Promise((resolve, reject) => {
  // get the client
  // create the connection
  Firebird.attach(options, (err, db) => {
    if (err) reject(err);

    // db = DATABASE
    db.query(query, params, (queryError, result) => {
      if (queryError) reject(queryError);
      // IMPORTANT: close the connection
      db.detach();
      resolve(result);
    });
  });
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token
  }),
);

app.use('/api', router);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
    pretty: true
  })),
);

app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`); // eslint-disable-line
});

export default app;
