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

  static async move(groups) {
    const queryStmt =
      groups.targetId !== 0
        ? `
        UPDATE Groups AS g,
        (SELECT \`order\`, \`projectId\` FROM Groups WHERE id = ${groups.targetId}) as target
        SET g.\`order\` = CASE WHEN g.\`id\` = ${groups.id} THEN target.\`order\`
            WHEN (g.\`order\` >= target.\`order\` && g.\`projectId\` = target.\`projectId\`) THEN g.\`order\` + 1
            ELSE g.\`order\` END;
      `
        : `
        UPDATE Groups AS g,
        (SELECT COALESCE(MAX(\`order\`),0) AS \`maxOrder\` FROM Groups WHERE projectId = ${groups.projectId}) AS a
          SET \`order\` = a.\`maxOrder\` + 1 
          WHERE \`id\` = ${groups.id}
      `;
    return await this.pool.query(queryStmt);
  }
}

module.exports = Groups;
