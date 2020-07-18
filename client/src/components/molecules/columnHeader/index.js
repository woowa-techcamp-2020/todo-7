import element from "../../element.js";
import "./styles.css";

export default (type = '', title = '', count = 0) => element(
    `${type}-column-header`,
    `${title}`
);