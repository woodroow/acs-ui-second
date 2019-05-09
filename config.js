/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 5000,
  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL
      || `http://localhost:${process.env.PORT || 5000}`
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  // Firebird database
  firebird: {
    host: process.env.FIREBIRD_HOST || '127.0.0.1',
    database: process.env.FIREBIRD_DATABASE || 'cbase.fdb',
    port: process.env.FIREBIRD_PORT || 3050,
    user: process.env.FIREBIRD_USER || 'SYSDBA',
    password: process.env.FIREBIRDL_PASSWORD || 'masterkey'
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'myjwtsecret' }
  }
};
