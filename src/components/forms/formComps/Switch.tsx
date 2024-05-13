import { Field, useFormikContext } from 'formik';
import { useState } from 'react';

import { styles } from '../../../styles/formStyles';

type SwitchProps = {
  label: string;
  id: number;

  name: string;
};

const Switch = ({ id, name, label }: SwitchProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext();

  const onChange = () => {
    setChecked(!checked);
    setFieldValue(name, !checked);
  };

  return (
    <div className={styles.row}>
      <div className={styles.columnSmall}> {label}</div>
      <div className={`${styles.columnBig} items-center`}>
        <div className='flex items-center'>
          <label
            htmlFor={`${id}`}
            className='relative inline-block w-14 h-8 bg-gray-200 rounded-full cursor-pointer'>
            <Field
              id={`${id}`}
              type='checkbox'
              className='sr-only'
              checked={checked}
              onChange={onChange}
              name={name}
            />
            <span
              className={`absolute left-1 top-1  w-6 h-6 rounded-full transition-transform ${
                checked
                  ? 'bg-teal-600 translate-x-6'
                  : 'bg-red-600 translate-x-0'
              }`}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Switch;
