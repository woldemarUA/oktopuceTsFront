import { useState, useEffect } from 'react';

import {
  Field, // Importation du composant Field pour créer des champs de formulaire.
  ErrorMessage,
  useFormikContext,
} from 'formik';

import globalStyles from '../../../styles/globalStyles';
import { styles } from '../../../styles/formStyles';

import { eqTypeIdAssign } from '../../../pages/Equipments/equipmentConfigs/parametrageFromConfig';

const PICTO_PATH = `${import.meta.env.VITE_APP_ASSETS_PATH}/images/picto`;

export interface Option {
  value: string | number; // La valeur de l'option.
  label: string; // Le label de l'option.
}

interface SelectFieldProps {
  name: string;
  options: Option[];
  type: string;
  label: string;
  image: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  type,
  name,
  image,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [isImage, setIsImage] = useState<boolean>(image);
  const [currentEndroit, setCurrentEndroit] = useState<string | null>(null);

  const { setFieldValue, values } = useFormikContext<Record<string, any>>();

  useEffect(() => {
    setCurrentEndroit(values.endroit);
  }, [values.endroit]);

  useEffect(() => {
    let isEndroitMatch = false;
    if (currentEndroit !== values.endroit) {
      setIsImage(false);
      setSelectedImage(undefined);
    }
    for (const obj of eqTypeIdAssign) {
      if (values.endroit === obj.endroit) {
        isEndroitMatch = true;
        setFieldValue('equipment_type_id', obj.equipment_type_id);
      }
    }

    if (isEndroitMatch && name === 'endroit') {
      setIsImage(true);
    } else {
      setIsImage(image);
    }
  }, [values.endroit, name, image, setFieldValue, currentEndroit]);

  useEffect(() => {
    if (values.equipment_type_id) {
      setSelectedImage(`${PICTO_PATH}/${values.equipment_type_id}.png`);
    }
  }, [values.equipment_type_id]);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.columnSmall}>{label}</div>
        <div className={styles.columnBig}>
          <Field
            className={styles.select}
            name={name}
            as={type}
            label={label}
            options={options}>
            {options.map((option: Option) => (
              <option
                key={option.value}
                value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name={name}
            component='div'
            className={globalStyles.error}
          />
        </div>
      </div>
      {isImage && selectedImage && (
        <div className='grid grid-cols-2 gap-4 place-content-center'>
          <p className={`${styles.columnSmall} content-center`}>Visuel</p>
          <img
            className={`content-center`}
            src={selectedImage}
            alt='Selected'
          />
          {/* <div className={globalStyles.imgLabelCell}></div> */}
        </div>
      )}
    </>
  );
};

export default SelectField;
