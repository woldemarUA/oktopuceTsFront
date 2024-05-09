import UniteImage from '../../assets/misc/uniteImage.png';

import { InterventionsFormConfig } from '../../components/forms/config/interventionsFormConfig';
import FormFin from '../../components/forms/FormFin';

import { useSites } from '../../context/SitesProvider';
import { useInterventions } from '../../context/InterventionsProvider';

import { formStepsConvertor } from '../../utilities/convertors';

const InterventionsForm: React.FC = () => {
  const { sites } = useSites();

  const { handleAddIntervention } = useInterventions();
  const formConf = formStepsConvertor(InterventionsFormConfig);

  const sitesOptions = sites.map((site) => ({
    value: site.id,
    label: site.name,
  }));
  formConf.site_id.options = [
    { value: '', label: 'choissisez' },
    ...sitesOptions,
  ];

  return (
    <>
      {/* <img src={UniteImage} /> */}
      <FormFin
        title='Ajout Intervention'
        formFieldConfig={formConf}
        handleSubmit={(values: any) => handleAddIntervention(values)}
        multiStep={true}
        multiConf={InterventionsFormConfig}
      />
    </>
  );
};

export default InterventionsForm;
