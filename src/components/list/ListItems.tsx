// import SitesInterface from '../../interface/sitesInterface';
// import InterventionInterface from '../../interface/interventionInterface';
// import ClientsInterface from '../../interface/clientsInterface';
// import EquipmentInterface from '../../interface/equipmentInterface';
// interface ItemTypeMap {
//   sites: SitesInterface;
//   clients: ClientsInterface;
//   equipment: EquipmentInterface;
//   intervention: InterventionInterface;
// }

// interface ComponentMap {
//   sites: React.FC<{ item: SitesInterface }>;
//   clients: React.FC<{ item: ClientsInterface }>;
//   equipment: React.FC<{ item: EquipmentInterface }>;
//   intervention: React.FC<{ item: InterventionInterface }>;
// }
// const components: ComponentMap = {
//   sites: SitesListItem,
//   clients: ClientListItem,
//   equipment: EquipmentListItem,
//   intervention: InterventionListItem,
// };

// interface ListItemsProps<T extends keyof ItemTypeMap> {
//   type: T;
//   items: ItemTypeMap[T][];
// }

import ClientListItem from './ClientListItem';
import InterventionListItem from './InterventionListItem';
import SitesListItem from './SitesListItem';
import EquipmentListItem from './EquipmentListItem';

import { Accordion } from '../Accordion';
import useAccordion from '../../hooks/useAccordion';

import globalStyles from '../../styles/globalStyles';

const components = {
  sites: SitesListItem,
  clients: ClientListItem,
  equipment: EquipmentListItem,
  intervention: InterventionListItem,
};

interface ListItemsProps {
  type: 'sites' | 'clients' | 'equipment' | 'intervention';
  items: any[]; // Using any[] for items since specific type handling is bypassed
  title: string;
}

const ListItems: React.FC<ListItemsProps> = ({
  //<keyof ItemTypeMap>
  type,
  items,
  title,
}) => {
  const ListItemComp = components[type];
  const { openAccordion, toggleAccordion } = useAccordion();

  return (
    <>
      <h2 className={globalStyles.header}> {title} </h2>
      <ul
        role='list'
        className='divide-y divide-gray-100 mt-2'>
        {items.map((item) => {
          const children = (
            <ListItemComp
              item={item as any}
              // item={item as ItemTypeMap[typeof type]}
            />
          );
          return (
            <Accordion
              key={item.id}
              title={
                item.name ||
                `${item.first_name} ${
                  item.last_name ? item.last_name : item.contact_name
                }`
              }
              id={item.id}
              children={children}
              isOpen={item.id === openAccordion}
              toggleAccordion={toggleAccordion}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ListItems;
