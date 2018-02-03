import axios from 'axios';

export default (token) => {
  token ? axios.defaults.headers.common['x-access-token'] = token : delete axios.defaults.headers.common['x-access-token']
}
