import { BOARD_ID, API_KEY, API_TOKEN, LIST_ID } from './constants';

import axios from './axios';
const ID_LABELS = ['First Name', 'Surname', 'Email', 'Phone number', 'Movie'];

export async function getBoard() {
  console.log('hey');
  try {
    const response = await axios.get(
      `/boards/${BOARD_ID}?key=${API_KEY}&token=${API_TOKEN}`
    );

    return response?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function addCard({ name, surname, email, phone, movie }) {
  try {
    const response = await axios.post(`/cards?idList=${LIST_ID}`, {
      name: `${name} ${surname}`,
      idLabels: ID_LABELS,
    });

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}
