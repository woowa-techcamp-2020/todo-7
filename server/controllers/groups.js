const Groups = require('../models/groups');
const Events = require('../models/events');

exports.create = async (req, res) => {
  const group = await Groups.create(req.body);
  const event = await Events.create({ projectId: req.body.projectId, title: 'created Group' });
  res.send({ group, event });
};

exports.findById = async (req, res) => {
  const group = await Groups.findOne('*', { id: req.params.id });
  if (!group) res.status(404).send('group not found');
  else res.send(group);
};

exports.update = async (req, res) => {
  await Groups.update(req.body);
  const event = await Events.create({ projectId: req.body.projectId, title: 'updated Group' });
  res.send(event);
};

exports.move = async (req, res) => {
  await Groups.move(req.body);
  const event = await Events.create({ projectId: req.body.projectId, title: 'moved Group' });
  res.send(event);
};

exports.delete = async (req, res) => {
  const group = await Groups.findOne('title', { id: parseInt(req.query.id) });
  await Groups.delete(parseInt(req.query.id));
  const event = await Events.create({ projectId: parseInt(req.query.projectId), title: `deleted ${group.title}` });
  res.send(event);
};
