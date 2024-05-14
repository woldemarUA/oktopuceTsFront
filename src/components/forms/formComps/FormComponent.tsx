import { Form } from 'formik'; // Importation du composant Form pour créer un formulaire.

import SelectField from './SelectField';
import InputField from './InputField';
import Switch from './Switch';
import DatePickerComponent from './DatePickerComponent';
import MultiCheckComponent from './MultiCheckComponent';

import globalStyles from '../../../styles/globalStyles';

interface FormComponentProps {
  formFieldConfig: any;
  values: any;
  title: string;
  children: React.ReactNode;
  formValues?: Record<string, any>;
}

const FormComponent: React.FC<FormComponentProps> = ({
  formFieldConfig,
  values,

  children,
}) => {
  console.log(values);
  return (
    <Form>
      {Object.keys(formFieldConfig).map((key, index) => {
        const { type, label, visibleWhen } = formFieldConfig[key];

        let { options } = formFieldConfig[key];

        if (visibleWhen && !visibleWhen(values)) {
          // console.log('visible', values);
          return null;
        }
        if (typeof options === 'function') {
          options = options(values); // Evaluate options if it's a function
        }

        if (type === 'date')
          return (
            <DatePickerComponent
              key={key}
              label={label}
              name={key}
            />
          );

        if (type === 'multicheck') {
          return (
            <div key={key}>
              <h3 className={`${globalStyles.headerSection} text-center`}>
                {label}
              </h3>
              <MultiCheckComponent options={formFieldConfig[key].options} />
            </div>
          );
        }

        if (type === 'checkbox') {
          return (
            <Switch
              key={key}
              id={index}
              label={label}
              name={key}
            />
          );
        }

        if (type === 'select' && options) {
          return (
            <SelectField
              key={key}
              name={key}
              options={options}
              type={type}
              label={label}
              image={formFieldConfig[key]['image']}
            />
          );
        }
        return (
          <InputField
            key={key}
            label={label}
            name={key}
            type={type || 'text'}
          />
        );
      })}
      {children}
    </Form>
  );
};

export default FormComponent;
