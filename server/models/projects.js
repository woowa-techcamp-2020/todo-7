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
  static async findById(where) {
    const validatedWhere = this.validate({ ...where, ...this.defaultWhere });
    const queryStmt = `
      SELECT Projects.id AS 'project.id', Projects.title AS 'project.title', Projects.description AS 'project.description', 
             Groups.id AS 'group.id', Groups.title AS 'group.title', 
             Notes.id AS 'group.note.id', Notes.title AS 'group.note.title', Notes.description AS 'group.note.description'
      FROM Projects 
      INNER JOIN Groups ON Groups.projectId = Projects.id
      INNER JOIN Notes ON Notes.groupId = Groups.id
      WHERE ${Object.entries(validatedWhere)
        .map((o) => `${this.name}.${o[0]}=${o[1]}`)
        .join(' AND ')}
      ORDER BY Groups.id, Notes.id
    `;
    return (await this.pool.query(queryStmt))[0];
  }
}

module.exports = Projects;
