import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

import Button from '../../ui/Button';

import FormComponent from './FormComponent';

import { styles } from '../../../styles/formStyles';
import globalStyles from '../../../styles/globalStyles';

import CheckButtonSVG from '../../../assets/buttons/checkButton.svg';
import BackButtonSVG from '../../../assets/buttons/backArrowBtn.svg';

interface MultiStepProps {
  valuesForm: Record<string, any>;
  title: string;
  formFieldConfig: Record<string | number, any>;
  submissionSuccess: boolean;
}

const MultiStep: React.FC<MultiStepProps> = ({
  valuesForm,
  title,
  formFieldConfig,
  submissionSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState<boolean>(false);

  const { validateForm, values } = useFormikContext();

  const stepValidation = async (): Promise<boolean> => {
    const formErrors: Record<string, any> = await validateForm();

    const currentStepFields = formFieldConfig[step];

    const isStepValid = Object.keys(currentStepFields).every(
      (key) => !formErrors[key]
    );
    return isStepValid;
  };

  useEffect(() => {
    if (submissionSuccess) {
      setStep(1);
      setIsCurrentStepValid(false);
    }
  }, [submissionSuccess]);

  useEffect(() => {
    stepValidation().then((res) => {
      setIsCurrentStepValid(res);
    });
  }, [values]);

  const steps = Object.keys(formFieldConfig).map((key) => key);
  //   const stepBtnAction = ()=>{}

  const handleStepBtnClick = (s: number) => {
    if (s <= 1 && isCurrentStepValid && step != s) {
      setStep(step - 1);
      return;
    }
    if (s != step && isCurrentStepValid) {
      setStep(step + 1);
      setIsCurrentStepValid(false);
    }

    if (s != step && !isCurrentStepValid && s != steps.length) {
      setStep(step - 1);
      setIsCurrentStepValid(true);
    }
  };

  const setStepBtnTitle = (s: number) => {
    if (
      (isCurrentStepValid && step === s) ||
      (step != s && isCurrentStepValid && s < step)
    )
      return <img src={CheckButtonSVG} />;
    if (step != s && !isCurrentStepValid && s < step)
      return <img src={BackButtonSVG} />;
    if (step != s) return s;
    if (step === s && !isCurrentStepValid) return s;
    // return ;
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
            <span
              className={
                step === parseInt(s, 10)
                  ? globalStyles.roundedBtnActive
                  : globalStyles.roundedBtnDisabled
              }
              onClick={() => handleStepBtnClick(parseInt(s, 10))}>
              {setStepBtnTitle(parseInt(s, 10))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiStep;
