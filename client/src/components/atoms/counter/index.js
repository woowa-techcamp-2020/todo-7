import "./styles.css";
import element from "../../element";
export default (type = 'primary', count = 0) => element(
    `counter ${type}-counter`, count);