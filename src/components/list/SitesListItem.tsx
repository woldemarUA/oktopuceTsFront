import SitesInterface from '../../interface/sitesInterface';
import ContactListItem from './list_comps/ContactListItem';
import MaintenanceItem from './list_comps/MaintenanceItem';

interface SitesListItemProps {
  item: SitesInterface;
}

const SitesListItem: React.FC<SitesListItemProps> = ({ item }) => {
  return (
    <>
      <ContactListItem
        address={item.address}
        postal_code={item.postal_code}
        city={item.city}
        phone_number={item.phone_number}
        email={item.email}
      />
      {item.maintenance_provider && (
        <MaintenanceItem
          main_mail={item.maintenance_provider.main_mail}
          main_nom={item.maintenance_provider.main_nom}
          main_telephone={item.maintenance_provider.main_telephone}
        />
      )}
    </>
  );
};

export default SitesListItem;
