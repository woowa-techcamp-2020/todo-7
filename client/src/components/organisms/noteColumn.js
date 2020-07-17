import Element from "../element.js";
import NoteCard from "../molecules/noteCard.js";
import NoteColumnHeader from "../molecules/noteColumnHeader.js";

export default class NoteColumn extends Element {
    constructor(data) {
        console.log(data);
        super('note-column', [new NoteColumnHeader(data.notes.length, data.title), data.notes.map(note => new NoteCard(note))]);
    }
}