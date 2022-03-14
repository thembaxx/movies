import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.trello.com/1',
  headers: { Accept: 'application/json' },
});

export default instance;
