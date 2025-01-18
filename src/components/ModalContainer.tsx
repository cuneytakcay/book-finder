import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './ModalContainer.module.css';

interface ModalContainerProps {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  onClick,
  children,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>{title}</h2>
        <button onClick={onClick} className={styles.close}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
