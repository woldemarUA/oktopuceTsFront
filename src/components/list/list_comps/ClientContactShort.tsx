import styles from '../../../styles/listStyles';
import globalStyles from '../../../styles/globalStyles';

type ClientContactShortProps = {
  clientContactName: string | undefined;
  clientEmail: string;
  clientFirstName: string;
  clientPhone: string;
  clientSecondName: string | undefined;
};

const ClientContactShort = ({
  clientContactName,
  clientEmail,
  clientFirstName,
  clientPhone,
  clientSecondName,
}: ClientContactShortProps) => {
  return (
    <div className={styles.listCol}>
      <h3 className={globalStyles.headerSection}>Client </h3>
      <p className={styles.listCell}>
        {clientFirstName},
        {clientSecondName ? `${clientSecondName}` : clientContactName}
      </p>
      <p className={styles.listCell}>Tel.: {clientPhone}</p>
      <p className={styles.listCell}>Email: {clientEmail}</p>
    </div>
  );
};

export default ClientContactShort;
