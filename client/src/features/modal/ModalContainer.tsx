import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './ModalContainer.module.css';

import { useDispatch } from 'react-redux';
import { closeModal } from './modalSlice';

interface ModalContainerProps {
  title: string;
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ title, children }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>{title}</h2>
        <button onClick={() => dispatch(closeModal())} className={styles.close}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
