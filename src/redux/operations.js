import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  'https://6568df639927836bd9758882.mockapi.io/api/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get();
  return response.data;
});
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async data => {
    await axios.post('', data);
    const response = await axios.get();
    return response.data;
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await axios.delete(`/${id}7`);
    const response = await axios.get();
    return response.data;
  }
);
