import md5 from 'md5';
import { User } from '../../data/models';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit, skip } = req.query;
  const { rows, count } = await User.findAndCountAll({
    offset: skip,
    limit
  });
  return res.json({ count, data: rows });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const {
    email, admin
  } = user;
  await User.update({
    email,
    admin
  }, {
    where: {
      email: id
    }
  });
  res.json('ok');
});

router.put('/password/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.sendStatus(400);
  }
  await User.update({
    password: md5(password)
  }, {
    where: {
      email: id
    }
  });
  return res.json('ok');
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await User.destroy({
    where: {
      email: id
    }
  });
  res.json('ok');
});

router.post('/', async (req, res) => {
  const { user } = req.body;
  if (!user || !user.email) {
    return res.sendStatus(400);
  }
  const {
    email, password, admin
  } = user;
  try {
    await User.create({
      email,
      emailConfirmed: true,
      password: md5(password),
      admin
    });
  } catch (error) {
    return res.sendStatus(400);
  }
  
  return res.json('ok');
});

export default router;
