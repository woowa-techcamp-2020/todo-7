const createHttpError = require('http-errors');
const mysql = require('mysql2/promise');
const { isEmpty, wrapBacktick } = require('../utils/helper');

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
          validatedInput[name] = `'${value}'`;
        case 'text':
          validatedInput[name] = `'${value}'`;
          break;
        case 'enum':
          if (typeof value === 'number' || Number(value).toString() === value) {
            validatedInput[name] = value;
          } else throw this.validationError;
          break;
        default:
          throw this.validationError;
      }
    }
    return validatedInput;
  };

  static generateFindQueryStmt = function (isOne, attributes = '*', where = {}) {
    const validatedWhere = this.validate({ ...where, ...this.defaultWhere });
    const queryStmt = `
      SELECT ${attributes === '*' ? '*' : wrapBacktick(attributes)} 
      FROM ${wrapBacktick(this.name)}
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

  static generateCreateQueryStmt = function (input) {
    const queryStmt = `
      INSERT INTO ${wrapBacktick(this.name)} (
        ${wrapBacktick(Object.keys(input))} 
        ${!this.attributes.order ? '' : ', `order`'}
      )
      VALUES (
        ${Object.values(input)}
        ${this.attributes.order ? this.generateOrderSubQueryStmt(input) : ''}
      )
    `;
    return queryStmt;
  };

  static generateOrderSubQueryStmt = function (data) {
    return '';
  };

  static generateUpdateQueryStmt = function (input) {
    const queryStmt = `
      UPDATE ${this.name}
      SET ${Object.entries(input)
        .map((o) => `\`${o[0]}\`=${o[1]}`)
        .join(', ')}
      WHERE id = ${input.id}
    `;
    return queryStmt;
  };

  static generateDeleteQueryStmt = function (id) {
    const queryStmt = `
      UPDATE \`${this.name}\`
      SET isActive = 0
      WHERE id = ${id}
    `;
    return queryStmt;
  };

  static findOne = async function (attributes, where) {
    const queryStmt = this.generateFindQueryStmt(true, attributes, where);
    console.log(queryStmt);
    return (await this.pool.query(queryStmt))[0][0];
  };

  static findAll = async function (attributes, where) {
    const queryStmt = this.generateFindQueryStmt(false, attributes, where);
    console.log(queryStmt);
    return (await this.pool.query(queryStmt))[0];
  };

  static create = async function (input) {
    const validatedInput = this.validate(input);
    const queryStmt = this.generateCreateQueryStmt(validatedInput);
    console.log(queryStmt);
    return {
      id: (await this.pool.query(queryStmt))[0].insertId,
      ...input,
    };
  };

  static update = async function (input) {
    if (!input.id) throw this.validationError;
    const validatedInput = this.validate(input);
    const queryStmt = this.generateUpdateQueryStmt(validatedInput);
    console.log(queryStmt);
    return await this.pool.query(queryStmt);
  };

  static delete = async function (id) {
    if (!id) throw this.validationError;
    const queryStmt = this.generateDeleteQueryStmt(id);
    console.log(queryStmt);
    return await this.pool.query(queryStmt);
  };
}

module.exports = Model;
