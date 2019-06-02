import { executeQuery } from '../../index';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const [{ COUNT: users }] = await executeQuery('SELECT COUNT(ID) FROM FB_USR');
  const [{ COUNT: guests }] = await executeQuery('SELECT COUNT(ID) FROM FB_USR WHERE GUEST = ? ', [1]);
  const [{ COUNT: keys }] = await executeQuery('SELECT COUNT(ID) FROM FB_KEY');
  const [{ COUNT: departments }] = await executeQuery('SELECT COUNT(ID) FROM FB_POD');
  const [{ COUNT: systemEvents }] = await executeQuery('SELECT COUNT(USR) FROM FB_SYL');
  const [{ COUNT: controllers }] = await executeQuery('SELECT COUNT(ID) FROM FB_DVS');
  const [{ COUNT: events }] = await executeQuery('SELECT COUNT(ID) FROM FB_EVN');
  const [{ COUNT: places }] = await executeQuery('SELECT COUNT(ID) FROM FB_ODO');
  const result = [
    { name: 'Пользователей', count: users },
    { name: 'Гостей', count: guests },
    { name: 'Ключей', count: keys },
    { name: 'Подразделений', count: departments },
    { name: 'Событий', count: events },
    { name: 'Системных событий', count: systemEvents },
    { name: 'Мест', count: places },
    { name: 'Контроллеров', count: controllers }];
  return res.json(result);
});

router.get('/events', async (req, res) => {
  const result = await executeQuery('SELECT EXTRACT (Hour FROM DT) as "HOUR", COUNT(*) FROM FB_EVN GROUP BY EXTRACT (Hour FROM DT) ');
  const today = [];
  result.map(item => { today[item.HOUR] = item.COUNT; return true; });
  const types = await executeQuery('SELECT FIRST 3 EVN, COUNT(*) FROM FB_EVN GROUP BY EVN ORDER BY COUNT(*) DESC');
  return res.json({ today, yesterday: [], types });
});

export default router;
