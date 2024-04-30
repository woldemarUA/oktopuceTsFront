import { useClients } from '../context/ClientsProvider';

import ClientsList from '../components/listComps/ClientsList';

const ClientList: React.FC = () => {
  const { clients } = useClients();

  return (
    <ClientsList
      data={clients}
      title='Clients'
    />
  );
};

export default ClientList;
