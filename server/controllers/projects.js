const Projects = require('../models/projects');
const Groups = require('../models/groups');
const Events = require('../models/events');
const UserProjectRelations = require('../models/userProjectRelations');

exports.create = async (req, res) => {
  const project = await Projects.create({ title: req.body.title });
  await Groups.create({ title: 'To do', projectId: project.id });
  await Groups.create({ title: 'Doing', projectId: project.id });
  await Groups.create({ title: 'Done', projectId: project.id });
  await UserProjectRelations.bulkCreate(req.body.users, project.id);
  res.send({ id: project.id });
};

exports.get = async (req, res) => {
  const project = await Projects.findById({ id: req.params.id });
  if (!project) res.status(404).send('project not found');
  else {
    project.events = await Events.getByProjectId({ id: req.params.id });
    project.authority = (
      await UserProjectRelations.findOne('authority', {
        userId: req.user.id,
        projectId: req.params.id,
      })
    ).authority;
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
