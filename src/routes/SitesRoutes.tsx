import Route from '../interface/routes';

import SitesListPage from '../pages/SitesListPage';
const sitesRoutes: Route[] = [
  {
    path: 'sites',
    element: <SitesListPage />,
    linkText: 'Lister Sites',
  },
];

export default sitesRoutes;
