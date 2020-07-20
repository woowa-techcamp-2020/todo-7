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
      SELECT Projects.id AS 'projectId', Projects.title AS 'projectTitle', Projects.description AS 'projectDescription', 
             Groups.id AS 'groupId', Groups.title AS 'groupTitle', 
             Notes.id AS 'noteId', Notes.title AS 'noteTitle', Notes.description AS 'noteDescription'
      FROM Projects 
      INNER JOIN Groups ON Groups.projectId = Projects.id
      INNER JOIN Notes ON Notes.groupId = Groups.id
      WHERE ${Object.entries(validatedWhere)
        .map((o) => `${this.name}.${o[0]}=${o[1]}`)
        .join(' AND ')}
      ORDER BY Groups.id, Notes.id
    `;
    const result = (await this.pool.query(queryStmt))[0];
    return this.parseData(result);
  }

  static parseData(data) {
    const project = {};
    let prevGroupId;
    let prevGroupTitle;
    let prevGroupNotes = [];

    data.map((obj, idx, arr) => {
      if (idx === 0) {
        project.id = obj.projectId;
        project.title = obj.projectTitle;
        project.description = obj.projectDescription;
        project.groups = [];
        prevGroupId = obj.groupId;
        prevGroupTitle = obj.groupTitle;
      }
      if (prevGroupId !== obj.groupId) {
        project.groups.push({
          id: prevGroupId,
          title: prevGroupTitle,
          notes: prevGroupNotes.slice(0),
        });
        prevGroupId = obj.groupId;
        prevGroupTitle = obj.groupTitle;
        prevGroupNotes = [];
      }
      prevGroupNotes.push({
        id: obj.noteId,
        title: obj.noteTitle,
        description: obj.noteDescription,
      });
      if (arr.length === idx + 1) {
        project.groups.push({
          id: prevGroupId,
          title: prevGroupTitle,
          notes: prevGroupNotes.slice(0),
        });
      }
    });

    return project;
  }
}

module.exports = Projects;
