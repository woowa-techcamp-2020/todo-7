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
  static generateOrderSubQueryStmt = (data) => `, (SELECT COALESCE(MAX(\`order\`),0) FROM Notes t WHERE t.groupId = ${data.groupId}) + 1`;

  static async move(notes) {
    const queryStmt = notes.targetId
      ? `
        UPDATE Notes AS note,
        (SELECT \`order\`, \`groupId\` FROM Notes WHERE id = ${notes.targetId}) as target
        SET note.\`order\` = CASE WHEN note.\`id\` = ${notes.id} THEN target.\`order\`
            WHEN (note.\`order\` >= target.\`order\` && note.\`groupId\` = target.\`groupId\`) THEN note.\`order\` + 1
            ELSE note.\`order\` END,
          note.\`groupId\` = CASE WHEN (note.\`id\` = ${notes.id}) THEN target.\`groupId\`
            ELSE note.\`groupId\` END;
      `
      : `
        UPDATE Notes AS note,
        (SELECT COALESCE(MAX(\`order\`),0) AS \`maxOrder\` FROM Notes WHERE groupId = ${notes.groupId}) AS a
          SET \`groupId\` = 1, \`order\` = a.\`maxOrder\` + 1 
          WHERE \`id\` = ${notes.id}
      `;
    return await this.pool.query(queryStmt);
  }

  static async findTitleAndGroupTitleById(id) {
    const queryStmt = `
      SELECT Notes.title AS title, Groups.title AS groupTitle 
      FROM Notes INNER JOIN Groups ON Notes.groupId = Groups.id 
      WHERE Notes.id = ${id};
    `;
    return (await this.pool.query(queryStmt))[0][0];
  }
}

module.exports = Notes;
