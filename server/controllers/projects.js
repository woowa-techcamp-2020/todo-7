const Projects = require('../models/projects');
const Events = require('../models/events');

exports.create = async (req, res) => {
  const project = await Projects.create(req.body);
  res.send(project);
};

exports.get = async (req, res) => {
  const project = await Projects.findById({ id: req.params.id });
  if (!project) res.status(404).send('project not found');
  else {
    const events = await Events.getByProjectId({ id: req.params.id });
    project.events = events;
    res.send(project);
  }
};

exports.update = async (req, res) => {
  await Projects.update(req.body);
  res.send('successfully updated');
};

exports.delete = async (req, res) => {
  await Projects.delete(req.params.id);
  res.send('successfully deleted');
};
