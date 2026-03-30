import { NoteCreate } from '../types/note';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

type NoteStore = {
  draft: NoteCreate;
  setDraft: (note: NoteCreate) => void;
  clearDraft: () => void;
};
const initialDraft: NoteCreate = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    },
  ),
);
