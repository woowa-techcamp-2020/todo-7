const Model = require('./model');

class Users extends Model {
  static defaultWhere = { isActive: 1 };
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      username: { dataType: 'varchar', required: true },
      password: { dataType: 'varchar', required: true },
      nickname: { dataType: 'varchar', required: true },
      avatar: { dataType: 'varchar', required: false },
      isActive: { dataType: 'tinyint', required: false },
      createdAt: { dataType: 'datetime', required: false },
      updatedAt: { dataType: 'datetime', required: false },
    });
  }

  static findProjects = async (id) => {
    const queryStmt = `
      SELECT Projects.*
      FROM Projects
      INNER JOIN UserProjectRelations
      ON Projects.id = UserProjectRelations.projectId
      WHERE UserProjectRelations.userId = ${id};
    `;
    console.log(queryStmt);
    return (await this.pool.query(queryStmt))[0];
  };
}

module.exports = Users;
