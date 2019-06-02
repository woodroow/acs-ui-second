import jwt from 'jsonwebtoken';
import md5 from 'md5';
import config from '../../config';
import { User } from '../../data/models';

const express = require('express');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }
  const findUser = await User.findOne({
    attributes: ['id', 'email', 'password', 'admin'],
    where: { email, password: md5(password) }
  });
  if (!findUser) {
    return res.sendStatus(400);
  }
  const saveUser = {
    email: findUser.email,
    admin: findUser.admin,
    id: findUser.id
  };
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(saveUser, config.auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: false });
  return res.json('success');
});

router.get('/testlogin', async (req, res) => {
  const findUser = await User.findOne({
    attributes: ['id', 'email', 'password', 'admin'],
    where: { email: 'admin@example.com', password: md5('123456') }
  });
  if (!findUser) {
    return res.sendStatus(400);
  }
  const saveUser = {
    email: findUser.email,
    admin: findUser.admin,
    id: findUser.id
  };
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(saveUser, config.auth.jwt.secret, { expiresIn });
  res.cookie('id_tokenasdasd', token, { maxAge: 1000 * expiresIn, httpOnly: false });
  return res.sendStatus(200);
});

/*
router.get('/create', async (req, res) => {
  const user = await User.create({
    email: 'admin@example.com',
    emailConfirmed: true,
    password: md5('123456'),
    admin: true,
  });
  const user2 = await User.create({
    email: 'moderator@example.com',
    emailConfirmed: true,
    password: md5('123456'),
    admin: false,
  });
  res.json(user);
});
*/

router.get('/logout', async (req, res) => {
  res.clearCookie('id_token');
  res.redirect('/login');
});

export default router;
