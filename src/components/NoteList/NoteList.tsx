import type { Note } from '../../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    console.log(notes)
  if (!notes || notes.length === 0) {
    return <div>No notes found.</div>;
  }

  return (
    <div>
      <h2>NoteList</h2>
      <ul className={css.list}>
        {notes.map(note => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tags}</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
