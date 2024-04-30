import React from 'react';
import Route from '../interface/routes';

import ClientList from '../pages/ClientList';

const clientRoutes: Route[] = [
  {
    path: 'clients',
    element: <ClientList />,
    linkText: 'Lister Clients',
  },
];

export default clientRoutes;
