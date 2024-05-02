import { SitesFormConfig } from '../../components/forms/config/sitesFormConfig';
import FormFin from '../../components/forms/FormFin';
import { useClients } from '../../context/ClientsProvider';
import { useSites } from '../../context/SitesProvider';

const SitesForm: React.FC = () => {
  const { clients } = useClients();
  const { handleAddSite } = useSites();

  const clientsOptions = clients.map((client) => ({
    value: client.id,
    label: `${client.first_name} ${client.last_name || client.contact_name}`,
  }));

  const formConf = {
    ...SitesFormConfig,
    client_id: {
      ...SitesFormConfig.client_id,
      options: [{ value: '', label: 'Choissisez' }, ...clientsOptions],
    },
  };

  return (
    <FormFin
      formFieldConfig={formConf}
      title='Ajouter Site'
      handleSubmit={handleAddSite}
    />
  );
};

export default SitesForm;
