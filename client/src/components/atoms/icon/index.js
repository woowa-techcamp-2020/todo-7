import "./styles.css";
import element from "../../element";
export default (type = 'primary') => element('icon', `<i class="${type}"></i>
`);