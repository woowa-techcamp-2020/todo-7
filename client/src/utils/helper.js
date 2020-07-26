const addHours = function (time, h) {
  time.setTime(time.getTime() + h * 60 * 60 * 1000);
  return time;
};

export const getNumber = (str) => (str ? Number(str.replace(/[^0-9]/g, '')) : undefined);
export const getCurrentDateTime = (time) =>
  `${addHours(new Date(time), 9).toLocaleDateString()} ${addHours(new Date(time), 9).toLocaleTimeString()}`;
