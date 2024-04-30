import Route from '../interface/routes';

import ClientList from '../pages/ClientListPage';

const clientRoutes: Route[] = [
  {
    path: 'clients',
    element: <ClientList />,
    linkText: 'Lister Clients',
  },
];

export default clientRoutes;
