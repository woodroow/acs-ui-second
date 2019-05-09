import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await executeQuery('SELECT * FROM FB_POD');
  return res.json(data);
});

export default router;
