// import SitesForm from '../../../pages/Sites/SitesForm';
// import ClientsForm from '../../../pages/Clients/ClientsForm';
import { useState, useMemo } from 'react';

import { useClients } from '../../../context/ClientsProvider';
import { useSites } from '../../../context/SitesProvider';
import { useInterventions } from '../../../context/InterventionsProvider';

import globalStyles from '../../../styles/globalStyles';
import { styles } from '../../../styles/formStyles';

import equipmentFormFinalConf from '../../../pages/Equipments/equipmentConfigs/equipmentFormFinalConf';
import clientFormComponentConfig from '../config/clientFormComponentConfig';
import sitesFormComponentConfig from '../config/sitesFormComponentConfig';
// import intervFromComponentConfig from '../config/intervFromComponentConfig';
import intervFromComponentConfig from '../config/interventionsFormComponentEasyConf';

import FormFin from '../FormFin';

type AddOptionProps = {
  name: string;
  to: string;
  from: string;
  // formValues: Record<string, any>;
};

const formConfigurations = new Map<string, any>([
  ['Client', clientFormComponentConfig],
  // ['site_id', sitesFormComponentConfig],
  ['Equipment', equipmentFormFinalConf],
  ['Site', sitesFormComponentConfig],
  ['Intervention', intervFromComponentConfig],
  ['Ajout Client', clientFormComponentConfig],
]);

const titlesMapping = new Map<string, string>([
  ['client_id', 'Client'],
  ['site_id', 'Site'],
]);

const AddOption = ({ name, to, from }: AddOptionProps) => {
  const [isFrom, setIsFrom] = useState<boolean>(false);
  const [valuesToSend, setValuesToSend] = useState<Record<string, any>>({});

  // const [isMultiStep] = useState<boolean>(from === 'Ajout Intervention');
  console.log(name, to, from);
  //  add handlers
  const { handleAddClient } = useClients();
  const { handleAddSite } = useSites();
  // const { handleAddIntervention } = useInterventions();
  //  recuperer configuration fonction
  const formConfFunctionTo = formConfigurations.get(to);
  const formConfFunctionFrom = formConfigurations.get(from);

  // appeller fonctions pour get configurations
  const formConfTo = formConfFunctionTo ? formConfFunctionTo() : null;
  const formConfFrom = formConfFunctionFrom ? formConfFunctionFrom() : null;

  // decider lequell config utiliser
  const actionsApiMapping = new Map<string, any>([
    ['Client', handleAddClient],
    ['Site', handleAddSite],
  ]);

  // // interventions form configuration
  // const multiStepFormConfig = isMultiStep
  //   ? { multiStep: true, multiConf: { formConfFrom } }
  //   : {};
  const actionApi = actionsApiMapping.get(to);

  // const formFieldConfig = useMemo(
  //   () => (isFrom ? formConfFrom : formConfTo),
  //   [isFrom, formConfFrom, formConfTo]
  // );
  const formFieldConfig = isFrom ? formConfFrom : formConfTo;

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const response = await actionApi(values);
      console.log(response);
      setIsFrom(true);

      setValuesToSend({ [name]: response.addedItem.id });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormFin
        title={`Ajout ${!isFrom ? to : from} `}
        formFieldConfig={formFieldConfig}
        handleSubmit={handleSubmit}
        addedOptionValue={isFrom ? valuesToSend : undefined}
      />
    </>
  );
};

export default AddOption;
