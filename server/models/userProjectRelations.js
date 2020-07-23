const Model = require('./model');

class UserProjectRelations extends Model {
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      projectId: { dataType: 'int', required: true },
      userId: { dataType: 'text', required: true },
      authority: { dataType: 'varchar', required: true },
    });
  }
  static async bulkCreate(users, projectId) {
    const queryStmt = `
      insert into ${this.name} (projectId, userId, authority)
      values ${users.map((user) => `(${projectId}, ${user.id}, '${user.authority}')`)};
    `;
    console.log(queryStmt);
    await this.pool.query(queryStmt);
  }
}

module.exports = UserProjectRelations;
