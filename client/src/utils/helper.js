export const getNumber = (str) => (str ? Number(str.replace(/[^0-9]/g, '')) : undefined);
