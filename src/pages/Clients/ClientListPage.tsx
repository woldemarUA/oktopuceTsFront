import { useClients } from '../../context/ClientsProvider';

import ListItems from '../../components/list/ListItems';

const ClientList: React.FC = () => {
  const { clients } = useClients();

  return (
    <ListItems
      items={clients}
      title='Lister Clients'
      type='clients'
    />
  );
};

export default ClientList;
