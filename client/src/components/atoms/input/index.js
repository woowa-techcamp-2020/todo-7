import './styles.css';

export default ({ className, value = '', placeholder = '', name = '', type = 'text' }) =>
  `<input type='${type}' class='${className} ${type}-input' value = '${value}' placeholder='${placeholder}' name='${name}'></input>`;
