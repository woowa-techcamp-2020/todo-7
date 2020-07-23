import './styles.css';

export default ({ className, placeholder = '', name = '', type = 'text' }) =>  
   `<input type='${type}' class='${className} ${type}-input' placeholder='${placeholder}' name='${name}'></input>`
;
