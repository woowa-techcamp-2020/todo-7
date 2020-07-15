const fs = require('fs');
const path = require('path');
const pool = require('./index');

class Model {
    static init = (attributesTypes, tableName) => {
        this.tableName = tableName;
        this.attributesTypes = attributesTypes;
    }

    static getById = (id, attributes) => await pool.query(`select ${attributes} from ${this.tableName} where id = ${id}`) 
    static getCreateQuery = function (object) {
        const columns = object.keys;
        const values = object.values;
        const now = Date.now();
        columns.push('createdAt', 'updatedAt');
        values.push(now, now);
        return `INSERT INTO ${this.tableName} (${[...columns, 'createdAt', 'updatedAt']}) VALUES (${object.values}) `;
    }
    static create = (data) => {
        const validatedItem = this.validate(item);
        this.items.push(validatedItem);
        this.write();
        return validatedItem;
    }

    static update = function (item) {
        const id = this.items.findIndex(item.id);
        item.updatedAt = Date.now();
        this.items[id] = item;
        this.write();
    } 

    static delete = function (item) {
        const id = this.items.findIndex(item.id);
        item.updatedAt = Date.now();
        if(id) this.items[id] = null;
        this.write();
    }
}

module.exports = Model;