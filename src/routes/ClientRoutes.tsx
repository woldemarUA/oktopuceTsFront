import Route from '../interface/routes';

import ClientList from '../pages/Clients/ClientListPage';
import ClientsForm from '../pages/Clients/ClientsForm';

const clientRoutes: Route[] = [
  {
    path: 'clients',
    element: <ClientList />,
    linkText: 'Lister Clients',
  },
  {
    path: 'clients/add',
    element: <ClientsForm />,
    linkText: 'Ajouter Clients',
  },
];

export default clientRoutes;
