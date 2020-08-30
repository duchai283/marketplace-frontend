import { getAccessToken } from './validate';
export default function request(url, options) {
  const parsedOptions = Object.assign(
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getAccessToken() || ''
      }
    },
    options
  );
  return fetch(url, parsedOptions).then(parseJSON);
}

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}
