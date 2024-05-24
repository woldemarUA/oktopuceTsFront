import clientFormComponentConfig from '../../components/forms/config/clientFormComponentConfig';

import FormFin from '../../components/forms/FormFin';
import { useClients } from '../../context/ClientsProvider';

const ClientsForm = () => {
  const { handleAddClient } = useClients();

  const formConf = clientFormComponentConfig();
  return (
    <FormFin
      formFieldConfig={formConf}
      title='Ajout Client'
      handleSubmit={handleAddClient}
    />
  );
};

export default ClientsForm;
