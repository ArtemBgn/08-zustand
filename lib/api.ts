import axios from 'axios';
import type { Note, NoteCreate, NoteTag } from '../types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const noteInstans = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  userQuery: string = '',
  userPage: number = 1,
  userTag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const { data } = await noteInstans.get<FetchNotesResponse>('/notes', {
    params: {
      search: userQuery,
      page: userPage,
      tag: userTag,
      perPage: 12,
    },
  });
  return data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const { data } = await noteInstans.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NoteCreate): Promise<Note> => {
  const { data } = await noteInstans.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const { data } = await noteInstans.delete<Note>(`/notes/${id}`);
  return data;
};
