const Model = require('./model');
const { stringify } = require('querystring');

class Projects extends Model {
  static defaultWhere = { isActive: 1 };
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      title: { dataType: 'varchar', required: true },
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
             Notes.id AS 'noteId', Notes.title AS 'noteTitle', Notes.description AS 'noteDescription', Notes.isActive AS 'noteIsActive'
      FROM Projects 
      LEFT JOIN Groups ON Groups.projectId = Projects.id
      LEFT JOIN Notes ON Notes.groupId = Groups.id
      WHERE ${Object.entries(validatedWhere)
        .map((o) => `${this.name}.${o[0]}=${o[1]}`)
        .join(' AND ')} AND Groups.isActive=1
      ORDER BY Groups.order, Notes.order DESC
    `;
    const result = (await this.pool.query(queryStmt))[0];
    return this.parseData(result);
  }

  static getProjectInfo(obj) {
    return { id: obj.projectId, title: obj.projectTitle, description: obj.projectDescription };
  }

  static getGroupInfo(obj, notes) {
    return { id: obj.groupId, title: obj.groupTitle, notes: notes ? notes : [] };
  }

  static findUnique(inputArr, key) {
    return inputArr.reduce((a, b) => (a.includes(b[key]) ? a : [...a, b[key]]), []);
  }

  static parseData(data) {
    if (data.length === 0) {
      return {};
    }
    const project = this.getProjectInfo(data[0]);

    const dataByGroup = this.findUnique(data, 'groupId').map((value) => data.filter((row) => row['groupId'] === value));

    const groups = [];
    dataByGroup.forEach((group) => groups.push(this.getGroupInfo(group[0])));

    for (let i = 0; i < groups.length; i++) {
      data.forEach((note) => {
        if (note.groupId === groups[i].id && note.noteIsActive) {
          groups[i].notes.push({
            id: note.noteId,
            title: note.noteTitle,
            description: note.noteDescription,
          });
        }
      });
    }
    project.groups = groups;

    return project;
  }
}

module.exports = Projects;
