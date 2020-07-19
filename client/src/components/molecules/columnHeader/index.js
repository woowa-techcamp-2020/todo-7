import "./styles.css";
import element from "../../element";
import counter from "../../atoms/counter";
import icon from "../../atoms/icon";

export default (type = '', title = '', count = 0) => element(
    `${type}-column-header`,
    `${counter(`${type}-column-header`, count)}
    ${element(`${type}-column-header-title`, title)}
    ${element(`${type}-column-header-actions`, icon())}`
);