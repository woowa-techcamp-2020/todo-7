import './styles.css';
export default ({ className = 'primary', text, disabled = false }) => `
    <button 
        class='${className}'
        ${disabled ? 'disabled=true' : ''}
    >${text}</button>`;
