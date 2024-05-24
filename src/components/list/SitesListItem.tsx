import SitesInterface from '../../interface/sitesInterface';
import ContactListItem from './list_comps/ContactListItem';
import MaintenanceItem from './list_comps/MaintenanceItem';
import ClientContactShort from './list_comps/ClientContactShort';

interface SitesListItemProps {
  item: SitesInterface;
}

const SitesListItem: React.FC<SitesListItemProps> = ({ item }) => {
  console.log(item);
  return (
    <>
      <ContactListItem
        address={item.address}
        postal_code={item.postal_code}
        city={item.city}
        phone_number={item.phone_number}
        email={item.email}
      />
      <ClientContactShort
        clientContactName={item.clientContactName}
        clientEmail={item.clientEmail}
        clientFirstName={item.clientFirstName}
        clientPhone={item.clientPhone}
        clientSecondName={item.clientSecondName}
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
