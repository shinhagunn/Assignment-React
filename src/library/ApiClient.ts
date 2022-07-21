import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '../config';

const jsonToParam = (json: any, first_str = '?') => {
  const parts = [];
  for (const i in json) {
    if (json.hasOwnProperty(i) && json[i]) {
      parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(json[i])}`);
    }
  }
  return parts.length ? first_str + parts.join('&') : '';
};

const formatError = async (error: any) => {
  const { response } = error;
  // const errors: string[] = response.data.errors;

  // for await (const message of errors) {

  // }
};

const csrf_headers = () => {
  const csrf_token = localStorage.getItem('csrf_token');
  const headers = { 'X-CSRF-Token': csrf_token };

  return csrf_token ? headers : {};
};

const getClient = (baseURL: string) => {
  const client = axios.create({ baseURL, headers: csrf_headers() });
  client.interceptors.response.use(
    (response: any) => Promise.resolve(response),
    (error: any) => {
      formatError(error);
      return Promise.reject(error);
    },
  );
  return client;
};

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = getClient(config.api_url);
  }

  async get<T>(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.get<T>(
        url + jsonToParam(data, url.includes('?') ? '&' : '?'),
        conf,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete<T>(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.delete<T>(
        url,
        {
          data,
          ...conf,
        },
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async head(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.head(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async options(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.options(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post<T>(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.post<T>(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put<T>(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.put<T>(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch<T>(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.patch<T>(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ApiClient;
