import {
  Field, // Importation du composant Field pour créer des champs de formulaire.
  ErrorMessage,
} from 'formik';

import globalStyles from '../../../styles/globalStyles';
import { styles } from '../../../styles/formStyles';

export interface Option {
  value: string | number; // La valeur de l'option.
  label: string; // Le label de l'option.
}

interface SelectFieldProps {
  name: string;

  options: Option[];
  type: string;
  label: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  type,
  name,
}) => {
  return (
    <div className={styles.row}>
      <div className={styles.columnSmall}>{label}</div>
      <div className={styles.columnBig}>
        <Field
          className={styles.select}
          name={name}
          as={type}
          label={label}
          options={options}>
          {options.map((option: Option) => {
            return (
              <option
                key={option.value}
                value={option.value}>
                {option.label}
              </option>
            );
          })}
        </Field>
        <ErrorMessage
          name={name}
          component='div'
          className={globalStyles.error}
        />
      </div>
    </div>
  );
};

export default SelectField;
