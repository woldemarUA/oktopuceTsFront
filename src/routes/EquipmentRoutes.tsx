import Route from '../interface/routes';
// import Parametrage from '../pages/Equipments/Parametrage';
// import EquipmentItem from '../pages/Equipments/EquipmentItem';
import EquipmentList from '../pages/Equipments/EquipmentList';
import EquipmentConfigurator from '../pages/Equipments/EquipmentConfigurator';

const equipmentRoutes: Route[] = [
  {
    path: 'equipment-list',
    element: <EquipmentList />,
    linkText: 'Liste Machines',
  },
  // {
  //   path: 'equipment-item',
  //   element: <EquipmentItem />,
  //   linkText: 'Machine detail',
  // },
  {
    path: 'parametrage',
    element: <EquipmentConfigurator />,
    linkText: 'Parametrage',
  },
];

export default equipmentRoutes;
