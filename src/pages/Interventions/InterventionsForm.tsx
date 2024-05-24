// import intervFromComponentConfig from '../../components/forms/config/intervFromComponentConfig';
// import intervFromComponentConfig from '../../components/forms/config/interventionsFormComponentEasyConf';

import interventionsFormConfigFin from './formConfig/interventionsFormConfigFin';

import FormFin from '../../components/forms/FormFin';

import { useInterventions } from '../../context/InterventionsProvider';

import { formStepsConvertor } from '../../utilities/convertors';

const InterventionsForm: React.FC = () => {
  // const initialConf = intervFromComponentConfig();
  const initialConf = interventionsFormConfigFin();
  // console.log(initialConf);
  const { handleAddIntervention } = useInterventions();

  // convertir mulitstep dans le configration pour FormFin
  const formConf: Record<string, any> = formStepsConvertor(initialConf);

  return (
    <>
      <FormFin
        title='Ajout Intervention'
        formFieldConfig={initialConf}
        handleSubmit={(values: any) => handleAddIntervention(values)}
        // multiStep={true}
        // multiConf={initialConf}
      />
    </>
  );
};

export default InterventionsForm;
