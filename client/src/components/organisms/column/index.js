import "./styles.css";
import element from "../../element";
import card from "../../molecules/card";
import columnHeader from "../../molecules/columnHeader";

export default (type, title, data) => element(`${type}-column`, `
    ${columnHeader(type, title, data.length)}
    ${card('project-column-new', '', true)}
    ${data.reduce((cards, data) => (cards + card(`${type}-column`, data)), '')}
`);