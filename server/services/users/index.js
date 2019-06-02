import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit, skip } = req.query;
  const data = await executeQuery(
    'SELECT FIRST ? SKIP ? FB_USR.ID, FB_USR.TABNUM, FB_USR.LNAME, FB_USR.SNAME, FB_USR.FNAME, FB_USR.EMAIL, FB_POD.NAME FROM FB_USR INNER JOIN FB_POD ON FB_USR.PODR = FB_POD.ID ORDER BY ID',
    [limit || 5, skip || 0],
  );
  const [{ COUNT }] = await executeQuery('SELECT COUNT(PODR) FROM FB_USR');
  return res.json({ count: COUNT, data });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await executeQuery(
    'SELECT FB_USR.ID, FB_USR.TABNUM, FB_USR.LNAME, FB_USR.SNAME, FB_USR.FNAME, FB_USR.EMAIL, PODR, DOLZ, PHONE, FB_KEY_H.ID AS KEY FROM FB_USR INNER JOIN FB_KEY_H ON FB_USR.ID = FB_KEY_H.USR WHERE FB_USR.ID = ?',
    [id],
  );
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const {
    FNAME, LNAME, SNAME, DOLZ, PODR, EMAIL, PHONE, KEY
  } = user;
  await executeQuery(
    'UPDATE FB_USR SET FNAME=?,LNAME=?,SNAME=?,DOLZ=?,PODR=?,EMAIL=?,PHONE=? WHERE ID=?',
    [FNAME, LNAME, SNAME, DOLZ, PODR, EMAIL, PHONE, id],
  );
  
  await executeQuery(
    'UPDATE FB_KEY_H SET ID=? WHERE USR=?',
    [KEY, id],
  );
  res.json('ok');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await executeQuery(
    'DELETE FROM FB_USR WHERE ID=?', [id]
  );
  res.json('ok');
});

router.post('/', async (req, res) => {
  const { user } = req.body;
  if (Object.keys(user).length < 8) {
    return res.sendStatus(400);
  }
  const {
    FNAME, LNAME, SNAME, DOLZ, PODR, EMAIL, PHONE, KEY
  } = user;
  const [{ COUNT }] = await executeQuery('SELECT COUNT(TABNUM) FROM FB_USR');
  const ID = new Date().getTime();
  await executeQuery(
    'INSERT INTO FB_USR (FNAME,LNAME,SNAME,DOLZ,PODR,EMAIL,PHONE,TABNUM,ID) values (?,?,?,?,?,?,?,?,?)',
    [FNAME, LNAME, SNAME, DOLZ, PODR, EMAIL, PHONE, COUNT + 1, ID],
  );
  await executeQuery(
    'INSERT INTO FB_KEY_H (USR,ID) values (?,?)',
    [ID, KEY],
  );
  return res.json('ok');
});

export default router;
