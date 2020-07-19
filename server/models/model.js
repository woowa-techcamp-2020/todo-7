const createHttpError = require('http-errors');
const mysql = require('mysql2/promise');
const { isEmpty } = require('../utils/helper');

class Model {
  static pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  static defaultWhere = {};

  static validationError = createHttpError(400, 'invalid input');

  static init = function (attributes) {
    this.attributes = attributes;
  };

  static validate = function (input) {
    const validatedInput = {};
    for (const [name, value] of Object.entries(input)) {
      console.log(name, value);
      if (!this.attributes[name] || !value) continue;
      switch (this.attributes[name].dataType) {
        case 'tinyint':
          if (value == 0 || value == 1) validatedInput[name] = value;
          else throw this.validationError;
          break;
        case 'int':
          if (typeof value === 'number' || Number(value).toString() === value) {
            validatedInput[name] = value;
          } else throw this.validationError;
          break;
        case 'varchar':
        case 'text':
          validatedInput[name] = `'${value}'`;
          break;
        default:
          throw this.validationError;
      }
    }
    return validatedInput;
  };

  static createFindQueryStmt = function (isOne, attributes = '*', where = {}) {
    const validatedWhere = this.validate({ ...where, ...this.defaultWhere });
    const queryStmt = `
      SELECT ${attributes} 
        FROM ${this.name}
        ${
          !isEmpty(validatedWhere)
            ? `WHERE ${Object.entries(validatedWhere)
                .map((o) => `${o[0]}=${o[1]}`)
                .join(' AND ')}`
            : ''
        }
        ${isOne ? 'LIMIT 1' : ''}
      `;
    return queryStmt;
  };

  static findOne = async function (attributes, where) {
    const queryStmt = this.createFindQueryStmt(true, attributes, where);
    return (await this.pool.query(queryStmt))[0][0];
  };

  static findAll = async function (attributes, where) {
    const queryStmt = this.createFindQueryStmt(false, attributes, where);
    return (await this.pool.query(queryStmt))[0];
  };

  static create = async function (input) {
    const validatedInput = this.validate(input);
    const queryStmt = `
        INSERT INTO ${this.name}
        (${Object.keys(validatedInput)})
        VALUES (${Object.values(validatedInput)})
      `;
    return {
      id: (await this.pool.query(queryStmt))[0].insertId,
      ...input,
    };
  };

  static update = async function (input) {
    if (!input.id) throw this.validationError;
    const validatedInput = this.validate(input);
    const queryStmt = `
        UPDATE ${this.name}
        SET ${Object.entries(validatedInput)
          .map((o) => `${o[0]}=${o[1]}`)
          .join(', ')}
        WHERE id = ${validatedInput.id}
      `;
    return await this.pool.query(queryStmt);
  };

  static delete = async function (id) {
    if (!id) throw this.validationError;
    return await this.pool.query(`
      UPDATE ${this.name}
      SET isActive = 0
      WHERE id = ${id}
    `);
  };
}

module.exports = Model;
