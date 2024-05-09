import ClientListItem from './ClientListItem';
import InterventionListItem from './InterventionListItem';
import SitesListItem from './SitesListItem';
import EquipmentListItem from './EquipmentListItem';

import { Accordion } from '../Accordion';
import useAccordion from '../../hooks/useAccordion';

import globalStyles from '../../styles/globalStyles';
import { getTitle } from '../../utilities/convertors';

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
        className=' mt-2'>
        {items.map((item) => {
          const children = (
            <ListItemComp
              item={item as any}
              // item={item as ItemTypeMap[typeof type]}
            />
          );
          return (
            <div
              key={item.id}
              className='border-b border-grey-100 '>
              <Accordion
                title={getTitle(item)}
                id={item.id}
                children={children}
                isOpen={item.id === openAccordion}
                toggleAccordion={toggleAccordion}
              />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default ListItems;
