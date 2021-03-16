import axios from 'axios';
import {API_URL} from "../config/constants";
export default function API(route, method, data, headers) {
  return axios({
    method,
    url: `${API_URL}/${route}`,
    headers,
    data
  });
}
