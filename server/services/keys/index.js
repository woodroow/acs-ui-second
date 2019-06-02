import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await executeQuery('SELECT * FROM FB_KEY');
  return res.json(data);
});

router.get('/list', async (req, res) => {
  const { limit, skip } = req.query;
  const data = await executeQuery(
    'SELECT FIRST ? SKIP ? * FROM FB_KEY ORDER BY GUID',
    [limit || 5, skip || 0],
  );
  const [{ COUNT }] = await executeQuery('SELECT COUNT(GUID) FROM FB_KEY');
  return res.json({ count: COUNT, data });
});


router.post('/', async (req, res) => {
  const { item } = req.body;
  if (!item.ID) {
    return res.sendStatus(400);
  }
  const { ID } = item;
  const [{ COUNT }] = await executeQuery('SELECT COUNT(ID) FROM FB_KEY WHERE ID=?',
    [ID]);
  if (COUNT) {
    return res.sendStatus(400);
  }
  const GDATE = new Date();
  const GUID = GDATE.getTime();
  const INHEX = Number(ID).toString(16).toUpperCase();
  await executeQuery(
    'INSERT INTO FB_KEY (ID,GDATE,GUID,INHEX) values (?,?,?,?)',
    [ID, GDATE, GUID, INHEX],
  );
  return res.json('ok');
});

export default router;
