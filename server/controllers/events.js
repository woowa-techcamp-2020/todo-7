const Events = require('../models/events');

exports.create = async (req, res) => {
  const event = await Events.create(req.body);
  res.send(event);
};

exports.findById = async (req, res) => {
  const event = await Events.findOne('*', { id: req.params.id });
  if (!event) res.status(404).send('event not found');
  else res.send(event);
};
