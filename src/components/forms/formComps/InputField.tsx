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
  const [leakValue, setLeakValue] = useState<string | null>(null);
  const { setFieldValue, values } = useFormikContext();

  const { gas_types } = useEquipments();

  useEffect(() => {
    if (name === 'leak_detection_periodicity') {
      const potentielArr = gas_types.filter(
        (gas) => gas.id === parseInt(values.gas_type_id, 10)
      );
      const potentiel = potentielArr[0]?.global_warming_potential;
      const periodicity = controleEtancheite(
        parseInt(values.gas_weight, 10),
        potentiel,
        values.has_leak_detection
      );
      setIsLeak(true);
      setLeakValue(periodicity);
      setFieldValue(name, periodicity);
    }
  }, [values.gas_type_id, values.has_leak_detection, values.gas_weight]);

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
