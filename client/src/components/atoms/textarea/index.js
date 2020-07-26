import './styles.css';

export default ({ className, name, value = '' }) => `
  <div 
    class='${className} textarea'
    name='${name}'
    role='textbox'
    contenteditable>${value}
  </div>
`;
