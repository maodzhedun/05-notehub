// import { useState } from 'react';
// import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import { fetchNotes } from '../../../services/noteService';
import type { Note } from '../../../types/note';
// import type { Note } from '../../../types/note';

function App() {
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');

  const { data: notes=[], isFetching } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, search: '' }),
    // enabled: !!query,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {isFetching && <div>Loading posts...</div>}
          {<SearchBox />}
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
        </header>
        <NoteList notes={notes} />
      </div>
    </>
  );
}

export default App;
