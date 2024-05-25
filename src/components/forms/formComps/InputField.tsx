import { useEffect, useState } from 'react';
import {
  Field, // Importation du composant Field pour créer des champs de formulaire.
  ErrorMessage,
  useFormikContext,
} from 'formik';

import { styles } from '../../../styles/formStyles';
import globalStyles from '../../../styles/globalStyles';
import { useEquipments } from '../../../context/EquipmentProvider';

import controleEtancheite from '../../../utilities/controleEtancheite';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name }) => {
  const [isLeak, setIsLeak] = useState<boolean>(false);
  const [leakValue, setLeakValue] = useState<string>('');
  const { setFieldValue, values } = useFormikContext<Record<string, any>>();

  const { gas_types } = useEquipments();

  useEffect(() => {
    if (name === 'leak_detection_periodicity') {
      console.log(gas_types);
      console.log(gas_types[parseInt(values.gas_type_id, 10) - 1]);
      const potentiel =
        gas_types[parseInt(values.gas_type_id, 10) - 1]?.potentiel;

      const periodicity = controleEtancheite(
        parseInt(values.gas_weight, 10),
        parseInt(potentiel, 10),
        values.has_leak_detection
      );
      setIsLeak(true);
      setLeakValue(periodicity);
      setFieldValue(name, periodicity);
    }
  }, [values.gas_type_id, values.has_leak_detection, values.gas_weight]);
  useEffect(() => {
    if (name === 'soufflage_delta') {
      const soufflage_delta = values.soufflage_relevee - values.reprise_relevee;
      setIsLeak(true);
      setLeakValue(`${soufflage_delta}`);
      setFieldValue(name, soufflage_delta);
    }
  }, [values.soufflage_relevee, values.reprise_relevee]);

  return (
    <div className={styles.row}>
      <div className={styles.columnSmall}>
        <label className={styles.label}>{label}</label>
      </div>
      <div className={styles.columnBig}>
        {isLeak ? (
          <p>{leakValue}</p>
        ) : (
          <>
            <Field
              className={styles.input}
              name={name}
              type={type || 'text'}
              as={type === 'select' ? 'select' : 'input'}
              value={values[name] || ''} // Ensure the value is always defined
            />{' '}
            <ErrorMessage
              name={name}
              component='div'
              className={globalStyles.error}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
