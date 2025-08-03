import { createPortal } from 'react-dom';
import type { Note } from '../../types/note';
import { useEffect } from 'react';
import css from './Modal.module.css';
import NoteFrom from '../NoteForm/NoteFrom';

interface ModalProps {
  onClose: () => void;
  note: Note | null;
}

export default function Modal({ onClose, note }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return createPortal(
    <div>
      <h2>Modal</h2>
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        <div className={css.modal}>
          {<NoteFrom 
          onClose={onClose} 
          note={note} />}
        </div>
      </div>
    </div>,
    document.body
  );
}
