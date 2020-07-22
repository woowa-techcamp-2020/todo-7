const Model = require('./model');

class UserProjectRelations extends Model {
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      userId: { dataType: 'int', required: true },
      projectId: { dataType: 'int', required: true },
      authority: { dataType: 'enum', required: false },
    });
  }
}

module.exports = UserProjectRelations;
