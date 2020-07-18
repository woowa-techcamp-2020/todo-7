import Element from "../../element.js";
import Card from "../../molecules/card/index.js";
import ColumnHeader from "../../molecules/columnHeader/index.js";
import "./styles.css";

export default (type, title, data) => Element(`${type}-column`, `
    ${ColumnHeader(type, title, data.length)}
    ${data.reduce((cards, data) => (cards + Card(`${type}-column`, data)), '')}
`);