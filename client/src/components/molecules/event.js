import Element from "../element.js";

export default class Event extends Element{
    constructor(data) {
        this.data = data;
        super('event');

    }

}
