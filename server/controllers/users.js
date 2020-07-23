const bcrypt = require('bcrypt');
const Users = require('../models/users');

exports.create = async (req, res) => {
  const input = req.body;
  const salt = await bcrypt.genSalt(+process.env.SALTROUNDS);
  input.password = await bcrypt.hash(input.password, salt);
  res.send(await Users.create(input));
};

exports.update = async (req, res) => {
  const user = await Users.update(req.body);
  const { id, name, email, phoneNo } = user;
  res.send({ id, name, email, phoneNo });
};

exports.findById = async (req, res) => {
  const user = await Users.findOne('id, username, nickname', {
    id: req.user.id,
  });
  res.send(user);
};

exports.findAll = async (req, res) => {
  const users = await Users.findAll('id, nickname');
  res.send({
    users,
    nickname: req.user.nickname,
  });
};

exports.findProjects = async (req, res) => {
  const projects = await Users.findProjects(req.user.id);
  res.send({
    projects,
    nickname: req.user.nickname,
  });
};

exports.loginCheck = async (req, res) => res.sendStatus(req.isAuthenticated() ? 200 : 401);
