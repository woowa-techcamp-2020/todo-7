import Element from "../element.js";
import NoteColumn from "./noteColumn.js";

export default class NoteColumns extends Element {
    constructor(data) {
        console.log(data);
        super('note-columns', data.map(group => new NoteColumn(group)));
    }
}