const Model = require('./model');

class Events extends Model {
  static init() {
    return super.init({
      id: { dataType: 'int', required: false },
      projectId: { dataType: 'int', required: true },
      description: { dataType: 'text', required: true },
      createdAt: { dataType: 'datetime', required: false },
      updatedAt: { dataType: 'datetime', required: false },
    });
  }
  static async getByProjectId(where) {
    const queryStmt = `
      SELECT Events.id, Events.description
      FROM Events
      INNER JOIN Projects
      ON projectId = Projects.id
      WHERE ${Object.entries(where)
        .map((o) => `Projects.${o[0]}=${o[1]}`)
        .join(' AND ')}
      ORDER BY Events.id DESC;
    `;
    const result = (await this.pool.query(queryStmt))[0];
    return result;
  }
}

module.exports = Events;
