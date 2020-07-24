const Notes = require('../models/notes');
const Events = require('../models/events');

exports.create = async (req, res) => {
  const note = await Notes.create(req.body);
  const event = await Events.create({
    projectId: req.body.projectId,
    title: `${req.user.nickname} created card ${req.body.title}`,
  });
  res.send({ note, event });
};

exports.findById = async (req, res) => {
  const note = await Notes.findOne('*', { id: req.params.id });
  if (!note) res.status(404).send('note not found');
  else res.send(note);
};

exports.update = async (req, res) => {
  await Notes.update(req.body);
  const event = await Events.create({
    projectId: req.body.projectId,
    title: `${req.user.nickname} updated card ${req.body.title}`,
  });
  res.send(event);
};

exports.move = async (req, res) => {
  const note = await Notes.findTitleAndGroupTitleById(req.body.id);
  await Notes.move(req.body);
  if (note.groupTitle === req.body.groupTitle) {
    res.send('successfully moved');
  } else {
    const event = await Events.create({
      projectId: req.body.projectId,
      title: `${req.user.nickname} moved card ${note.title} from ${note.groupTitle} to ${req.body.groupTitle}`,
    });
    res.send(event);
  }
};

exports.delete = async (req, res) => {
  const note = await Notes.findOne('title', { id: parseInt(req.query.id) });
  await Notes.delete(parseInt(req.query.id));
  const event = await Events.create({
    projectId: parseInt(req.query.projectId),
    title: `${req.user.nickname} deleted card ${note.title}`,
  });
  res.send(event);
};
