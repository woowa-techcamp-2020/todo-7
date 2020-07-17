
import PageHeader from '../molecules/pageHeader.js';
import NoteColumns from '../organisms/noteColumns.js';
import Element from '../element.js';
export default class Home extends Element{
    constructor(data) {
        console.log(data);
        super('home', [new PageHeader(), new NoteColumns(data.groups)]);
    }
}
