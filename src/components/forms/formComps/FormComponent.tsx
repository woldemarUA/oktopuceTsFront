import { Form } from 'formik'; // Importation du composant Form pour créer un formulaire.

import SelectField from './SelectField';
import InputField from './InputField';
import Button from '../../ui/Button';

import globalStyles from '../../../styles/globalStyles';

interface FormComponentProps {
  formFieldConfig: any;
  values: any;
  title: string;
  children: React.ReactNode;
}

const FormComponent: React.FC<FormComponentProps> = ({
  formFieldConfig,
  values,
  title,
  children,
}) => {
  return (
    <Form>
      {Object.keys(formFieldConfig).map((key) => {
        const { type, label, options, visibleWhen } = formFieldConfig[key];

        if (visibleWhen && !visibleWhen(values)) return null;

        if (type === 'select' && options) {
          return (
            <SelectField
              key={key}
              name={key}
              options={options}
              type={type}
              label={label}
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
