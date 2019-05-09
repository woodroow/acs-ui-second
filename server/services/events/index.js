import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit, skip } = req.query;
  const data = await executeQuery(
    'SELECT FIRST ? SKIP ? * FROM FB_EVN INNER JOIN FB_USR ON FB_USR.ID = FB_EVN.USR',
    [limit || 10, skip || 50],
  );
  const [{ COUNT }] = await executeQuery('SELECT COUNT(USR) FROM FB_EVN');
  return res.json({ count: COUNT, data });
});

export default router;
