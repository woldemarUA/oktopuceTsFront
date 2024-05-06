import {
  Field, // Importation du composant Field pour créer des champs de formulaire.
  ErrorMessage,
} from 'formik';

import { styles } from '../../../styles/formStyles';
import globalStyles from '../../../styles/globalStyles';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name }) => {
  return (
    <div className={styles.row}>
      <div className={styles.columnSmall}>
        <label className={styles.label}>{label}</label>
      </div>
      <div className={styles.columnBig}>
        <Field
          className={styles.input}
          name={name}
          type={type || 'text'}
          as={type === 'select' ? 'select' : 'input'}
        />{' '}
        <ErrorMessage
          name={name}
          component='div'
          className={globalStyles.error}
        />
      </div>
    </div>
  );
};

export default InputField;
