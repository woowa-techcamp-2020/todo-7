const getChildHtml = (child) => {
  if (Array.isArray(child)) return `${child.reduce((a, b) => a + b, '')}`;
  else return child;
};

export default ({ className = 'default', child = '', id }) => `
    <div class='${className}' ${id ? `id= ${id}` : ''}>${getChildHtml(child)}</div>
`;
