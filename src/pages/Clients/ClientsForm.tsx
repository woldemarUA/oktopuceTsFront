import { clientsFormConfig } from '../../components/forms/config/clientFormConfig';
import FormFin from '../../components/forms/FormFin';
import { useClients } from '../../context/ClientsProvider';

const ClientsForm = () => {
  const { handleAddClient } = useClients();
  return (
    <FormFin
      formFieldConfig={clientsFormConfig}
      title='Ajout Client'
      handleSubmit={handleAddClient}
    />
  );
};

export default ClientsForm;
