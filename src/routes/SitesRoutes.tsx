import Route from '../interface/routes';

import SitesListPage from '../pages/Sites/SitesListPage';
import SitesForm from '../pages/Sites/SitesForm';
const sitesRoutes: Route[] = [
  {
    path: 'sites',
    element: <SitesListPage />,
    linkText: 'Lister Sites',
  },
  {
    path: 'sites/add',
    element: <SitesForm />,
    linkText: 'Ajouter Sites',
  },
];

export default sitesRoutes;
