import "./styles.css";

export default (parent, name) =>  `
  <div 
    class="${parent}-textarea textarea"
    name="${name}"
    role="textbox" 
    contenteditable>
  </div>
`;
