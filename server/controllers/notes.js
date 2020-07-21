const Notes = require('../models/notes');
const Events = require('../models/events');

exports.create = async (req, res) => {
  const note = await Notes.create(req.body);
  res.send(note);
};

exports.findById = async (req, res) => {
  const note = await Notes.findOne('*', { id: req.params.id });
  if (!note) res.status(404).send('note not found');
  else res.send(note);
};

exports.update = async (req, res) => {
  await Notes.update(req.body);
  const event = await Events.create({ projectId: req.body.projectId, description: 'updated Note' });
  res.send(event);
};
};

exports.delete = async (req, res) => {
  await Notes.delete(req.params.id);
  res.send('successfully deleted');
};
