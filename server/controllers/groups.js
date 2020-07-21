const Groups = require('../models/groups');
const Events = require('../models/events');

exports.create = async (req, res) => {
  const group = await Groups.create(req.body);
  res.send(group);
};

exports.findById = async (req, res) => {
  const group = await Groups.findOne('*', { id: req.params.id });
  if (!group) res.status(404).send('group not found');
  else res.send(group);
};

exports.update = async (req, res) => {
  await Groups.update(req.body);
  const event = await Events.create({ projectId: req.body.projectId, description: 'updated Group' });
  res.send(event);
};

exports.delete = async (req, res) => {
  await Groups.delete(req.params.id);
  res.send('successfully deleted');
};
