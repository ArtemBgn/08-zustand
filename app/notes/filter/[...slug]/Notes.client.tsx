'use client';

import { useState } from 'react';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '@/components/Pagination/Pagination';
// import Modal from '@/components/Modal/Modal';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
// import NoteForm from '@/components/NoteForm/NoteForm';
import { NoteTag } from '@/types/note';
import Link from 'next/link';
import css from './NotePage.module.css';

type NotesClientProps = {
  tag: NoteTag | undefined;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['notes', currentPage, query, tag],
    queryFn: () => fetchNotes(query, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleQueryChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setCurrentPage(1);
    },
    500,
  );

  // const onClose = () => {
  //   setModalIsOpen(false);
  // };

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleQueryChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <Link className={css.button} href={'/notes/action/create'}>
          Create note +
        </Link>
        {/* <button className={css.button} onClick={openModal}>
          Create note +
        </button> */}
      </header>
      {/* {modalIsOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )} */}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
