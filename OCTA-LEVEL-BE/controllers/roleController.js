const Role = require('./../models/roleModel');
const factory = require('./../controllers/handlerFactory');

exports.getAllRoles = factory.getAll(Role);
exports.getRole = factory.getOne(Role);
exports.addRole = factory.createOne(Role);
exports.updateRole = factory.updateOne(Role);
exports.deleteRole = factory.deleteOne(Role);
