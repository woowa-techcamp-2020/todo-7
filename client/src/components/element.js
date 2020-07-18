const getChildHtml = (child) => {
    if(!child) return '';
    else if(Array.isArray(child)) `${child.reduce((a, b) => a + getChildHtml(b), '')}`;
    else return child;
}

export default (classname = 'default', child = '') => `<div class='${classname}'>${child}</div>`;    