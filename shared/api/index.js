import axios from 'axios';
import { isEmpty } from 'lodash';
import getURL from '../environment';
import messageHelper from '../helper';
import { ERROR_MESSAGE } from '../message';

const instance = axios.create({
  baseURL: getURL(),
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
});

const responseBody = (res) => res.data;

const checkSuccess = (res) => {
  if (res.success) {
    return res;
  }
  messageHelper('error', ERROR_MESSAGE);
  return res;
};

const requestParamHandler = (url, query) => {
  let value = url;
  if (!isEmpty(query)) {
    const param = new URLSearchParams(query).toString();
    value = `${url}/?${param}`;
  }
  return instance.get(value).then(responseBody).then(checkSuccess);
};

const http = {
  get: (url, query) => requestParamHandler(url, query),
  post: (url, body) => instance.post(url, body).then(responseBody).then(checkSuccess),
  put: (url, body) => instance.put(url, body).then(responseBody).then(checkSuccess),
  delete: (url) => instance.delete(url).then(responseBody).then(checkSuccess),
};

export default http;
