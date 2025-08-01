import { useState } from 'react';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import { fetchNotes } from '../../services/noteService';
import Modal from '../Modal/Modal';

import Pagination from '../Pagination/Pagination';
// import type { Note } from '../../../types/note';

function App() {
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (notes: Note) => {
    // setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setSelectedMovie(null);
  };

  const { data, isFetching } = useQuery({
    queryKey: ['notes', currentPage],
    queryFn: () => fetchNotes({ page: currentPage, search: '' }),
    // enabled: !!query,
    placeholderData: keepPreviousData,
  });

  // console.log(data);

  const notes = data?.notes ?? [];

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {isFetching && <div>Loading posts...</div>}
          {<SearchBox />}

          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {<button className={css.button} onClick={openModal}>Create note +</button>}
        </header>
        {notes.length > 0 && <NoteList notes={notes} />}
        {isModalOpen && <Modal onClose={closeModal} />}
      </div>
    </>
  );
}

export default App;
