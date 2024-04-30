import React from 'react';
import Route from '../interface/routes';

import SitesList from '../pages/SitesList';

const sitesRoutes: Route[] = [
  {
    path: 'sites',
    element: <SitesList />,
    linkText: 'Lister Sites',
  },
];

export default sitesRoutes;
