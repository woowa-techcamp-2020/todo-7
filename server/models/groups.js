const Model = require('./model');

class Groups extends Model {
  static defaultWhere = { isActive: 1 };
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      projectId: { dataType: 'int', required: true },
      title: { dataType: 'varchar', required: true },
      order: { dataType: 'int', required: false },
      isActive: { dataType: 'tinyint', required: false },
      createdAt: { dataType: 'datetime', required: false },
      updatedAt: { dataType: 'datetime', required: false },
    });
  }
  static generateOrderSubQueryStmt = (data) => `, (SELECT COALESCE(MAX(\`order\`),0) FROM Groups t WHERE t.projectId = ${data.projectId}) + 1`;
}

module.exports = Groups;
