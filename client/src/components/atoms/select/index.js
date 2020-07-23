import './styles.css';

export default ({ className, name, options }) => `
  <select name='${name}' class='${className}'>
    ${options.reduce((a, b) => a + `<option value='${b}'>${b}</option>`, '')}
  </select>
`;
