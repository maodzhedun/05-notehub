import axios from 'axios';
import type { Note } from '../types/note';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const API_URL = 'https://notehub-public.goit.study/api/notes';

interface NoteHttpResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
}

interface FetchNotesParams {
  page: number;
  search: string;
}

export const fetchNotes = async (params: FetchNotesParams) => {
  const response = await axios.get<NoteHttpResponse>(API_URL, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
    params: { search: params.search, page: params.page, perPage: 10 },
  });
  return response.data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const response = await axios.post<Note>(API_URL, note, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete<Note>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};
