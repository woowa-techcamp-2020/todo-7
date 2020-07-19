const Groups = require('../models/groups');

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
  res.send('successfully updated');
};

exports.delete = async (req, res) => {
  await Groups.delete(req.params.id);
  res.send('successfully deleted');
};
