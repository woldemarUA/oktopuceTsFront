interface MaintenanceItemProps {
  main_mail: string | undefined;
  main_nom: string | undefined;
  main_telephone: string | undefined;
}

import globalStyles from '../../../styles/globalStyles';
import styles from '../../../styles/listStyles';

const MaintenanceItem: React.FC<MaintenanceItemProps> = ({
  main_mail,
  main_nom,
  main_telephone,
}) => {
  return (
    <div>
      <h3 className={globalStyles.headerSection}>Prestataire maintenance</h3>
      <p className={styles.listCell}>{main_nom}</p>
      <p className={styles.listCell}>{main_telephone}</p>
      <p className={styles.listCell}>{main_mail}</p>
    </div>
  );
};

export default MaintenanceItem;
