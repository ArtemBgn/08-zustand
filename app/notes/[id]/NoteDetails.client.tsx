'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import { Note } from '@/types/note';
import css from './page.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as Note['id'];
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notesId', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError || !note ? (
        <p>Something went wrong.</p>
      ) : (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>Note content: {note.content}</p>
            <p className={css.date}>Created date: {note.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
}
