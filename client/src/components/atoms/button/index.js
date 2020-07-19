import "./styles.css";
export default (type = 'primary', text, disabled = false) => `<button class=${type} disabled=${disabled}>${text}</button>`;
