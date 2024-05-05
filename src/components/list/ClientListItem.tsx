import ClientsInterface from '../../interface/clientsInterface';

import ContactListItem from './list_comps/ContactListItem';

interface ClientListItemProps {
  item: ClientsInterface;
}

const ClientListItem: React.FC<ClientListItemProps> = ({ item }) => {
  const { address, postal_code, city, phone_number, email } = item;
  return (
    <ContactListItem
      address={address}
      postal_code={postal_code}
      city={city}
      phone_number={phone_number}
      email={email}
    />
  );
};

export default ClientListItem;
