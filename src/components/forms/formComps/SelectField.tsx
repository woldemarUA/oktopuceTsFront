import { useState, useCallback } from 'react';

import {
  Field, // Importation du composant Field pour créer des champs de formulaire.
  ErrorMessage,
  useFormikContext,
} from 'formik';

import globalStyles from '../../../styles/globalStyles';
import { styles } from '../../../styles/formStyles';

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

  const { setFieldValue } = useFormikContext();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setFieldValue(name, value); // Update Formik field value

      if (image) {
        const selectedOption = options.find(
          (option) => option.value.toString() === value
        );
        if (selectedOption) {
          const imagePath = `${PICTO_PATH}/${selectedOption.value}.png`;
          setSelectedImage(imagePath);
        }
      }
    },
    [setFieldValue, name, options, image]
  );
  return (
    <>
      <div className={styles.row}>
        <div className={styles.columnSmall}>{label} </div>

        <div className={styles.columnBig}>
          <Field
            className={styles.select}
            name={name}
            as={type}
            label={label}
            options={options}
            onChange={handleChange}>
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
      {image && selectedImage && (
        <div className={styles.row}>
          <div className={styles.columnSmall}></div>
          <div className={`${styles.columnBig} items-center`}>
            <img
              src={selectedImage}
              alt='Selected'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectField;
