const Notes = require('../models/notes');
const Events = require('../models/events');

exports.create = async (req, res) => {
  const note = await Notes.create(req.body);
  const event = await Events.create({ projectId: req.body.projectId, title: 'created Note' });
  res.send({ note, event });
};

exports.findById = async (req, res) => {
  const note = await Notes.findOne('*', { id: req.params.id });
  if (!note) res.status(404).send('note not found');
  else res.send(note);
};

exports.update = async (req, res) => {
  await Notes.update(req.body);
  const event = await Events.create({ projectId: req.body.projectId, title: 'updated Note' });
  res.send(event);
};

exports.move = async (req, res) => {
  await Notes.update(req.body);
  const event = await Events.create({ projectId: req.body.projectId, title: 'moved Note' });
  res.send(event);
};

exports.delete = async (req, res) => {
  await Notes.delete(req.params.id);
  const event = await Events.create({ projectId: req.body.projectId, title: 'deleted Note' });
  res.send(event);
};
