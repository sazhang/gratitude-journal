const express = require('express');
const Entry = require('../models/Entry');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch(err) {
    res.json({message: err});
  }
});


router.post('/', async (req, res) => {
  if (!req.body.summary) return res.status(400).send('Fill out the journal entry');
  const entry = {
    date: Date.now(),
    summary: req.body.summary,
    reflection: req.body.description
  };
  try {
    const savedEntry = await entry.save();
    res.json(savedEntry);
  } catch(err) {
    res.json({message: err});
  }
});

// router.get('/:id', (req, res) => {
//   const entry = entries.find(e => e.id === parseInt(req.params.id));
//   if (!entry) return res.status(404).send('Not found');
//   res.send(entry);
// });

// router.get('/:year/:month', (req, res) => {
//   res.send(req.query);
// });

// router.put('/:id', (req, res) => {
//   const entry = entries.find(e => e.id === parseInt(req.params.id));
//   if (!entry) return res.status(404).send('Not found');
//   if (req.body.summary) entry.summary = req.body.summary;
//   if (req.body.reflection) entry.reflection = req.body.reflection;
//   res.send(entry);
// });

// router.delete('/:id', (req, res) => {
//   const entry = entries.find(e => e.id === parseInt(req.params.id));
//   if (!entry) return res.status(404).send('Not found');

//   const index = entries.indexOf(entry);
//   entries.splice(index, 1);

//   res.send(entry);
// });

module.exports = router;
