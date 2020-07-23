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
             Notes.id AS 'noteId', Notes.title AS 'noteTitle', Notes.description AS 'noteDescription'
      FROM Projects 
      LEFT JOIN Groups ON Groups.projectId = Projects.id
      LEFT JOIN Notes ON Notes.groupId = Groups.id
      WHERE ${Object.entries(validatedWhere)
        .map((o) => `${this.name}.${o[0]}=${o[1]}`)
        .join(' AND ')} AND Groups.isActive=1
      ORDER BY Groups.order DESC, Notes.order DESC
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

  static deleteKeys(obj, keys, prefix) {
    keys.forEach((key) => {
      let newKey = prefix ? prefix + this.capitalizeFirstLetter(key) : key;
      delete obj[`${newKey}`];
    });
    return obj;
  }

  static capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static findUnique(inputArr, key) {
    return inputArr.reduce((a, b) => (a.includes(b[key]) ? a : [...a, b[key]]), []);
  }

  static noteNullCheck(groups) {
    return groups.some((group) => {
      if (!group.noteId) {
        return true;
      }
    });
  }

  static parseData(data) {
    if (data.length === 0) {
      return {};
    }
    const project = this.getProjectInfo(data[0]);

    const newData = data.map((obj) => {
      return this.deleteKeys(obj, Object.keys(project), 'project');
    });

    const dataByGroup = this.findUnique(newData, 'groupId').map((value) =>
      data.filter((row) => row['groupId'] === value),
    );

    const groups = [];

    for (let i = 0; i < dataByGroup.length; i++) {
      let group = dataByGroup[i];
      let noteIsNull = this.noteNullCheck(group);
      if (noteIsNull) {
        groups.push(this.getGroupInfo(group.pop()));
        continue;
      }

      let notes = [];

      dataByGroup[i].forEach((note) => {
        notes.push({ id: note.noteId, title: note.noteTitle, description: note.noteDescription });
      });

      groups.push(this.getGroupInfo(dataByGroup[i].pop(), notes));
    }
    project.groups = groups;

    return project;
  }
}

module.exports = Projects;
