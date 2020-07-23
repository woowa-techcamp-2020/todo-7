import './styles.css';
export default ({ className = 'primary', text, disabled = false }) => `
    <button 
        class='${className}'
        type='button'
        ${disabled ? 'disabled=true' : ''}
    >${text}</button>`;
