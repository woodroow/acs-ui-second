import events from './services/events';
import users from './services/users';
import departments from './services/departments';
import positions from './services/positions';
import keys from './services/keys';
import auth from './services/auth';
import statistics from './services/statistics';
import systemEvents from './services/system_events';
import systemUsers from './services/system_users';

const express = require('express');

const router = express.Router();

// define the home page route
router.get('/', async (req, res) => {
  res.json('main');
});
router.use('/events', events);
router.use('/users', users);
router.use('/departments', departments);
router.use('/positions', positions);
router.use('/auth', auth);
router.use('/statistics', statistics);
router.use('/keys', keys);
router.use('/system_events', systemEvents);
router.use('/system_users', systemUsers);

export default router;
