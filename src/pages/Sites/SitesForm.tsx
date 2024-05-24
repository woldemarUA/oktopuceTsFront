import sitesFormComponentConfig from '../../components/forms/config/sitesFormComponentConfig';
import FormFin from '../../components/forms/FormFin';

import { useSites } from '../../context/SitesProvider';

const SitesForm: React.FC = () => {
  const { handleAddSite } = useSites();

  const formConf = sitesFormComponentConfig();

  return (
    <FormFin
      formFieldConfig={formConf}
      title='Ajouter Site'
      handleSubmit={handleAddSite}
    />
  );
};

export default SitesForm;
