import styles from './Spinner.module.css';

const Spinner: React.FC<{ spinnerText?: string }> = ({
  spinnerText = 'Loading...',
}) => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <p>{spinnerText}</p>
    </div>
  );
};

export default Spinner;
