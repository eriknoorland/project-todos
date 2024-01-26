import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AutomatedTestProps } from '../types';
import './Modal.scss';

export interface ModalProps extends AutomatedTestProps, React.PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
};

const Modal = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const ref = useRef<HTMLDialogElement | null>(null);

  const handleCloseClick = () => {
    if (props.onClose) {
      props.onClose();
    }

    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      if (isOpen) {
        element.showModal();
      } else {
        element.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      onKeyDown={handleKeyDown}
      className="modal"
      data-testid={props['data-testid'] || ''}
    >
      <div
        className="modal__close"
        onClick={handleCloseClick}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>

      {props.children}
    </dialog>
  );
};

export default Modal;