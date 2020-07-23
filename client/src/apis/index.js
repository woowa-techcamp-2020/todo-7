const defaultOptions = (method) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
});

const serverUrl = '';

const createQuery = (data) => {
  return data
    ? '?' +
        Object.keys(data)
          .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
          .join('&')
    : '';
};

export const POST = async (url = '', data) =>
  await fetch(`${serverUrl}${url}`, {
    body: JSON.stringify(data),
    ...defaultOptions('POST'),
  });

export const PUT = async (url = '', data) =>
  await fetch(`${serverUrl}${url}`, {
    body: JSON.stringify(data),
    ...defaultOptions('PUT'),
  });

export const GET = async (url = '', data) =>
  await fetch(`${serverUrl}${url}${createQuery(data)}`, defaultOptions('GET'));

export const DELETE = async (url = '') => await fetch(`${serverUrl}${url}`, defaultOptions('DELETE'));
