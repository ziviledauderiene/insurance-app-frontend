import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getFromLocalStorage } from 'helpers';

const baseUrl: string = process.env.REACT_APP_PI_URL as string;
const port: string = process.env.REACT_APP_PORT || '8888';

const instance: AxiosInstance = axios.create({
  baseURL: `${baseUrl}:${port}/`,
});

const options = (
  endpoint: string,
  method?: string,
  body?: any
): AxiosRequestConfig => {
  const preset: AxiosRequestConfig = {
    url: endpoint,
    method: method || 'GET',
    headers: {},
    data: undefined,
  };
  const token: string | null = getFromLocalStorage('token');
  if (token) {
    preset.headers!.Authorization = `Bearer ${token}`;
  }
  if (body) {
    preset.data = body;
  }
  return preset;
};

const sendRequest = async (
  endpoint: string,
  method?: string,
  body?: any
): Promise<any> => {
  const config: AxiosRequestConfig = options(endpoint, method, body);
  const { data } = await instance(config);
  return data;
};

export default sendRequest;