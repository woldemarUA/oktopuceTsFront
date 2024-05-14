import { useState } from 'react';
import { useSites } from '../../context/SitesProvider';

import { parametrageFormConfig } from './equipmentConfigs/parametrageFromConfig';

import FormFin from '../../components/forms/FormFin';

import Informations from './Informations';

import MultiFormNavButtons from '../../components/forms/formComps/MultiFormNavButtons';

const Parametrage = () => {
  const [step, setStep] = useState<number>(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const { sites } = useSites();

  const sitesOptions = sites.map((site: Record<string, any>) => ({
    value: site.id,
    label: `${site.name}`,
  }));

  const formConf = {
    ...parametrageFormConfig,
    site_id: {
      ...parametrageFormConfig.site_id,
      options: [{ value: '', label: 'Choissisez' }, ...sitesOptions],
    },
  };

  const onSubmit = async (
    values: Record<string, any>
  ): Promise<Record<string, any>> => {
    setStep(parseInt(values.equipment_type, 10));
    setFormValues(values);
    return { msg: 'Passser a prochaine etape' };
  };

  return (
    <>
      {step === 0 ? (
        <FormFin
          formFieldConfig={formConf}
          title='Parametrage'
          handleSubmit={onSubmit}
        />
      ) : (
        <Informations
          header='Informations'
          formValues={formValues}
        />
      )}
      <MultiFormNavButtons
        currentStep={step}
        step={2}
        handleStepBtnClick={setStep}
        setStepBtnTitle={(step) => step}
      />
    </>
  );
};

export default Parametrage;
