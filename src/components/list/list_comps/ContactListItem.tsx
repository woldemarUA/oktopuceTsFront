interface ContactItemProps {
  address: string;
  postal_code: string;
  city: string;
  phone_number: string;
  email: string;
}

import styles from '../../../styles/listStyles';
import globalStyles from '../../../styles/globalStyles';

const ContactListItem: React.FC<ContactItemProps> = ({
  address,
  postal_code,
  city,
  phone_number,
  email,
}) => {
  return (
    <>
      <div className={styles.listCol}>
        <h3 className={globalStyles.headerSection}>Addresse</h3>
        <p className={styles.listCell}>{address}</p>
        <p className={styles.listCell}>{city}</p>
        <p className={styles.listCell}>{postal_code}</p>
      </div>

      <div className={styles.listCol}>
        <h3 className={globalStyles.headerSection}>Coordonnées</h3>
        <p className={styles.listCell}>{phone_number}</p>
        <p className={styles.listCell}>
          <span className={styles.label}>email: </span>
          {email}
        </p>
      </div>
    </>
  );
};

export default ContactListItem;
