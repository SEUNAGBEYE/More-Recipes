import axios from 'axios';

export default (data) => axios.post('/api/v1/users/signup', data);