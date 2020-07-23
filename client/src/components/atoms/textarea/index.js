import './styles.css';

export default ({ className, name }) => `
  <div 
    class='${className} textarea'
    name='${name}'
    role='textbox' 
    contenteditable>
  </div>
`;
