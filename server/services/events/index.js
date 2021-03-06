import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit, skip } = req.query;
  const data = await executeQuery(
    'SELECT FIRST ? SKIP ? * FROM FB_EVN INNER JOIN FB_USR ON FB_USR.ID = FB_EVN.USR INNER JOIN FB_DVS ON FB_EVN.DVS = FB_DVS.ID',
    [limit || 10, skip || 0],
  );
  const [{ COUNT }] = await executeQuery('SELECT COUNT(USR) FROM FB_EVN INNER JOIN FB_USR ON FB_USR.ID = FB_EVN.USR INNER JOIN FB_DVS ON FB_EVN.DVS = FB_DVS.ID');
  return res.json({ count: COUNT, data });
});

export default router;
