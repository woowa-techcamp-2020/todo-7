const defaultOptions = (method) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
});

const serverUrl = 'http://localhost:3000';

const createQuery = (data) => {
  return data
    ? '?' +
        Object.keys(data)
          .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
          .join('&')
    : '';
};

export const POST = async (url = '', data) =>
  (
    await fetch(`${serverUrl}${url}`, {
      body: JSON.stringify(data),
      ...defaultOptions('POST'),
    })
  ).json();

export const PUT = async (url = '', data) =>
  (
    await fetch(`${serverUrl}${url}`, {
      body: JSON.stringify(data),
      ...defaultOptions('PUT'),
    })
  ).json();

export const GET = async (url = '', data) => (await fetch(`${serverUrl}${url}${createQuery(data)}`, defaultOptions('GET'))).json();

export const DELETE = async (url = '') => (await fetch(`${serverUrl}${url}`, defaultOptions('DELETE'))).json();
