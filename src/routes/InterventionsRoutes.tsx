import Route from '../interface/routes';

import InterventionsListPage from '../pages/Interventions/InterventionsListPage';
import InterventionsForm from '../pages/Interventions/InterventionsForm';

const interventionsRoutes: Route[] = [
  {
    path: 'interventions',
    element: <InterventionsListPage />,
    linkText: 'Lister Interventions',
  },
  {
    path: 'interventions/add',
    element: <InterventionsForm />,
    linkText: 'Ajouter Interventions',
  },
];

export default interventionsRoutes;
