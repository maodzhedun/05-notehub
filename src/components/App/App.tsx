import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import { fetchNotes } from '../../services/noteService';
import Modal from '../Modal/Modal';
// import type { Note } from '../../types/note';

import Pagination from '../Pagination/Pagination';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({ page: currentPage, search: debouncedSearchQuery }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    console.log('Search value:', value);
  };

  const notes = data?.notes ?? [];

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox onSearch={handleSearch} />}

          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {
            <button className={css.button} onClick={openModal}>
              Create note +
            </button>
          }
        </header>
        {notes.length > 0 && <NoteList notes={notes} />}
        {isModalOpen && <Modal onClose={closeModal} note={null} />}
        {isLoading && isFetching && <Loader />}
        {isError && <ErrorMessage />}
      </div>
    </>
  );
}

export default App;
