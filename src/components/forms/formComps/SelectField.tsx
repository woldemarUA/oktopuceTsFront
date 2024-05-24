import { useEffect, useCallback, useMemo } from 'react';

import {
  Field, // Importation du composant Field pour créer des champs de formulaire.
  ErrorMessage,
  useFormikContext,
} from 'formik';

import globalStyles from '../../../styles/globalStyles';
import { styles } from '../../../styles/formStyles';

import { eqTypeId } from '../../../pages/Equipments/equipmentConfigs/parametrageConfComp';

import { useForms } from '../../../context/FormContextProvider';

export interface Option {
  value: string | number; // La valeur de l'option.
  label: string; // Le label de l'option.
  from: string;
  to: string;
}

interface SelectFieldProps {
  name: string;
  options: Option[];
  type: string;
  label: string;
  children?: React.ReactNode;
  from: string;
  isAdd: boolean;
  isAddSetter: (isAdd: boolean) => void;
  //  stepTrace
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  type,
  name,
  isAdd,
  isAddSetter,
}) => {
  const { setFieldValue, values } = useFormikContext<Record<string, any>>();
  const { optionAddStep, setOptionAddStep, handleAddOption } = useForms();

  useEffect(() => {
    Object.keys(eqTypeId).includes(values.endroit) &&
      setFieldValue('equipment_type_id', eqTypeId[values.endroit]);
  }, [setFieldValue, values.endroit]);

  // const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   if (value === 'add') {
  //     const from = options.filter((option) => option.value === 'add');

  //     setAddOptionStep((prevStep) => prevStep + 1);
  //     console.log(addOptionStep);
  //     handleAddOption(name, from[0].to, from[0].from);
  //   } else {
  //     setFieldValue(name, value);
  //   }
  // };

  // const memoizedOptions = useMemo(() => options, [options]);
  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value === 'add') {
        const from = options.filter((option) => option.value === 'add');

        const newStep = optionAddStep + 1;

        handleAddOption({
          name,
          to: from[0].to,
          from: from[0].from,
          // newStep,
          newStep,
        });
        isAddSetter(!isAdd);
        setOptionAddStep(newStep);
      } else {
        setFieldValue(name, value);
      }
    },
    [
      setFieldValue,
      options,
      //memoizedOptions,
      name,
      handleAddOption,
    ]
  );

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
            options={options}
            onChange={onSelectChange}>
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
    </>
  );
};

export default SelectField;
