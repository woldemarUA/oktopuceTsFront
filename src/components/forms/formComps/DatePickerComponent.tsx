import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { useFormikContext } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { styles } from '../../../styles/formStyles';

type DatePickerComponentProps = {
  label: string;
  name: string;
};

const DatePickerComponent = ({ label, name }: DatePickerComponentProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, format(startDate, 'yyyy-MM-dd'));
  }, [startDate]);
  return (
    <div className={styles.row}>
      <div className={styles.columnSmall}>{label} </div>
      <div className={styles.columnBig}>
        <DatePicker
          className='bg-stone-800'
          closeOnScroll={(e) => e.target === document}
          selected={startDate}
          dateFormat='yyyy-MM-dd'
          onChange={(date: Date) => {
            setStartDate(date);
          }}
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
