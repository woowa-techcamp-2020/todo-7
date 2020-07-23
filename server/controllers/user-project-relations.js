const UserProjectRelations = require('../models/user-project-relations');

exports.create = async (req, res) => {
  const userProjectRelation = await UserProjectRelations.create(req.body);
  res.send(userProjectRelation);
};

exports.findById = async (req, res) => {
  const userProjectRelation = await UserProjectRelations.findOne('*', {
    id: req.params.id,
  });
  if (!userProjectRelation) res.status(404).send('user project relation not found');
  else res.send(userProjectRelation);
};

exports.update = async (req, res) => {
  await UserProjectRelations.update(req.body);
  res.send('successfully updated');
};

exports.delete = async (req, res) => {
  await UserProjectRelations.delete(req.params.id);
  res.send('successfully deleted');
};
