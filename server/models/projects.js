const Model = require('./model');

class Projects extends Model {
  static defaultWhere = { isActive: 1 };
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      name: { dataType: 'varchar', required: true },
      description: { dataType: 'text', required: false },
      isActive: { dataType: 'tinyint', required: false },
      createdAt: { dataType: 'datetime', required: false },
      updatedAt: { dataType: 'datetime', required: false },
    });
  }
}

module.exports = Projects;
