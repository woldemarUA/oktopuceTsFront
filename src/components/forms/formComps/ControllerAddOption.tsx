import { useEffect, useState } from 'react';
import { useForms } from '../../../context/FormContextProvider';

import { handleAddOptionInterface } from '../../../context/FormContextProvider';

import AddOption from './AddOption';
import globalStyles from '../../../styles/globalStyles';
//  props step (receives from the select field to compare with the current)

const ControllerAddOption = () => {
  const { addOptionProps } = useForms();
  const { name, from, to } = addOptionProps;
  const [stepsData, setStepsData] = useState<
    Record<number, handleAddOptionInterface>
  >({});

  useEffect(() => {
    console.log(addOptionProps.newStep);
    setStepsData((prevStepData) => ({
      ...prevStepData,
      [addOptionProps.newStep]: addOptionProps,
    }));
  }, []);

  return (
    <>
      {/* <div className='space-y-4 max-w-xl mx-auto shadow-sm'>
        <h2 className={globalStyles.headerSection}>Fil des édits</h2>
      </div> */}
      {Object.values(stepsData).map((step) => {
        const { from, to, newStep } = step;

        return (
          <div
            key={newStep}
            className={globalStyles.formContainer}>
            <span>Vous editiez: </span>
            <span className='text-red-600'>{from} : </span>
            <span>Vous voulez ajouter un nouveau: </span>
            <span className='text-red-600'>{to} </span>
          </div>
        );
      })}

      <AddOption
        name={name}
        to={to}
        from={from}
      />
    </>
  );
};

export default ControllerAddOption;
