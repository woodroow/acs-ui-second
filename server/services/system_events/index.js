import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit, skip } = req.query;
  const data = await executeQuery(
    'SELECT FIRST ? SKIP ? * FROM FB_SYL INNER JOIN FB_USR ON FB_SYL.USR = FB_USR.TABNUM ORDER BY EV_T',
    [limit || 10, skip || 0],
  );
  const [{ COUNT }] = await executeQuery('SELECT COUNT(EVNT) FROM FB_SYL');
  return res.json({ count: COUNT, data });
});

export default router;
