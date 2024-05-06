import { useState } from 'react';
import { useFormikContext } from 'formik';

import Button from '../../ui/Button';

import FormComponent from './FormComponent';

import { styles } from '../../../styles/formStyles';
import globalStyles from '../../../styles/globalStyles';

interface MultiStepProps {
  valuesForm: Record<string, any>;
  title: string;
  formFieldConfig: Record<string | number, any>;
}

const MultiStep: React.FC<MultiStepProps> = ({
  valuesForm,
  title,
  formFieldConfig,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState<boolean>(false);

  const { validateForm, values } = useFormikContext();

  const steps = Object.keys(formFieldConfig).map((key) => key);
  //   const stepBtnAction = ()=>{}

  const handleNext = async (s: number) => {
    const formErrors: Record<string, any> = await validateForm();
    console.log('form errors', formErrors);
    const currentStepFields = formFieldConfig[step];
    console.log('current step fields', currentStepFields);
    const isStepValid = Object.keys(currentStepFields).every(
      (key) => !formErrors[key]
    );
    console.log(isStepValid);
    setIsCurrentStepValid(isStepValid);
    // if (isCurrentStepValid) setStep();
    // // console.log(isCurrentStepValid);
    setStep(s);
  };

  return (
    <>
      <FormComponent
        values={valuesForm}
        title={title}
        formFieldConfig={formFieldConfig[step]}>
        {step === steps.length ? (
          <Button
            title={title}
            btnType='submit'
            className={globalStyles.button}
            action={() => console.log(valuesForm)}
            isDisabled={false}
          />
        ) : (
          <span></span>
        )}
      </FormComponent>
      <div className='flex justify-around gap-x-2 py-1 px-2 '>
        {steps.map((s) => (
          <div
            key={s}
            className={styles.columnSmall}>
            <Button
              title={s}
              btnType='button'
              className={
                step === parseInt(s, 10)
                  ? globalStyles.roundedBtnActive
                  : globalStyles.roundedBtn
              }
              action={() => handleNext(parseInt(s, 10))}
              isDisabled={false}
              // isDisabled={!isCurrentStepValid}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiStep;
