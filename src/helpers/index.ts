/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const capitalize = (word: string): string =>
  word.slice(0, 1).toUpperCase() + word.slice(1);

export const saveInLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const port: string = process.env.REACT_APP_PORT || '8888';
const baseUrl: string = process.env.REACT_APP_PI_URL as string;
export const sendRequest = async (
  method: string,
  endpoint: string,
  body: any
) => {
  const { data } = await axios.request({
    method,
    url: `${baseUrl}:${port}/${endpoint}`,
    withCredentials: false,
    data: body,
  });
  return data;
};
