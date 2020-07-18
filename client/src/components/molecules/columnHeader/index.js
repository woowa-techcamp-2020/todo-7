import Element from "../../element.js";
import "./styles.css";

export default (type = '', title = '', count = 0) => Element(
    `${type}-column-header`,
    `${title}`
);