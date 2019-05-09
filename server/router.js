import events from './services/events';
import users from './services/users';
import departments from './services/departments';
import positions from './services/positions';
import auth from './services/auth';

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

export default router;
