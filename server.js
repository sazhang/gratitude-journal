const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const entries = [
  {
    id: 1,
    date: new Date('December 1, 2019 11:13:00'),
    summary: 'A run around Florida’s Fisher Island with a slight breeze that kept me cool',
    reflection: ''
  },
  {
    id: 2,
    date: new Date('December 2, 2010 10:15:00'),
    summary: 'Eating cold melon on a bench in the sun',
    reflection: ''
  },
  {
    id: 3,
    date: new Date('December 3, 2010 09:15:00'),
    summary: 'A long and hilarious chat with Gayle about her blind date with Mr. Potato Head',
    reflection: ''
  },
  {
    id: 4,
    date: new Date('December 4, 2010 12:15:00'),
    summary: 'Sorbet in a cone, so sweet that I literally licked my finger',
    reflection: ''
  },
  {
    id: 5,
    date: new Date('December 5, 2010 12:15:00'),
    summary: 'Maya Angelou calling to read me a new poem',
    reflection: ''
  }
];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/entries', (req, res) => {
  res.send(entries);
});

app.get('/entries/:id', (req, res) => {
  const entry = entries.find(e => e.id === parseInt(req.params.id));
  if (!entry) return res.status(404).send('Not found');
  res.send(entry);
});

app.get('/entries/:year/:month', (req, res) => {
  res.send(req.query);
});

app.post('/entries', (req, res) => {
  if (!req.body.summary) return res.status(400).send('Fill out the journal entry');
  const entry = {
    id: entries.length + 1,
    date: Date.now(),
    summary: req.body.summary,
    reflection: ''
  };
  entries.push(entry);
  res.send(entry);
});

app.put('/entries/:id', (req, res) => {
  const entry = entries.find(e => e.id === parseInt(req.params.id));
  if (!entry) return res.status(404).send('Not found');
  if (req.body.summary) entry.summary = req.body.summary;
  if (req.body.reflection) entry.reflection = req.body.reflection;
  res.send(entry);
});

app.delete('/entries/:id', (req, res) => {
  const entry = entries.find(e => e.id === parseInt(req.params.id));
  if (!entry) return res.status(404).send('Not found');

  const index = entries.indexOf(entry);
  entries.splice(index, 1);

  res.send(entry);
});