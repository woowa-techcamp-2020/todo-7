import element from "../../element.js";
import card from "../../molecules/card/index.js";
import columnHeader from "../../molecules/columnHeader/index.js";
import "./styles.css";

export default (type, title, data) => element(`${type}-column`, `
    ${columnHeader(type, title, data.length)}
    ${data.reduce((cards, data) => (cards + card(`${type}-column`, data)), '')}
`);