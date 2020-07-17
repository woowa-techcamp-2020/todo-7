const bcrypt = require('bcrypt');
const Users = require('../models/users');
exports.create = async (req, res) => {
    const input = req.body;
    const salt = await bcrypt.genSalt(+process.env.SALTROUNDS);
    input.password = await bcrypt.hash(input.password, salt);
    res.send(await Users.create(input));
}

exports.update = async (req, res) => {
    const user = await Users.update(req.body);
    const { id, name, email, phoneNo } = user;
    res.send({ id, name, email, phoneNo });
}

exports.findById = async (req, res) => {
    const user = await Users.findOne('id, username, nickname', { id : req.user.id });
    res.send(user);
}
