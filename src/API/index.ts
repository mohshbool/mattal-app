import axios, {Method} from 'axios';
import {makeUseAxios} from 'axios-hooks';
import {API_URL, API_VERSION} from '../Configs';

const api = axios.create({baseURL: `${API_URL}/${API_VERSION}`});
const useAxios = makeUseAxios({axios: api, cache: false});

type Api_Request = {
  url: string;
  method?: Method;
  data?: {};
  params?: {};
  headers?: {};
  manualTrigger?: boolean;
};

// useApi Hook
// @example
// ```
// const {} = useApi({});
// ```
export const useApi = <DATA>(req: Api_Request) => {
  const [{data, loading, error, response: debug}, run] = useAxios<DATA>(
    {
      url: req.url,
      method: req.method || 'GET',
      data: req.data,
      params: req.params,
      headers: req.headers,
    },
    {
      manual: req.manualTrigger || false,
    },
  );

  return {data, loading, error, run, debug};
};

// Simple asynchronous api request method
// @example without token
// ```
// const data = await api_request({});
// ```
export const apiRequest = async <DATA>(req: Api_Request) => {
  return api
    .request<DATA>({
      url: req.url,
      method: req.method || 'GET',
      data: req.data,
      params: req.params,
      headers: req.headers,
    })
    .then(({data}) => data);
};
