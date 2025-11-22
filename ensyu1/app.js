const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILES = {
  when: path.join(DATA_DIR, 'when.json'),
  where: path.join(DATA_DIR, 'where.json'),
  who: path.join(DATA_DIR, 'who.json'),
  what: path.join(DATA_DIR, 'what.json')
};
const LABELS = {
  when: 'いつ',
  where: 'どこで',
  who: '誰が',
  what: '何を'
};

const ensureDataFiles = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const defaults = {
    when: ['朝9時に'],
    where: ['廊下で'],
    who: ['私が'],
    what: ['ご飯を食べた']
  };

  Object.entries(DATA_FILES).forEach(([key, filePath]) => {
    if (!fs.existsSync(filePath)) {
      const params = defaults[key] || [];
      const data = { params: params.map((value) => ({ param: value })) };
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  });
};

const readParams = (type) => {
  const filePath = DATA_FILES[type];
  if (!filePath || !fs.existsSync(filePath)) {
    return [];
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed.params) ? parsed.params.map((item) => item.param) : [];
  } catch (err) {
    console.error(`Failed to read ${type}:`, err);
    return [];
  }
};

const appendParam = (type, value) => {
  const filePath = DATA_FILES[type];
  if (!filePath) return;

  const params = readParams(type);
  params.push(value);
  const data = { params: params.map((param) => ({ param })) };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const randomPick = (items) => {
  if (!items.length) return '';
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

ensureDataFiles();

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/message', (req, res) => {
  const when = readParams('when');
  const where = readParams('where');
  const who = readParams('who');
  const what = readParams('what');

  const parts = [when, where, who, what].map(randomPick);
  const message = parts.every((part) => part) ? parts.join('') : 'まだメッセージが登録されていません。';

  res.render('message', { message });
});

app.get('/mainte', (req, res) => {
  const lists = {
    when: readParams('when'),
    where: readParams('where'),
    who: readParams('who'),
    what: readParams('what')
  };

  res.render('mainte', {
    labels: LABELS,
    lists,
    error: null
  });
});

app.post('/add', (req, res) => {
  const { type, text } = req.body;
  const trimmed = typeof text === 'string' ? text.trim() : '';

  if (!DATA_FILES[type] || !trimmed) {
    const lists = {
      when: readParams('when'),
      where: readParams('where'),
      who: readParams('who'),
      what: readParams('what')
    };

    return res.status(400).render('mainte', {
      labels: LABELS,
      lists,
      error: '種類と内容を正しく入力してください。'
    });
  }

  appendParam(type, trimmed);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Message game app listening on port ${PORT}`);
});
