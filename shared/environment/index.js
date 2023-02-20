const apiPath = '/api/';

const getURL = () => {
  const { protocol, hostname } = window.location;
  let { port } = window.location;
  if (hostname.includes('localhost')) {
    port = 3000;
  }
  return `${protocol}//${hostname}:${port}${apiPath}`;
};

export default getURL;
