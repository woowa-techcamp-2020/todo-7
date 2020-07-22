const Model = require('./model');

class Notes extends Model {
  static defaultWhere = { isActive: 1 };
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      groupId: { dataType: 'int', required: true },
      title: { dataType: 'varchar', required: true },
      description: { dataType: 'text', required: false },
      order: { dataType: 'int', required: false },
      isActive: { dataType: 'tinyint', required: false },
      createdAt: { dataType: 'datetime', required: false },
      updatedAt: { dataType: 'datetime', required: false },
    });
  }
  static generateOrderSubQueryStmt = (data) => `, (SELECT COUNT(*) FROM Notes t WHERE t.groupId = ${data.groupId})`
}

module.exports = Notes;
