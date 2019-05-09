import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit, skip } = req.query;
  const data = await executeQuery(
    'SELECT FIRST ? SKIP ? FB_USR.ID, FB_USR.TABNUM, FB_USR.LNAME, FB_USR.SNAME, FB_USR.FNAME, FB_USR.EMAIL, FB_POD.NAME FROM FB_USR INNER JOIN FB_POD ON FB_USR.PODR = FB_POD.ID',
    [limit || 5, skip || 0],
  );
  const [{ COUNT }] = await executeQuery('SELECT COUNT(PODR) FROM FB_USR');
  return res.json({ count: COUNT, data });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await executeQuery(
    'SELECT * FROM FB_USR WHERE FB_USR.ID = ?',
    [id],
  );
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const {
    FNAME, LNAME, SNAME, DOLZ, PODR, EMAIL, PHONE
  } = user;
  await executeQuery(
    'UPDATE FB_USR SET FNAME=?,LNAME=?,SNAME=?,DOLZ=?,PODR=?,EMAIL=?,PHONE=? WHERE ID=?',
    [FNAME, LNAME, SNAME, DOLZ, PODR, EMAIL, PHONE, id],
  );
  res.json('ok');
});

export default router;
