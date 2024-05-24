import { useState, useEffect } from 'react';

import { Form, useFormikContext } from 'formik'; // Importation du composant Form pour créer un formulaire.

import SignatureComp from './SignatureComp';
import SelectField from './SelectField';
import InputField from './InputField';
import Switch from './Switch';
import DatePickerComponent from './DatePickerComponent';
import MultiCheckComponent from './MultiCheckComponent';
import FormHeaderComponent from '../../ui/FormHeaderComponent';

import {
  getFormHeading,
  getFormHeadingInterface,
} from '../../../utilities/getFormHeading';

import { eqTypeId } from '../../../pages/Equipments/equipmentConfigs/parametrageConfComp';

import globalStyles from '../../../styles/globalStyles';

interface FormComponentProps {
  formFieldConfig: any;
  values: Record<string, any>;
  title: string;
  children: React.ReactNode;
  formValues?: Record<string, any>;
  isAdd: boolean;
  isAddSetter: (isAdd: boolean) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  formFieldConfig,
  title,
  values,
  isAdd,
  isAddSetter,
  children,
}) => {
  const { setFieldValue } = useFormikContext();

  const [isHeading, setIsHeading] = useState<boolean>(false);

  const [formHeader, setFormHeader] = useState<getFormHeadingInterface | null>(
    null
  );

  useEffect(() => {
    if (Object.keys(eqTypeId).includes(values.endroit))
      setFieldValue(values.equipment_type_id, eqTypeId[values.endroit]);
  }, [setFieldValue, formFieldConfig, values]);

  useEffect(() => {
    if (values.equipment_type && values.endroit && values.equipment_type_id) {
      setIsHeading(true);
      setFormHeader(
        getFormHeading(
          parseInt(values.equipment_type),
          parseInt(values.endroit),
          parseInt(values.equipment_type_id)
        )
      );
    } else {
      setIsHeading(false);
      setFormHeader(null);
    }
  }, [values.equipment_type && values.endroit && values.equipment_type_id]);

  return (
    <>
      <Form>
        {isHeading && formHeader && (
          <FormHeaderComponent
            title={formHeader.title}
            titreLabel={formHeader.titreLabel}
            imageName={formHeader.imageName}
          />
        )}
        {Object.keys(formFieldConfig).map((key, index) => {
          const { type, label } = formFieldConfig[key];

          let { options } = formFieldConfig[key];

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
          if (type === 'signature') {
            return (
              <SignatureComp
                key={key}
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
                from={title}
                isAdd={isAdd}
                isAddSetter={isAddSetter}
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
    </>
  );
};

export default FormComponent;
