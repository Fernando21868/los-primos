import './modalGeneric.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

export function ModalGeneric({ isOpen, closeModal, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === modalRef.current) {
      closeModal();
    }
  }

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      className={`modalGeneric ${isOpen ? 'open' : 'close'}`}
    >
      <div className={`modalGeneric-container ${lightDarkMode ? 'dark' : ''}`}>
        <div className="modalGeneric-content">
          <button
            className={`modalGeneric-close ${lightDarkMode ? 'dark' : ''}`}
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
