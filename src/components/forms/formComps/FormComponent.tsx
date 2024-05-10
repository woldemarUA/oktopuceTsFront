import { Form } from 'formik'; // Importation du composant Form pour créer un formulaire.

import SelectField from './SelectField';
import InputField from './InputField';

import { chaleurEauOptions } from '../config/parametrageFromConfig';

interface FormComponentProps {
  formFieldConfig: any;
  values: any;
  title: string;
  children: React.ReactNode;
}

const FormComponent: React.FC<FormComponentProps> = ({
  formFieldConfig,
  values,
  // title,
  children,
}) => {
  // console.log(formFieldConfig);
  return (
    <Form>
      {Object.keys(formFieldConfig).map((key) => {
        const { type, label, visibleWhen } = formFieldConfig[key];
        let { options } = formFieldConfig[key];

        if (visibleWhen && !visibleWhen(values)) {
          return null;
        }
        if (typeof options === 'function') {
          options = options(values); // Evaluate options if it's a function

          values.equipment_type_id = chaleurEauOptions.includes(values.endroit)
            ? values.equipment_type_id
            : values.endroit;
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
