import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import SearchBox from './components/SearchBox/SearchBox';
import { fetchNotes } from './services/noteService';

function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    const fetchFilteredNotes = async () => {
      const notes = await fetchNotes({ page: 1, search: debouncedSearch });
      // Handle notes (e.g., update state)
    };

    fetchFilteredNotes();
  }, [debouncedSearch]);

  return (
    <div>
      <header>
        <SearchBox onSearch={handleSearch} />
      </header>
      {/* ...existing code... */}
    </div>
  );
}

export default App;
